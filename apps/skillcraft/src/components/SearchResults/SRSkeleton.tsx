export const SRSkeleton: React.FC = () => {
  return (
    <div className="group h-[300px]  sm:h-[140px] lg:w-full lg:h-[200px] xl:h-[260px] pb-1 sm:pb-0 flex flex-col w-full sm:flex-row  bg-white border-[1.5px] rounded-xl overflow-hidden">
      <div className=" h-[80%] sm:h-full sm:w-[30%] lg:w-[40%] xl:w-[45%]  hover:cursor-pointer overflow-hidden flex flex-row items-center justify-center">
        <div className="relative h-[90%] w-[90%] rounded-xl bg-gray-200 animated-gradient  lg:rounded-xl  overflow-hidden">
          {/* <img
            // src={course.imageLink as string}
            className="w-full h-full object-cover"
          ></img> */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent hover:bg-gradient-to-t group-hover:from-black/20 group-hover:to-transparent"></div> */}
          {/* <div className="absolute bottom-1 lg:bottom-2 left-2 text-white lg:font-bold lg:text-2xl font-semibold text-sm">
            ₹{course.price}/-
          </div> */}
        </div>
      </div>
      <div
        // onClick={handleClick}
        className="mt-2 pl-2 hover:cursor-pointer lg:ml-12  lg:w-[70%] sm:w-[70%] flex flex-col justify-between lg:py-2"
      >
        <div className="px-3 py-3">
          <div className="lg:text-3xl font-bold lg:font-bold md:w-[500px] lg:w-[580px] md:h-[40px] w-[280px] h-[20px] bg-gray-200 animated-gradient rounded-xl">
            {/* {course.title} */}
          </div>
          <div className="line-clamp-1 lg:line-clamp-3 lg:text-xl pr-2 w-[200px] h-[15px] mt-4 bg-gray-200 animated-gradient rounded-xl">
            {/* {course.description} */}
          </div>
          <div className="hidden line-clamp-1 lg:line-clamp-3 lg:text-xl pr-2 w-[200px] h-[15px] mt-4 bg-gray-200 animated-gradient rounded-xl">
            {/* {course.description} */}
          </div>
          <div>
            {/* <div className="text-xl mb-8 hidden lg:block">View details</div> */}
            <div className="hidden sm:flex flex-row space-x-2 ">
              {/* {course.category.map(
                (tag) =>
                  tag !== "" && (
                    <div
                      className="w-fit text-sm  text-[#007bff] hover:cursor-pointer"
                      onClick={() => handleClickLink(tag)}
                    >
                      {"#" + tag}
                    </div>
                  )
              )} */}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-row justify-between pr-4 px-3 mb-2">
          <div className="flex flex-col justify-end">
            <div className="w-[100px] h-[20px] rounded-xl bg-gray-200  animated-gradient">
              {/* ₹{course.price}/- */}
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-end w-[100px] h-[30px] rounded-xl bg-gray-200 animated-gradient">
              {/* <img src="arrowRight.svg" className="size-4"></img> */}
            </div>
            {/* View details */}
          </div>
        </div>
      </div>
    </div>
  );
};
