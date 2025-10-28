import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as RegisterRequestBody;

        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email 已存在' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.users.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: 'User registered', user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginRequestBody;

        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyToken = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: '缺少 token' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: '缺少 token' });

    jwt.verify(token, JWT_SECRET, (err, payload: any) => {
        if (err) return res.status(403).json({ message: '無效或過期 token' });

        // 驗證成功
        res.json({ message: '驗證成功', userId: payload.id });
    });
};
