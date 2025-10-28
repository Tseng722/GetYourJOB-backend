import express from 'express';
import { register, login, verifyToken } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);

// 驗證 Token（也可以改成用 middleware）
router.get('/verify', authMiddleware, verifyToken);

export default router;
