interface ChaptersProps{
    chapters:[]
}

export const Chapters: React.FC<ChaptersProps> = async ({chapters}) => {
  return (
    <div className="pb-4 md:pb-0 pt-10">
      <h1 className=" lg:text-2xl xl:text-2xl font-semibold">
        What you'll learn :-
      </h1>

      <div className="space-y-1 pl-[6px]">
        <div className="overflow-y-auto mt-2">
          {chapters?.map((chapter, index) => (
            <h1
              key={index}
              className="lg:text-lg xl:text-base text-sm lg:pl-[18px] pl-[10px]"
            >
              • Chapter {index + 1}: {chapter}
              <br />
              {/* • Chapter {index + 1}: {chapter} */}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};
