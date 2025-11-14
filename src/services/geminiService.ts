import axios from 'axios';

const GEMINI_API_URL = process.env.GEMINI_API_URL as string;
const API_KEY = process.env.GEMINI_API_KEY as string;

export interface AnalyzeInput {
    experience?: string;
    jd?: string;
}

// ✅ 定義 Gemini 回傳的資料結構
interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: { text?: string }[];
        };
    }[];
}

// ------------------- 分析履歷 -------------------
export const analyzeResume = async ({ experience = '', jd = '' }: AnalyzeInput): Promise<string> => {
    const analyzeResumePrompt = process.env.ANALYZE_RESUME_PROMPT || '';
    const promptText = `這是我的經歷：
${experience}

這是公司職缺描述：
${jd}
${analyzeResumePrompt}
`;

    const geminiBody = {
        contents: [
            {
                parts: [{ text: promptText }],
            },
        ],
    };

    try {
        const gResp = await axios.post<GeminiResponse>(`${GEMINI_API_URL}?key=${API_KEY}`, geminiBody, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 20000,
        });

        const resumeResult = gResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '未收到建議';
        return resumeResult.trim();
    } catch (error: any) {
        console.error('Gemini error:', error.response?.data || error.message);
        throw new Error('呼叫 Gemini 發生錯誤');
    }
};

// ------------------- 分析 JD -------------------
export const analyzeJD = async ({ jd = '' }: { jd?: string }): Promise<string> => {
    const analyzeJDPrompt = process.env.ANALYZE_JD_PROMPT || '';
    const promptText = `${analyzeJDPrompt}\n這是公司職缺描述：${jd}`;

    const geminiBody = {
        contents: [
            {
                parts: [{ text: promptText }],
            },
        ],
    };

    try {
        const gResp = await axios.post<GeminiResponse>(`${GEMINI_API_URL}?key=${API_KEY}`, geminiBody, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 20000,
        });

        const JDResult = gResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '未收到建議';
        return JDResult.trim();
    } catch (error: any) {
        console.error('Gemini error:', error.response?.data || error.message);
        throw new Error('呼叫 Gemini 發生錯誤');
    }
};

// ------------------- 分析 ATS 匹配度 -------------------
export const analyzeATS = async ({ experience = '', jd = '' }: AnalyzeInput): Promise<string> => {
    const analyzeATSPrompt = process.env.ANALYZE_ATS_PROMPT || '';
    const promptText = `這是公司職缺描述：${jd}\n這是我的履歷：${experience}\n${analyzeATSPrompt}`;

    const geminiBody = {
        contents: [
            {
                parts: [{ text: promptText }],
            },
        ],
    };

    try {
        const gResp = await axios.post<GeminiResponse>(`${GEMINI_API_URL}?key=${API_KEY}`, geminiBody, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 20000,
        });

        const ATSResult = gResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '未收到建議';
        return ATSResult.trim();
    } catch (error: any) {
        console.error('Gemini error:', error.response?.data || error.message);
        throw new Error('呼叫 Gemini 發生錯誤');
    }
};
