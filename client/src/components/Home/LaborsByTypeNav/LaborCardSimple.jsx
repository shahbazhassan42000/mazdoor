import {motion} from "framer-motion";

const LaborCardSimple=({labor})=>{
  return(
    <motion.div
      layout
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      title={labor.name}
      className="select-none h-[50px] flex gap-2 pr-2 rounded-md hover:bg-[#F7F4EA] cursor-pointer bg-[#E0E0E0]">
      {/* image */}
      <div className="h-[50px] w-[50px] flex-[0.5] justify-start">
          <img src={labor.image} className="object-cover rounded-md w-full h-full" alt="labor"/>
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
    </motion.div>
  );
}
export default LaborCardSimple;