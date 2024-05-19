import { prisma } from "@/lib/prisma";
import { apiResponse, handleApiError } from "helpers";
import { allCourses, physicsCourses } from "./courses"

export async function GET(req: Request): Promise<Response> {
    try {
        console.log("hello")
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

        // const injectChapterVideoLinks = async()=>{
        //     await prisma.course.updateMany({
        //         where:{
        //             chapterVideoLinks:{
        //                 hasEvery:[]
        //             }
        //         },
        //         data:{
        //            chapterVideoLinks:[
        //             "https://videos.pexels.com/video-files/15921892/15921892-sd_640_360_25fps.mp4",
        //             "https://videos.pexels.com/video-files/16666848/16666848-sd_640_360_24fps.mp4",
        //             "https://videos.pexels.com/video-files/9712579/9712579-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/6561360/6561360-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20317587/20317587-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/13795766/13795766-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20801280/20801280-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20792398/20792398-sd_640_360_25fps.mp4",
        //             "https://videos.pexels.com/video-files/20788616/20788616-sd_640_360_25fps.mp4",
        //             "https://videos.pexels.com/video-files/20771551/20771551-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/19757074/19757074-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20315562/20315562-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20053504/20053504-sd_640_360_25fps.mp4",
        //             "https://videos.pexels.com/video-files/20179799/20179799-sd_540_960_30fps.mp4",
        //             "https://videos.pexels.com/video-files/20241376/20241376-sd_640_360_30fps.mp4",
        //             "https://videos.pexels.com/video-files/10028146/10028146-sd_640_360_24fps.mp4"
        //            ]
        //         }
        //     })
        // }

        // await injectChapterVideoLinks()


        return apiResponse({ data: { courses } }, 200);
    } catch (error) {
        return handleApiError(error)
    }
}

