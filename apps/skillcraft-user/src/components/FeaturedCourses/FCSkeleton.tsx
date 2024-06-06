import { CCSkeleton } from "../Coursecard/CCSkeleton";

export const FCSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 5 }, (_, indexA) => (
        <div
          key={indexA}
          className="flex flex-row overflow-x-auto no-scrollbar"
        >
          {Array.from({ length: 15 }, (_, indexB) => (
            <div className="lg:px-[12px] px-2" key={indexB}>
              <CCSkeleton />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
