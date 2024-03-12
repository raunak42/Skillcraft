import { prisma } from "@/lib/prisma";
import {
    SessionAttributes,
    CourseAttributes
} from "types";

export async function POST(req: Request): Promise<Response> {
    try {
        const sessionDataHeader = req.headers.get('session-data')
        if (!sessionDataHeader) {
            return Response.json({ message: "sessionDataHeader not found" }, { status: 500 });//500 internal server error because middleware not working
        }
        const { session, user }: SessionAttributes = JSON.parse(sessionDataHeader);
        const adminId = session.userId  //this data comes directly from the db. hence you do not need a prisma call to test if it exists in db.

        const body = await req.json();//giving it a type is important or else the prisma call below won't recognize the data while using a spred operator.
        const course: CourseAttributes = body

        const newCourse = await prisma.course.create({
            data: {
                ...course,
                admin: {
                    connect: {
                        id: adminId
                    }
                }
            },
        });
        if (!newCourse) {
            return Response.json({ message: "couldn't create course, database didn't respond" })
        }

        return Response.json({ message: "course created successfully", newCourse }, { status: 200 })
        //you shouldn't return a message if a course with the same details alreay exists, you cannnot stop people from creating similar courses.
        //ofcourse these courses would have one differing attribute, the id.

    } catch (error) {
        console.error(error)
        return Response.json({ message: "internal server error" }, { status: 500 })
    }
}