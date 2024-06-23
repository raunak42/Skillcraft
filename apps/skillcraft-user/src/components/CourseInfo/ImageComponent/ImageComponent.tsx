"use client";
import { useEffect, useState } from "react";
import { PrismaCourseOutput } from "types";

interface ImageComponentProps {
  base64: string;
  course: PrismaCourseOutput<{ select: {}; include: { admin: true } }>;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  base64,
  course,
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = course.imageLink!;
    img.onload = () => {
      setIsImgLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load image");
      setIsImgLoaded(false);
    };
  }, [course.imageLink]);

  return (
    <div className="w-full" >
      {!isImgLoaded && (
        <img
          className="rounded-xl shrink-0 w-full"
          src={base64}
          alt={course.title as string}
        />
      )}
      {isImgLoaded && (
        <img
          className="rounded-xl shrink-0 w-full"
          src={course.imageLink!}
          alt={course.title as string}
        />
      )}
    </div>
  );
};
