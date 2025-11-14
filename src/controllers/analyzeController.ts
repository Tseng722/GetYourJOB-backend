import { Request, Response } from 'express';
import * as geminiService from '../services/geminiService';

// 分析履歷
export const handleAnalyzeResume = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience = '', jd = '' } = req.body as {
            experience?: string;
            jd?: string;
        };

        const resumeResult = await geminiService.analyzeResume({ experience, jd });

        res.json({ resumeResult });
    } catch (error) {
        console.error('分析錯誤:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 分析 JD
export const handleAnalyzeJD = async (req: Request, res: Response): Promise<void> => {
    try {
        const { jd = '' } = req.body as { jd?: string };

        const JDResult = await geminiService.analyzeJD({ jd });

        res.json({ JDResult });
    } catch (error) {
        console.error('分析錯誤:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 分析 ATS 匹配度
export const handleAnalyzeATS = async (req: Request, res: Response): Promise<void> => {
    try {
        const { experience = '', jd = '' } = req.body as {
            experience?: string;
            jd?: string;
        };

        const ATSResult = await geminiService.analyzeATS({ experience, jd });

        res.json({ ATSResult });
    } catch (error) {
        console.error('分析錯誤:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
