import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roles: {
    type: [String],
    required: true,
    default: ['member'],
    enum: ['admin', 'developer', 'designer', 'manager', 'member']
  }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  category: String,
  teamSize: Number,
  status: {
    type: String,
    enum: ['planning', 'recruiting', 'development', 'testing', 'launching', 'completed'],
    default: 'planning'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [memberSchema],
  
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);