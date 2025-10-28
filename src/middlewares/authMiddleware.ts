import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// 擴充 Request 物件的型別，讓 req.user 不報錯
export interface AuthRequest extends Request {
    user?: any; // 你可以改成更精確的型別，例如 { id: number; email: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: '缺少 token' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ message: '無效或過期 token' });
    }
};
