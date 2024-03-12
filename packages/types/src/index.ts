import { z } from "zod";
import { courseInput } from "zod-validation";
import { Session, User } from "lucia"

export type CourseAttributes = z.infer<typeof courseInput>;

export interface SessionAttributes {
    session: Session,
    user: User
}

export interface CourseIdParams {
    params: {
        courseId: string
    }
}