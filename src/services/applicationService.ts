import prisma from '../prisma/client'
import { Applications } from '@prisma/client';

// Application 輸入資料結構
export interface CreateApplicationData {
    companyTitle?: string
    jobTitle: string
    applicationDate?: Date
    status?:
    | 'inProgress'
    | 'applied'
    | 'firstInterview'
    | 'secondInterview'
    | 'thirdInterview'
    | 'fourthInterview'
    | 'fifthInterview'
    | 'offer'
    | 'rejected'
    resourceId?: string
    applyById?: string
    website?: string
    howManyApplicant?: number
    jobDescription?: string
    coverLetter?: string
    resume?: string
    question?: string
    analyzedJDResponse?: string
    atsScoreResponse?: number
    atsDescriptionResponse?: string
    resumeSuggestionResponse?: string
}

export async function createApplication(
    userId: number,
    data: CreateApplicationData
) {
    // 先確認使用者存在
    const user = await prisma.users.findUnique({
        where: { id: userId },
    })

    if (!user) {
        throw new Error('無效的 userId，使用者不存在')
    }
    if (data.applicationDate) {
        data.applicationDate = new Date(data.applicationDate);
    }
    data.howManyApplicant = Number(data.howManyApplicant);

    // 建立新的 application
    const application = await prisma.applications.create({
        data: {
            ...data,
            status: data.status ?? 'inProgress',
            // userId: userId
            // user: { connect: { id: userId } }, // ✅ 正規關聯方式
            user: {
                connect: { id: userId }
            }
        },
    })

    return application
}

export async function getApplicationsByUser(userId: number) {
    return await prisma.applications.findMany({
        where: { userId: userId },
        orderBy: { applicationDate: 'desc' },
    })
}

export async function getApplicationsByIdService(id: number) {
    return await prisma.applications.findUnique({
        where: { id: id }
    })
}

export const updateApplicationService = async (
    id: number,
    data: Partial<Applications>
) => {
    const exist = await prisma.applications.findUnique({
        where: { id },
    });

    if (!exist) {
        throw new Error('Application not found');
    }
    if (data.applicationDate) {
        data.applicationDate = new Date(data.applicationDate);
    }
    data.howManyApplicant = Number(data.howManyApplicant);

    if (data.status && data.status !== exist.status) {
        if (data.status === 'applied') {
            data.applicationDate = new Date();
        }
        if (data.status === 'firstInterview') {
            data.firstInterviewDate = new Date();
        }
        if (data.status === 'secondInterview') {
            data.secondInterviewDate = new Date();
        }
        if (data.status === 'thirdInterview') {
            data.thirdInterviewDate = new Date();
        }
        if (data.status === 'fourthInterview') {
            data.fourthInterviewDate = new Date();
        }
        if (data.status === 'fifthInterview') {
            data.fifthInterviewDate = new Date();
        }
        if (data.status === 'offer') {
            data.offerDate = new Date();
        }
        if (data.status === 'rejected') {
            data.rejectedDate = new Date();
        }
    }

    const updated = await prisma.applications.update({
        where: { id },
        data,
    });

    return updated;
};

export const deleteApplicationService = async (
    id: number,
) => {
    const exist = await prisma.applications.findUnique({
        where: { id },
    });

    if (!exist) {
        throw new Error('Application not found');
    }
    const deleted = await prisma.applications.delete({
        where: { id },
    });

    return deleted;
};

