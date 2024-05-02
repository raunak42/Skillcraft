import { PrismaCourseOutput } from "types";
import { useMediaQuery } from "react-responsive";

interface SRProps {
  course: PrismaCourseOutput<{ select: {}; include: { admin: true } }>;
}

const handleClickLink = (query: string) => {
  window.location.assign(`/search?q=${encodeURIComponent(query)}&p=${1}`);
};

const handleClick = () => {};

export const SearchResults: React.FC<SRProps> = ({ course }: SRProps) => {
  const isMdScreen = useMediaQuery({ minWidth: 768 }); //md breakpoint

  if (!Array.isArray(course.category)) {
    return;
  }
  var categoryString = "";
  for (let i = 0; i < course.category.length; i++) {
    categoryString = categoryString + " " + "#" + course.category[i];
  }
  return (
    <div 
    onClick={()=>[
      window.location.assign(`/course/${course.id}`)
    ]}
    className="group h-[115px] sm:h-[140px] lg:w-full lg:h-[200px] xl:h-[260px] flex w-full flex-row  bg-white  sm:border-none rounded-xl overflow-hidden">
      <div
        onClick={handleClick}
        className="border-0 h-full w-[35%] sm:w-[30%] lg:w-[40%] xl:w-[45%]  hover:cursor-pointer overflow-hidden flex flex-row items-center justify-center"
      >
        <div className="relative h-full w-full  lg:rounded-xl  overflow-hidden">
          <img
            src={course.imageLink as string}
            className="w-full h-full object-cover"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent hover:bg-gradient-to-t group-hover:from-black/20 group-hover:to-transparent"></div>
          {/* <div className="absolute bottom-1 lg:bottom-2 left-2 text-white lg:font-bold lg:text-2xl font-semibold text-sm">
            ₹{course.price}/-
          </div> */}
        </div>
      </div>
      <div
        onClick={handleClick}
        className="mt-2 pl-2 hover:cursor-pointer lg:ml-12 w-[65%] lg:w-[70%] sm:w-[70%] flex flex-col  lg:py-2"
      >
        <div className="">
          <div className="lg:text-3xl font-bold lg:font-bold">
            {course.title}
          </div>
          <div className="line-clamp-1 lg:line-clamp-3 lg:text-xl pr-2">
            {course.description}
          </div>
          {/* <div className="text-xl mb-8 hidden lg:block">View details</div> */}
          <div className="flex flex-row flex-wrap space-x-2">
            {!isMdScreen &&
              course.category.slice(0, 2).map(
                (tag, index) =>
                  tag !== "" && (
                    <div
                      key={index}
                      className="text-sm  text-[#007bff] hover:cursor-pointer"
                      onClick={() => handleClickLink(tag)}
                    >
                      {"#" + tag}
                    </div>
                  )
              )}
            {isMdScreen &&
              course.category.map(
                (tag, index) =>
                  tag !== "" && (
                    <div
                      key={index}
                      className="text-sm  text-[#007bff] hover:cursor-pointer"
                      onClick={() => handleClickLink(tag)}
                    >
                      {"#" + tag}
                    </div>
                  )
              )}
          </div>
        </div>
        <div>
          <h1 className="hidden sm:block font-semibold text-xs md:text-sm lg:text-lg xl:text-xl xl:pt-4">
            By {course.admin?.username}
          </h1>
        </div>
        <div className="flex flex-row justify-between pr-4 mt-auto">
          <div className="flex flex-col justify-end">₹{course.price}/-</div>
          <div>
            <div className="flex flex-row justify-end">
              <img src="arrowRight.svg" className="size-4"></img>
            </div>
            View details
          </div>
        </div>
      </div>
    </div>
  );
};
