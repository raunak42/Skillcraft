import Carousel from "@/components/Carousel/Carousel";
import { FeaturedCourses } from "@/components/FeaturedCourses/FeaturedCourses";
import { VCarousel } from "@/components/VCarousel/VCarousel";

export default async function Page() {
  return (
    <div>
      <div className="mt-4 flex flex-row items-center space-x-2">
        <img src="line.svg" className="h-12"></img>
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold">Top</h1>
          <h1 className="text-2xl font-bold text-[#EA3A36]">10</h1>
        </div>
        <h1 className="text-2xl font-bold">Bestsellers</h1>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Carousel />
        </div>
        <div className="col-span-1 mt-[-23px]">
          <div className="text-s flex flex-row ml-4">
            <div className=" text-[#EA3A36] font-semibold">#</div>
            <div className=" text-black font-semibold">Top</div>
            <div className=" text-[#EA3A36] font-semibold">10</div>
          </div>
          <VCarousel />
        </div>
        <div className="col-span-3">
          <FeaturedCourses />
        </div>
      </div>
    </div>
  );
}
