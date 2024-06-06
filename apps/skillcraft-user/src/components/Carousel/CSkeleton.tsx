export const CSkeleton: React.FC = () => {
  return (
    <div className="relative lg:col-span-2 flex flex-col items-center justify-center lg:pr-2 border  rounded-xl bg-gray-50">
      <div className="lg:w-full w-full h-[260px] sm:h-[380px] md:h-[486px] xl:h-[608px] transition-all duration-300 ease-in-out"></div>
      <div className="absolute inset-0 xl:left-4 xl:right-4  left-2 right-2 text-white flex flex-row justify-center items-center">
        <div className="animated-gradient font-bold text-2xl sm:text-3xl bg-gray-200 h-[90%] w-[98%] rounded-xl"></div>
      </div>
      <div className="px-4 pb-2 sm:pb-6 absolute bottom-4 xl:bottom-6  xl:left-6 xl:right-6  left-2 right-2 text-white flex flex-row justify-between items-center">
        <div className="font-bold  bg-gray-300/25 h-[35px] md:h-[40px] w-[60%] rounded-xl"></div>
        <div className="font-bold  bg-gray-300/25 h-[35px] md:h-[40px] w-[30%] rounded-xl"></div>
      </div>
    </div>
  );
};
