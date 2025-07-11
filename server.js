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

// CORS setup: allow Netlify, local dev, etc.
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDB();

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/projects', ProjectRoutes);
app.use('/api/user', UserRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;