import { PrismaClient } from "db";
import { withAccelerate } from "db"

// import * as dotenv from "dotenv";
// dotenv.config();

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// export const prisma = global.prisma || new PrismaClient({
//     log: ['info']
// })

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const prisma = new PrismaClient().$extends(withAccelerate())

