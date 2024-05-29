interface SignupWarningsProps {
  status: string;
}
export const SignupWarnings: React.FC<SignupWarningsProps> = ({ status }) => {
  return (
    <div className="w-[330px] h-[410px] sm:w-[440px] sm:h-[360px] py-4 px-2 flex flex-col items-start justify-start">
      {status === "invalid" && (
        <div className=" flex flex-col gap-2" >
          <h1 className="font-semibold flex flex-row items-start justify-start text-xs text-red-500">
            Username must be longer than five characters.
          </h1>
          <h1 className="font-semibold flex flex-row items-start justify-start text-xs text-red-500">
            Password must contain at least one uppercase letter, one number, and
            one special character.
          </h1>
        </div>
      )}
      {status === "taken" && (
        <h1 className="font-semibold flex flex-row items-start justify-start text-xs text-red-500">
          Username taken.
        </h1>
      )}
    </div>
  );
};
