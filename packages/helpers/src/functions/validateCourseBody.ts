import { PrismaCourseInput } from "types";
import { courseInput } from "zod-validation";
import { Session, User } from "lucia"

interface BodyType {
    title: string;
    description: string;
    imageLink: string;
    price: string; //will be received as a string from client
    published: boolean;
    data: {
        session: Session | null;
        user: User | null
    }
}

export async function validateCourseBody(body: BodyType): Promise<PrismaCourseInput> {

    const title = body.title;
    const description = body.description;
    const imageLink = body.imageLink;
    const price = parseFloat(body.price)
    const published = body.published

    const course = {
        title,
        description,
        imageLink,
        price,
        published
    };
    const validatedCourse = courseInput.parse(course);//This variable shpuld have a type or else the prisma call below won't recognize the data while using a spread operator.

    return validatedCourse;
}