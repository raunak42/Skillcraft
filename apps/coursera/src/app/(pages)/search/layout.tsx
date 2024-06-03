"use client";
import { TogglePageButton } from "@/components/TogglePageButton/togglePageButton";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface landingLayoutParams {
  children: ReactNode;
}

const landingLayout = (params: landingLayoutParams) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pageNo = Number(searchParams.get("p"));
  return (
    <div>
      {params.children}
      <div className="flex flex-row items-center justify-center mt-6">
        {/* <TogglePageButton query={query as string} pageNo={pageNo} /> */}
      </div>
    </div>
  );
};

export default landingLayout;
