const Loading: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap  justify-center items-center mb-[300px]">
        <img src="/spinnerBlack.svg" className="size-20 mt-10 animate-spin"></img>
      </div>
    </div>
  );
};

export default Loading;
