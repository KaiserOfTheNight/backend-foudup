import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Use MONGO_URI instead of MONGO for consistency
    const uri = process.env.MONGO_URI || process.env.MONGO || 'mongodb://localhost:27017/a12';
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};