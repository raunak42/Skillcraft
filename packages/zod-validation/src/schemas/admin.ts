import { string, z } from "zod";

export const adminInput = z.object({
    adminname: z.string().min(5).max(35),
    password: z.string()
      .min(8)
      .max(50)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[\d]/)
      .regex(/[!@#$%^&*(),.?":{}|<>]/),
  });