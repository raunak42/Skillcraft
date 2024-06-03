const Loading: React.FC = () => {
  return (
    <div className="p-4 w-[95%] md:gap-0 gap-16 h-full md:h-[600px] grid grid-cols-7  bg-[#ffffff] mx-[15px] rounded-2xl lg:gap-4 xl:gap-0 xl:mx-[50px] overflow-hidden ">
      <div className="w-[90%] col-span-7 md:col-span-4 gap-4 flex flex-col">
        <div className="bg-gray-200 w-[60%] h-[45px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[50%] h-[20px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[90%] h-[180px] md:h-[40%] lg:h-[60%] xl:h-[70%] rounded-lg animated-gradient"></div>
        <div className=" w-[90%] flex flex-row items-center justify-between">
          <div className="bg-gray-200 w-[17%] h-[34px] rounded-full animated-gradient"></div>
          <div className="bg-gray-200 w-[17%] h-[34px] rounded-full animated-gradient"></div>
        </div>
      </div>
      <div className="col-span-7 md:col-span-3 flex flex-col gap-4 items- justify-center ">
        <div className="bg-gray-200 w-[60%] h-[45px] rounded-lg animated-gradient mb-16"></div>
        <div className="bg-gray-200 w-[80%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[70%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[60%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[80%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[60%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[50%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[90%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[80%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[70%] h-[15px] rounded-lg animated-gradient"></div>
        <div className="bg-gray-200 w-[60%] h-[15px] rounded-lg animated-gradient"></div>
      </div>
    </div>
  );
};

export default Loading;
