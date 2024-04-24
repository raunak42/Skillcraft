import { SRSkeleton } from "@/components/SearchResults/SRSkeleton";

const Loading: React.FC = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 15 }, (_, index) => (
        <div key={index}>
          <SRSkeleton />
        </div>
      ))}
    </div>
  );
};

export default Loading;
