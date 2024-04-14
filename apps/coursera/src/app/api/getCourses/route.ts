import { prisma } from "@/lib/prisma";

//for ssr use
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
        //     courses.map(async (course) => {
        //         await prisma.course.updateMany({
        //             where: {
        //                 title: "Interior Design Basics"
        //             },
        //             data: {
        //                 // title: "Learn the principles of creating beautiful and functional living spaces.",
        //                 // description: "Towards the grand unification of gravity and quantum mechanics.",
        //                 // imageLink: "https://www.quantumdiaries.org/wp-content/uploads/2014/03/2000px-Standard_Model_of_Elementary_Particles.svg_.jpg",
        //                 // price: 99,
        //                 category: 'design, interior design, art',
        //                 // published: false
        //             },
        //         });
        //     });
        // };

        // injectData2()
        return Response.json(courses, { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("internal server error", { status: 500 })
    }
}   