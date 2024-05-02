interface ToggleParams {
  query: string;
  pageNo: number;
  finalPage: number;
}

export const TogglePageButton: React.FC<ToggleParams> = ({
  query,
  pageNo,
  finalPage,
}: ToggleParams) => {
  const toGet = 10;
  const handleNextClick = () => {
    if (pageNo !== finalPage) {
      window.location.assign(
        `/search?q=${encodeURIComponent(query as string)}&p=${pageNo + 1}`
      );
    }
  };
  const handlePrevClick = () => {
    if (pageNo !== 1) {
      window.location.assign(
        `/search?q=${encodeURIComponent(query as string)}&p=${pageNo - 1}`
      );
    }
  };

  return (
    <div className="overflow-hidden flex flex-row items-center justify-center border  text-black w-[300px] h-[40px] rounded-full">
      <button
        onClick={handlePrevClick}
        className={`size-full ${pageNo !== 1 && "bg-black"} ${pageNo === 1 && "bg-gray-400 hover:cursor-not-allowed"} flex flex-row items-center justify-center w-[20%] h-full`}
      >
        <img src="arrowPrev.svg" className="size-[28px]"></img>
      </button>{" "}
      <div className="flex flex-row items-center justify-center w-[60%] h-full text-2xl">
        Page {pageNo}
      </div>
      <button
        onClick={handleNextClick}
        className={`size-full ${pageNo !== finalPage && "bg-black"} ${pageNo === finalPage && "hover:cursor-not-allowed bg-gray-400 "} flex flex-row items-center justify-center w-[20%] h-full`}
      >
        <img src="arrowNext.svg" className="size-[28px]"></img>
      </button>
    </div>
  );
};
