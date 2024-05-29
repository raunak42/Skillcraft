"use client";
import { useRecoilValue } from "recoil";
import {
  descriptionState,
  imageLinkState,
  priceState,
  titleState,
} from "state-store";

interface CourseCardProps {
  adminUsername: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ adminUsername }) => {
  // const id = courseId.toString();

  const title = useRecoilValue(titleState);
  const description = useRecoilValue(descriptionState);
  const imageLink = useRecoilValue(imageLinkState);
  const price = useRecoilValue(priceState);

  return (
    <div
      className={` flex-shrink-0 w-[260px] h-[300px] transition-all duration-300 ease-in-out border-[1.5px] border-black shadow bg-white rounded-lg overflow-hidden flex flex-col group `}
    >
      <div className="relative flex flex-col items-center justify-center">
        {imageLink && (
          <img className={` w-full h-[140px] object-cover`} src={imageLink} />
        )}
        {!imageLink && (
          <img className={` w-[60%] h-[140px] object-cover`} src={"/hat.svg"} />
        )}
        {
          <div className="absolute  inset-0 bg-gradient-to-t  from-black/40 to-transparent transition-all duration-300 ease-in-out"></div>
        }
        <h2 className="absolute bottom-2 left-2 text-white font-bold xl:text-xl">
          {title || "Title"}
        </h2>
      </div>

      <div className="overflow-hidden px-[8px] p-[4px] xl:p-2">
        <p className="text-ellipsis line-clamp-2 xl:line-clamp-2 ">
          {description || "Description here..."}
        </p>
      </div>
      <div className="xl:flex justify-start px-2 pt-4 hidden ">
        <h1 className="font-semibold">By {adminUsername}</h1>
      </div>
      <div className="mt-auto xl:p-2 px-2 flex flex-row justify-between">
        <div className="font-semibold xl:font-normal text-[#000000] py-2 text-md rounded">
          View Details
        </div>
        <div className="parent flex items-center">
          ₹{(!isNaN(parseFloat(price)) && price) || 0}/-
        </div>
      </div>
    </div>
  );
};
