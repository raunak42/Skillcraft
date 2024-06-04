"use client";
import { ApiResponseAttributes } from "types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResults } from "@/components/SearchResults/SearchResults";
import Loading from "./loading";
import { TogglePageButton } from "@/components/TogglePageButton/TogglePageButton";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pageNo = Number(searchParams.get("p"));
  const [response, setResponse] = useState<ApiResponseAttributes>();
  const toGet = 10;

  const fetchData = async () => {
    const res = await fetch(`/api/search/${query}`, {
      method: "POST",
      body: JSON.stringify({ toGet, pageNo }),
    });
    const response: ApiResponseAttributes = await res.json();
    setResponse(response);
    if (!response.data?.courses) {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!response) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  if (response.error) {
    return <div className="mt-20 ml-10">An error occured</div>;
  }

  if (response.message) {
    return <div className="font-semibold text-2xl ml-10 mb-[350px]">{response.message}</div>;
  }

  if (!response.data?.courses) {
    return new Error();
  }

  const { courses } = response.data;
  const totalResults = response.data.totalResults as number;
  const totalPages = Math.ceil(totalResults/toGet)

  return (
    <div className="lg:px-6 flex flex-col lg:space-y-10 space-y-4 ">
      <div className="text-black text-2xl font-bold">
        {totalResults} results for "{query}"
      </div>

      {courses.map((course, index) => (
        <div key={index} className="w-full h-full ">
          <SearchResults course={course} />
        </div>
      ))}
      <div className="flex flex-row items-center justify-center mt-6">
        <TogglePageButton finalPage={totalPages} query={query as string} pageNo={pageNo} />
      </div>
    </div>
  );
}
