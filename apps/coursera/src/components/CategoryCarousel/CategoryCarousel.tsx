
interface ccProps {}

export const CategoryCarousel: React.FC<ccProps> = () => {
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
    <div className="flex flex-col">
      {categories.map((category,index) => (
        <h1 key={index}
          onClick={() => {
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
