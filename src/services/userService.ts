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

export default { registerUser };