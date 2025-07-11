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

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-foudup.vercel.app',
  'https://foundup.vercel.app' // Add your backend URL if different
];

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-foudup.vercel.app',
    'https://foundup.vercel.app' // Include backend URL if needed
  ],
  credentials: true, // Allow cookies in cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/projects', ProjectRoutes); 
app.use('/api/user', UserRoutes);

connectDB();

// Start server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});