import User from '../models/user.model.js';
import Project from '../models/project.model.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getProfile controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    await user.save();
    
    // Return user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log("Error in updateProfile controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const projects = await Project.find({
      $or: [
        { createdBy: userId },
        { 'members.user': userId }
      ]
    })
    .populate('createdBy', 'username email')
    .populate('members.user', 'username email');

    res.status(200).json(projects);
  } catch (error) {
    console.log("Error in getUserProjects controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};