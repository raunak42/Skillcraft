export const CCHskeleton:React.FC=()=>{
    return<div className="animated-gradient bg-gray-200 border rounded-2xl overflow-hidden w-[96%] mt-4 mx-auto flex flex-row  h-[20%]">
    <div className="relative w-[270px] md:w-[240px] lg:w-[60%]">
      {/* <img className=" object-cover h-[110px]" src={imageLink} /> */}
    </div>
    <div className="flex flex-col w-full px-2 pt-[4px]">
      {/* <h2 className="text-black font-semibold">{title}</h2> */}
      {/* <h4 className="text-black text-xs line-clamp-2">{description}</h4> */}
      <div className="flex flex-row justify-between mt-auto">
        {/* <h1>₹{price}/-</h1> */}
      </div>
    </div>
  </div>
}