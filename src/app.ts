import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import applicationRoutes from './routes/applicationRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();


app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);



export default app;