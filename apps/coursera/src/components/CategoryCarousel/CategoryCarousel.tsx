import { useRecoilState } from "recoil";
import { courseClickedState } from "state-store";

interface ccProps {}

export const CategoryCarousel: React.FC<ccProps> = () => {
  const [isLoading, setIsLoading] = useRecoilState(courseClickedState);

  const categories = [
    "Art",
    "Computer Science",
    "Physics",
    "Business",
    "Entrepreneurship",
    "Health",
    "Music",
    "Science",
    "Development",
    "Python",
    "Programming",
    "Craft",
    "Communication",
    "Public speaking",
  ];

  return (
    <div className="flex flex-col overflow-y-auto">
      {categories.map((category, index) => (
        <h1
          key={index}
          onClick={() => {
            setIsLoading(true);
            window.location.assign(
              `/search?q=${encodeURIComponent(category)}&p=${1}`
            );
          }}
          className="py-2 pl-4 hover:bg-gray-200 hover:cursor-pointer"
        >
          {category}
        </h1>
      ))}
    </div>
  );
};
