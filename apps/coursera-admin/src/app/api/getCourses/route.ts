import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";
import { allCourses, physicsCourses } from "./courses"

export async function GET(req: Request): Promise<Response> {
    try {
        const courses = await prisma.course.findMany({});

        // const totalCourses = physicsCourses.concat(allCourses)

        // const injectData = () => {
        //     totalCourses.map(async (course) => {
        //         await prisma.course.create({
        //             data: {
        //                 title: course.title as string,
        //                 description: course.description as string,
        //                 imageLink: course.imageLink as string,
        //                 price: course.price as number,
        //                 category: course.category as string,
        //                 published: course.published as boolean,
        //             },
        //         });
        //     });
        // };

        // for (var i = 0; i < 4; i++) {
        //     injectData();
        // }

        // const injectData2 = () => {
        //     totalCourses.map(async (course) => {
        //         await prisma.course.updateMany({
        //             where: {
        //                 title: "Standard Model"
        //             },
        //             data: {
        //                 title: "Standard Model of Partice Physics",
        //                 description: "Towards the grand unification of gravity and quantum mechanics.",
        //                 imageLink: "https://www.quantumdiaries.org/wp-content/uploads/2014/03/2000px-Standard_Model_of_Elementary_Particles.svg_.jpg",
        //                 price: 99,
        //                 category: 'physics, theory of everything,',
        //                 published: false
        //             },
        //         });
        //     });
        // };

        // injectData2()


        return apiResponse({ data: { courses } }, 200);
    } catch (error) {
        return handleApiError(error)
    }
}

