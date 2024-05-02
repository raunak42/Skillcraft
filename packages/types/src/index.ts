import { Prisma } from '@prisma/client';
import { Session, User } from "lucia"

export interface SessionAttributes {
    session: Session,
    user: User
}

// User types
export type PrismaUserInput = Prisma.UserCreateInput;
export type PrismaUserOutput<T extends Prisma.UserDefaultArgs> = Partial<Prisma.UserGetPayload<T>>;

// userSession types
export type PrismaUserSessionInput = Prisma.userSessionCreateInput;
export type PrismaUserSessionOutput<T extends Prisma.userSessionDefaultArgs> = Partial<Prisma.userSessionGetPayload<T>>;

// UserOAuthAccount types
export type PrismaUserOAuthAccountInput = Prisma.UserOAuthAccountCreateInput;
export type PrismaUserOAuthAccountOutput<T extends Prisma.UserOAuthAccountDefaultArgs> = Partial<Prisma.UserOAuthAccountGetPayload<T>>;

// Admin types
export type PrismaAdminInput = Prisma.AdminCreateInput;
export type PrismaAdminOutput<T extends Prisma.AdminDefaultArgs> = Partial<Prisma.AdminGetPayload<T>>;

// AdminSession types
export type PrismaAdminSessionInput = Prisma.AdminSessionCreateInput;
export type PrismaAdminSessionOutput<T extends Prisma.AdminSessionDefaultArgs> = Partial<Prisma.AdminSessionGetPayload<T>>;

// AdminOAuthAccount types
export type PrismaAdminOAuthAccountInput = Prisma.AdminOAuthAccountCreateInput;
export type PrismaAdminOAuthAccountOutput<T extends Prisma.AdminOAuthAccountDefaultArgs> = Partial<Prisma.AdminOAuthAccountGetPayload<T>>;

// Course types
export type PrismaCourseInput = Prisma.CourseCreateInput;
export type PrismaCourseOutput<T extends Prisma.CourseDefaultArgs> = Partial<Prisma.CourseGetPayload<T>>;

//ApiResponse schema for infering same types on both backend and frontend.
export interface ApiResponseAttributes {
    data?: {
        admin?: PrismaAdminOutput<{ select: {}, include: { createdCourses: true } }>,
        user?: PrismaUserOutput<{ select: {}, include: { courses: true } }>,
        course?: PrismaCourseOutput<{ select: {}, include: { admin: true, users: true } }>,
        courses?: PrismaCourseOutput<{ select: {}, include: { admin: true, users: true } }>[],
        courseIds?: number[]
        totalResults?: number
        featuredCourses?: featuredCourses[]
    },
    message?: string | string[],
    error?: string | unknown,
}

export interface featuredCourses {
    category: String,
    courses: PrismaCourseOutput<{ select: {}, include: { admin: true, users: true } }>[]
}

export interface courseId {
    id: number
}
