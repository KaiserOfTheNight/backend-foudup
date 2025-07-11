import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO || 'mongodb://localhost:27017/a12';
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};