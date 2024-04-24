import { CCHskeleton } from "../CourseCardHz/CCHskeleton"

export const VCSkeleton:React.FC=()=>{
    return<div className="lg:col-span-1 flex flex-col items-center justify-center border  rounded-xl bg-gray-50 ">
    <div
      className="xl:h-[600px] lg:w-[100%] lg:h-[486px] w-[100%] h-[500px] transition-all duration-300 ease-in-out bg-gray-50
       rounded-xl mt-2 lg:mt-0 overflow-hidden "
    >

      <CCHskeleton/>
      <CCHskeleton/>
      <CCHskeleton/>
      <CCHskeleton/>
      <CCHskeleton />

    </div>
  </div>
}