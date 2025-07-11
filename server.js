import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './src/lib/db.js';
import AuthRoutes from './src/routes/auth.route.js';
import ProjectRoutes from './src/routes/project.route.js';
import UserRoutes from './src/routes/user.route.js';

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.json({ status: 'API is working' });
});

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/projects', ProjectRoutes);
app.use('/api/user', UserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default app;