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

export const getApplicationMetricsService = async (userId: number) => {

    const now = new Date();
    const d = new Date(now);
    const day = d.getDay(); // 0 = Sunday
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const startOfWeek = new Date(d.setDate(diff));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
        appliedCount,
        thisWeek,
        thisMonth,
        screeningCount,
        interviewCount,
        rejectedCount,
        offerCount,
        ghostingCount,
    ] = await Promise.all([
        prisma.applications.count({
            where: {
                userId,
                applicationDate: { not: null },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                applicationDate: { gte: startOfWeek },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                applicationDate: { gte: startOfMonth },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                firstInterviewDate: { not: null },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                OR: [
                    // { firstInterviewDate: { not: null } },
                    { secondInterviewDate: { not: null } },
                    { thirdInterviewDate: { not: null } },
                    { fourthInterviewDate: { not: null } },
                    { fifthInterviewDate: { not: null } },
                ],
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                rejectedDate: { not: null },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                offerDate: { not: null },
            },
        }),
        prisma.applications.count({
            where: {
                userId,
                status: 'applied',
            },
        }),
    ]);

    // ----- calculations (percentage) -----
    const appliedToScreening =
        appliedCount === 0
            ? 0
            : Math.round((screeningCount / appliedCount) * 100);

    const screeningToInterview =
        screeningCount === 0
            ? 0
            : Math.round((interviewCount / screeningCount) * 100);
    const interviewToOffer =
        interviewCount === 0
            ? 0
            : Math.round((offerCount / interviewCount) * 100);

    const rejectionRate =
        appliedCount === 0
            ? 0
            : Math.round((rejectedCount / appliedCount) * 100);

    const ghostingRate =
        appliedCount === 0
            ? 0
            : Math.round((ghostingCount / appliedCount) * 100);

    return {
        appliedCount,
        thisWeek,
        thisMonth,
        appliedToScreening,
        screeningToInterview,
        interviewToOffer,
        rejectionRate,
        ghostingRate,
    };

};
