import { PrismaCourseInput } from "types";
import { courseInput } from "zod-validation";

export async function validateCourseBody(body: PrismaCourseInput): Promise<PrismaCourseInput> {
    const course = body;
    const validatedCourse = courseInput.parse(course);//This variable shpuld have a type or else the prisma call below won't recognize the data while using a spread operator.

    return validatedCourse;
}