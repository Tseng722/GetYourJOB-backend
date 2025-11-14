import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import applicationRoutes from './routes/applicationRoutes';
import analysisRoutes from './routes/analysisRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as string;

app.use(cors({
    origin: FRONTEND_ORIGIN, // 前端的來源
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', "Authorization"],
    credentials: true
}));
app.use(express.json());

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/application', applicationRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);



export default app;