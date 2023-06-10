import { Link } from "react-router-dom";

export const GigCardMini=({gig,setSearch})=>{
  return(
    <Link
      to={`/gig/${gig._id}&${gig.user}`}
      onClick={()=>setSearch(false)}
      title={gig?.name}
      className="select-none h-[50px] flex w-full justify-between gap-2 pr-2 rounded-md hover:bg-[#F7F4EA] cursor-pointer bg-[#E0E0E0] hover:scale-105 transition-all duration-300">
      {/* image */}
      <div className="h-[50px] w-[50px] ">
        <img src={gig?.image} className="object-cover justify-start items-start justify-self-start rounded-md h-[50px] w-[50px] " alt="gig"/>
      </div>
      {/* Name */}
      <div className="flex justify-start  items-center flex-1 w-[400px]">
        <h2 className="text-[#222222] text-[14px] font-bold whitespace-nowrap overflow-hidden truncate">{gig?.title}</h2>
      </div>
      {/* starting quote */}
      <div className="flex flex-col justify-center items-center">
        <span className="text-[12px] text-[#EB5757]">Starting at</span>
        <h1 className="text-[#222222] text-[14px] font-bold">{gig?.price}pkr</h1>
      </div>
    </Link>
  );
};