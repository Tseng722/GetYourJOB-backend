import { Request, Response, NextFunction } from 'express'
import * as applicationService from '../services/applicationService'

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        [key: string]: any;
    };
}

// 建立新的 Application
export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 確保 authMiddleware 已經將 user 加入 req
        const userId = (req as any).user?.id
        if (!userId) {
            return res.status(401).json({ error: '未授權，缺少使用者資訊' })
        }

        const application = await applicationService.createApplication(userId, req.body)
        res.json(application)
    } catch (err: any) {
        console.error(err.message)
        res.status(500).json({ error: err.message })
    }
}

// 取得該使用者的所有 Application
export const getUserApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id
        if (!userId) {
            return res.status(401).json({ error: '未授權，缺少使用者資訊' })
        }

        const applications = await applicationService.getApplicationsByUser(userId)
        res.json(applications)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getApplicationById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const id = Number(req.params.id);

        const application = await applicationService.getApplicationsByIdService(id);

        if (!application) {
            res.status(404).json({ message: "使用者不存在" });
            return;
        }

        res.json(application);
    } catch (err: any) {
        console.error("error", err);
        res.status(500).json({ error: err.message });
    }
};

export const updateApplication = async (req: Request, res: Response) => {
    try {
        const { id, ...data } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid application id' });
        }

        const updated = await applicationService.updateApplicationService(id, data);

        return res.status(200).json({
            message: 'Application updated successfully',
            data: updated,
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};