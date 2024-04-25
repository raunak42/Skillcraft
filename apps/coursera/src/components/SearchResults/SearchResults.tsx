import { PrismaCourseOutput } from "types";

interface SRProps {
  course: PrismaCourseOutput<{ select: {}; include: {} }>;
}


const handleClickLink = (query: string) => {
  window.location.assign(
    `/search?q=${encodeURIComponent(query)}&p=${1}`
  );
};

const handleClick = () => {};

export const SearchResults: React.FC<SRProps> = ({ course }: SRProps) => {
  if (!Array.isArray(course.category)) {
    return;
  }
  var categoryString = "";
  for (let i = 0; i < course.category.length; i++) {
    categoryString = categoryString + " " + "#" + course.category[i];
  }
  return (
    <div className="group h-[270px] sm:h-[140px] lg:w-full lg:h-[200px] xl:h-[260px] pb-1 sm:pb-0 flex flex-col w-full sm:flex-row  bg-white border-[1.5px] border-black sm:border-none rounded-xl overflow-hidden">
      <div
        onClick={handleClick}
        className="border-b-[1.5px] border-b-black sm:border-0 h-[80%] sm:h-full sm:w-[30%] lg:w-[40%] xl:w-[45%]  hover:cursor-pointer overflow-hidden flex flex-row items-center justify-center"
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
        className="mt-2 pl-2 hover:cursor-pointer lg:ml-12  lg:w-[70%] sm:w-[70%] flex flex-col justify-between lg:py-2"
      >
        <div className="">
          <div className="lg:text-3xl font-bold lg:font-bold">
            {course.title}
          </div>
          <div className="line-clamp-1 lg:line-clamp-3 lg:text-xl pr-2">
            {course.description}
          </div>
          <div>
            {/* <div className="text-xl mb-8 hidden lg:block">View details</div> */}
            <div className="hidden sm:flex flex-row space-x-2 ">
              {course.category.map(
                (tag, index) =>
                  tag !== "" && (
                    <div
                      key={index}
                      className="w-fit text-sm  text-[#007bff] hover:cursor-pointer"
                      onClick={() => handleClickLink(tag)}
                    >
                      {"#" + tag}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-row justify-between pr-4">
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
