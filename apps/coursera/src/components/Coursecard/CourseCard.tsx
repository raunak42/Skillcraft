interface CourseCardProps {
  title?: string;
  description?: string;
  imageLink?: string;
  price?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageLink,
  price,
}) => {
  return (
    <div className="flex-shrink-0 xl:w-[260px] xl:h-[300px] sm:w-[220px] sm:h-[192px] w-[152px] h-[110px] transition-all duration-300 ease-in-out border-[1.5px] border-black shadow bg-white hover:cursor-pointer rounded-lg overflow-hidden flex flex-col group ">
      <div className="relative">
        <img className="w-full h-[115px] xl:h-[140px] sm:h-[90px] object-cover" src={imageLink} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:from-black/60 sm:to-black/20 group-hover:from-black/40 group-hover:to-transparent transition-all duration-300 ease-in-out"></div>
        {/*inset is for this div to be set in (over) the image, try various values to test. Also, inset is the combination of 'bottom', 'top', 'left', 'right'*/}
        <h2 className="absolute bottom-2 left-2 right-1 text-white font-bold text-xs sm:text-xl">
          {/*'bottom', 'left' are related to inset. These values can be used only when you are using 'relative' and 'absolute'*/}
          {title}
        </h2>
      </div>
      
      <div className="hidden sm:block overflow-hidden p-2 ">
        <p className="text-ellipsis line-clamp-3 ">{description}</p>
      </div>
      <div className="hidden  mt-auto mb-2 px-2 sm:flex flex-row justify-between">
        <button className=" text-[#000000] py-2 text-md font-semibold rounded">
          View Details
        </button>
        <div className="parent flex items-center">₹{price}/-</div>
      </div>
    </div>
  );
};
