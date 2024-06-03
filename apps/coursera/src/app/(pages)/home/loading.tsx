import { CSkeleton } from "@/components/Carousel/CSkeleton";
import { FCSkeleton } from "@/components/FeaturedCourses/FCSkeleton";
import { VCSkeleton } from "@/components/VCarousel/VCSkeleton";

const Loading: React.FC = () => {
  return (
    <div>
      <div className="w-full h-full grid lg:grid-cols-3 grid-cols-1 gap-4 px-[14px] ">
        <CSkeleton />
        <VCSkeleton />
      </div>
      <div className="pt-4">
        <FCSkeleton />
      </div>
    </div>
  );
};

export default Loading;
