export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="  flex flex-row items-center gap-4">
        <div className="bg-black text-white p-2 rounded-full">
          <img src="/arrowLeft.svg" className="size-4"></img>
        </div>
        <div className="bg-white w-[200px] h-[25px] rounded-full animate-pulse "></div>
      </div>

      <div className="w-full flex flex-row items-center justify-center">
        <div className="h-[540px] w-[440px] flex flex-col justify-evenly p-4 items-center bg-white rounded-xl">
          <div className="size-40 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-[85%] h-[25px] bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-[85%] h-[25px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
