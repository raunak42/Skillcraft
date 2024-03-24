import { Prisma } from '@prisma/client';
import { Session, User } from "lucia"

export interface SessionAttributes {
    session: Session,
    user: User
}

// User types
export type PrismaUserInput = Prisma.UserCreateInput;
export type PrismaUserOutput<T extends Prisma.UserDefaultArgs> = Prisma.UserGetPayload<T>;

// userSession types
export type PrismaUserSessionInput = Prisma.userSessionCreateInput;
export type PrismaUserSessionOutput<T extends Prisma.userSessionDefaultArgs> = Prisma.userSessionGetPayload<T>;

// UserOAuthAccount types
export type PrismaUserOAuthAccountInput = Prisma.UserOAuthAccountCreateInput;
export type PrismaUserOAuthAccountOutput<T extends Prisma.UserOAuthAccountDefaultArgs> = Prisma.UserOAuthAccountGetPayload<T>;

// Admin types
export type PrismaAdminInput = Prisma.AdminCreateInput;
export type PrismaAdminOutput<T extends Prisma.AdminDefaultArgs> = Prisma.AdminGetPayload<T>;

// AdminSession types
export type PrismaAdminSessionInput = Prisma.AdminSessionCreateInput;
export type PrismaAdminSessionOutput<T extends Prisma.AdminSessionDefaultArgs> = Prisma.AdminSessionGetPayload<T>;

// AdminOAuthAccount types
export type PrismaAdminOAuthAccountInput = Prisma.AdminOAuthAccountCreateInput;
export type PrismaAdminOAuthAccountOutput<T extends Prisma.AdminOAuthAccountDefaultArgs> = Prisma.AdminOAuthAccountGetPayload<T>;

// Course types
export type PrismaCourseInput = Prisma.CourseCreateInput;
export type PrismaCourseOutput<T extends Prisma.CourseDefaultArgs> = Prisma.CourseGetPayload<T>;

//ApiResponse schema for infering same types on both backend and frontend.
export interface ApiResponseAttributes {
    data?: {
        admin?: Partial<PrismaAdminOutput<{ select: {}, include: {} }>>,
        user?: Partial<PrismaUserOutput<{ select: {}, include: {} }>>,
        course?: Partial<PrismaCourseOutput<{ select: {}, include: {} }>>,
        courses?: Partial<PrismaCourseOutput<{ select: {}, include: {} }>>[]
    },
    message?: string | string[],
    error?: string | unknown,
}

