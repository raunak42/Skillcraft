import { BASE_URL } from "@/lib/constants";
import { ApiResponseAttributes } from "types";

interface AvatarComponentProps {}
export const AvatarComponent: React.FC<AvatarComponentProps> = async () => {
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/api/me`, {
      method: "POST",
      cache: "no-store",
    });

    const response: ApiResponseAttributes = await res.json();
    return response;
  };

  const response = await fetchData();

  const user = response.data?.user;
  const username = user?.username;
  const avatar = user?.avatar;

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
