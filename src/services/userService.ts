import prisma from '../prisma/client'
import { Users } from '@prisma/client'
export interface RegisterUserData {
    name: string
    email: string
    password: string
    phone?: string
    location?: string
    visa?: string
    linkedIn?: string
    github?: string
    experience?: string
}

async function registerUser(userData: RegisterUserData): Promise<Users> {
    const user = await prisma.users.create({
        data: userData,
    })

    return user
}

export async function getUserExperience(id: number) {
    return await prisma.users.findUnique({
        where: { id: id },
        select: {
            id: true,
            experience: true,
        },
    })
}


export default { registerUser };