"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h1>{error.message}</h1>
      <button className="border border-gray-500 rounded-md p-1 hover:bg-gray-300" onClick={reset}>Try again</button>
    </div>
  );
};

export default error;
