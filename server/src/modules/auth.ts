import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type Role = "admin" | "educator" | "student"

interface User {
    fullName: string;
    email: string;
}

interface JWTClaims {
    fullName: string;
    email: string;
    role: Role;
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 7)
    } catch (e) {
        throw new Error("Password hashing failed")
    }
}

const createJWT = (user: User, role: JWTClaims["role"]): string => {
    let token: string;
    token = jwt.sign({
            fullName: user.fullName,
            email: user.email,
            role: role
        } as JWTClaims,
        process.env.JWT_SECRET as string,
        {expiresIn: '1d'});
    return token
}

export const createJWTAdmin = (user: User) => {
    return createJWT(user, "admin")
}

export const createJWTEducator = (user: User) => {
    return createJWT(user, "educator")
}

export const createJWTStudent = (user: User) => {
    return createJWT(user, "student")
}