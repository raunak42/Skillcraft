import { string, z } from "zod";

export const userInput = z.object({
  username: z.string().min(5).max(35),
  password: z.string()
    .min(8)
    .max(30)
    .refine(password => {
      return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?+-=()~`<>|{}:;'"])/.test(password);
    }, {
      message: "String must contain at least one uppercase letter, one number, and one special character"
    })
});