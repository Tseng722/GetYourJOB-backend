import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import userService from "../services/userService"; // 若有使用 service 可保留

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        [key: string]: any;
    };
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "未授權：找不到使用者 ID" });
            return;
        }


        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                location: true,
                experience: true,
            },
        });

        if (!user) {
            res.status(404).json({ message: "使用者不存在" });
            return;
        }

        res.json(user);
    } catch (err: any) {
        console.error("❌ getUserProfile Error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: "未授權：找不到使用者 ID" });
            return;
        }

        const { name, email, phone, location, experience } = req.body;

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                name,
                email,
                phone,
                location,
                experience,
            },
        });

        res.json(updatedUser);
    } catch (err: any) {
        console.error("❌ updateUserProfile Error:", err);
        if (err.code === "P2025") {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(500).json({ error: err.message });
    }
};
