"use client";

interface ViewAllButtonProps {
  query: string;
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ query }) => {
  const firstPage = 1;
  return (
    <div
      className="flex flex-row items-center"
      onClick={() => {
        window.location.assign(
          `/search?q=${encodeURIComponent(query)}&p=${firstPage}`
        );
      }}
    >
      <div className=" font-semibold ">View all</div>
      <img src="arrowRight.svg" className="w-8"></img>
    </div>
  );
};
