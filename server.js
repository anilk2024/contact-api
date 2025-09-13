import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}));
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
