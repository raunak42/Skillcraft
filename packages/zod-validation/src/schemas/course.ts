import { z } from "zod";

export const courseInput = z.object({
    title: z.string()
        .min(1)
        .max(50),
    description: z.string()
        .max(200),
    price: z.number(),
    imageLink: z.string()
        .url(),
    published: z.boolean()
});


/*This does look different from the course prisma model. 
 * But zod schemas are there to restrict what the input data looks like, it is not the definition of the schema of that object. 
 * Here, defining zod schema means only these 5 attributes (out of the many) are alterable (from outside the database) and they have certain restrictions as to how they should look.
 * 
 * NOTE: Remember, zod is an "input validator".
 */