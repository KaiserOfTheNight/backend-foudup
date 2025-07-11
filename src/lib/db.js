import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  // If already connected, return
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/a12';
    
    console.log('🔄 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    isConnected = conn.connection.readyState === 1;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Don't exit in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};