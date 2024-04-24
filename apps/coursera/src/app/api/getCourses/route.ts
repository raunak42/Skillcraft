import { prisma } from "@/lib/prisma";
// import fs from "fs"
// import path from "path";
// import { courses } from "./courses"

//for ssr use
export async function GET(req: Request): Promise<Response> {
    try {
        const courses = await prisma.course.findMany({});


        // const injectData = () => {
        //     courses.map(async (course) => {
        //         await prisma.course.updateMany({
        //             data: {
        //                 category: course.category
        //             }
        //         });
        //     });
        // };

        // const injectData = async () => {
        //     for (let i = 0; i < courses.length; i++) {
        //         await prisma.course.update({
        //             where: {
        //                 id:courses[i].id
        //             },
        //             data:{
        //                 category:courses[i].category
        //             }
        //         })
        //     }
        // }
        // injectData();

        // for (var i = 0; i < 4; i++) {
        //     injectData();
        // }

        // const injectData = async()=>{
        //     await prisma.course.updateMany({
        //         where:{
        //             title:"Standard Model of Partice Physics"
        //         },
        //         data:{
        //             title:"Standard Model of Particle Physics"
        //         }
        //     })
        // }
        // injectData();
        return Response.json(courses, { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("internal server error", { status: 500 })
    }
}   