'use server'
import { validateRequest } from "@/auth";
import { BASE_URL } from "@/lib/constants";
import { ApiResponseAttributes } from "types";

export const SessionBarAvatar = async () => {
  const { session } = await validateRequest();

  const res = await fetch(`${BASE_URL}/api/me`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({
      session,
    }),
  });

  const response: ApiResponseAttributes = await res.json();
  const user = response.data?.user;
  const avatar = user?.avatar as string;
  const username = user?.username as string;

  return (
    <div
      className={`${!response && "animated-gradient"}  overflow-hidden shrink-0  size-8 lg:size-[36px] rounded-full  flex flex-row items-center justify-center`}
    >
      {response && <img className="size-full" src={avatar as string}></img>}
      {!response && (
        <div
          className="size-full bg-gray-300 rounded-full"
          // src="/emptyAvatar.svg"
        ></div>
      )}
    </div>
  );
};
