import Project from "../models/project.model.js";


export const createProject = async (req, res) => {
  try {
    const { title, description, category, teamSize, status } = req.body;
    const createdBy = req.user._id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = new Project({
      title,
      description,
      category,
      teamSize,
      status: status || 'planning',
      createdBy,
      members: [{
        user: createdBy,
        roles: ['admin']
      }]
    });

    await project.save();
    
    // Populate the createdBy and members.user fields before returning
    const populatedProject = await Project.findById(project._id)
      .populate('createdBy', 'username email')
      .populate('members.user', 'username email');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.log("Error in createProject controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate('createdBy', 'username email')
      .populate('members.user', 'username email')
      .lean(); // Convert to plain JavaScript object

    // Ensure we always return an array, even if empty
    res.status(200).json(Array.isArray(projects) ? projects : []);
  } catch (error) {
    console.log("Error in getProjects controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId)
      .populate('createdBy', 'username email')
      .populate('members.user', 'username email');

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log("Error in getProject controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;
    const { title, description, category, teamSize } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is the creator or an admin member
    const isAdmin = project.createdBy.equals(userId) || 
                    project.members.some(m => m.user.equals(userId) && m.role === 'admin');
    
    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized to update this project" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.teamSize = teamSize || project.teamSize;

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.log("Error in updateProject controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only allow deletion by creator
    if (!project.createdBy.equals(userId)) {
      return res.status(403).json({ message: "Unauthorized to delete this project" });
    }

    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProject controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};