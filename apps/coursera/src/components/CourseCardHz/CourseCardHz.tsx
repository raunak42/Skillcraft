interface CourseCardHzProps {
  imageLink: string;
  title: string;
}

export const CourseCardHz: React.FC<CourseCardHzProps> = ({
  imageLink,
  title,
}) => {
  return (
    <div className="relative border rounded-2xl overflow-hidden w-[97%] hover:w-full hover:cursor-pointer  transition-all duration-300 ease-in-out mx-auto">
  <img className="w-full h-[116px] object-cover" src={imageLink} />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  <h2 className="absolute bottom-2 left-2 text-white font-bold text-xl">{title}</h2>
</div>
  );
};
