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
    <div className="flex-shrink-0 w-[230px] h-[230px] transition-all duration-300 ease-in-out border shadow bg-white hover:bg-gray-200 hover:cursor-pointer rounded-lg overflow-hidden flex flex-col ">
      <div className="relative">
        <img className="w-full h-[116px] object-cover" src={imageLink} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/*inset is for this div to be set in (over) the image, try various values to test. Also, inset is the combination of 'bottom', 'top', 'left', 'right'*/}
        <h2 className="absolute bottom-2 left-2 text-white font-bold text-xl">
          {/*'bottom', 'left' are related to inset. These values can be used only when you are using 'relative' and 'absolute'*/}
          {title}
        </h2>
      </div>

      <div className="overflow-hidden">
        <p className="p-[14px] text-ellipsis line-clamp-2">{description}</p>
      </div>
      <div className="mt-auto mb-2 px-2 flex flex-row justify-between">
        <button className=" text-[#EA3A36] py-2 text-md font-semibold rounded">
          View Details
        </button>
        <div className="parent flex items-center">₹{price}/-</div>
      </div>
    </div>
  );
};
