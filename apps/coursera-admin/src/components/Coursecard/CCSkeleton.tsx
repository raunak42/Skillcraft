export const CCSkeleton: React.FC = () => {
  return (
    <div className="mb-14 mt-2 flex-shrink-0 w-[260px] h-[300px] transition-all duration-300 ease-in-out border rounded-xl shadow bg-gray-50 hover:cursor-pointer overflow-hidden flex flex-col group ">
      <div className="flex flex-row items-center justify-center mt-4">
        <div className="animated-gradient w-[90%] h-[140px] bg-gray-200 rounded-xl" />
      </div>
      {/*inset is for this div to be set in (over) the image, try various values to test. Also, inset is the combination of 'bottom', 'top', 'left', 'right'*/}
      <div className="ml-4 mt-4 rounded-xl bottom-2 left-2 text-white font-bold text-xl w-[220px] h-[20px] bg-gray-200"></div>
      <div className="ml-4 mt-4 rounded-xl bottom-2 left-2 text-white font-bold text-xl w-[210px] h-[8px] bg-gray-200"></div>
      <div className="ml-4 mt-4 rounded-xl bottom-2 left-2 text-white font-bold text-xl w-[180px] h-[8px] bg-gray-200"></div>
    </div>
  );
};
