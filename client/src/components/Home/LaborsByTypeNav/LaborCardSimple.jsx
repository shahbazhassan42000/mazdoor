import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const LaborCardSimple=({labor})=>{
  return(
    <Link
      to={`/labor/${labor._id}`}
      layout
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      title={labor.name}
      className="select-none h-[50px] flex gap-2 pr-2 rounded-md hover:bg-[#F7F4EA] cursor-pointer bg-[#E0E0E0]">
      {/* image */}
      <div className="h-[50px] w-[50px] flex-[0.5] justify-start">
          <img src={labor.image} className="object-cover justify-start items-start justify-self-start rounded-md h-[50px] w-[50px] " alt="labor"/>
      </div>
      {/* Name */}
      <div className="flex justify-center items-center flex-1">
        <h2 className="text-[#222222] text-[14px] font-bold whitespace-nowrap overflow-hidden truncate max-w-full">{labor.name}</h2>
      </div>
      {/* starting quote */}
      <div className="flex flex-col justify-center items-center flex-[0.5]">
        <span className="text-[12px] text-[#EB5757]">Starting at</span>
        <h1 className="text-[#222222] text-[14px] font-bold">1000pkr</h1>
      </div>
    </Link>
  );
}
export default LaborCardSimple;