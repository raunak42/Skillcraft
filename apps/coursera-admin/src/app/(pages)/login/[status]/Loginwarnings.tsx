import { INVALID_USRNM_PSWRD_MESSAGE } from "@/lib/constants";
import { Toaster, toast } from "sonner";


export const LoginWarnings: React.FC = ({}) => {
  return (
    <div className=" py-4 px-2 flex flex-col items-start justify-start gap-2">
        <h1 className="font-semibold flex flex-row items-start justify-start text-xs text-red-500">
          {INVALID_USRNM_PSWRD_MESSAGE}
        </h1>
    </div>
  );
};
