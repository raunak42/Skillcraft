import { z } from "zod";

export const courseInput = z.object({
    title: z.string()
        .min(1, { message: "Title cannot be empty" })
        .max(50, { message: "Title cannnot exceed 50 characters." }),
    description: z.string()
        .max(200, { message: "Description cannot exceed 200 characters." }),
    price: z.number(),
    imageLink: z.string()
        .url({ message: "Enter a valid url." }),
    published: z.boolean()
});


/*This does look different from the course prisma model. 
 * But zod schemas are there to restrict what the input data looks like, it is not the definition of the schema of that object. 
 * Here, defining zod schema means only these 5 attributes (out of the many) are alterable (from outside the database) and they have certain restrictions as to how they should look.
 * 
 * NOTE: Remember, zod is an "input validator".
 */