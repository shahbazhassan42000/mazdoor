import {motion} from "framer-motion";
import { useDispatch } from "react-redux";
import { updatePopup } from "../../../store/mazdoor/mazdoorSlice";

const LaborCardSquare = ({ labor }) => {
  const dispatch=useDispatch();
  return (
    <motion.div
      layout
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      onClick={() => dispatch(updatePopup({status:true,type:"login",message:""}))}
      className="flex cursor-pointer select-none bg-[#E0E0E0] flex-col p-[15px] w-[189px] h-[215px] mr-10 mb-10 rounded-[20px] labor-card-shadow-hover hover:scale-105 transition-all duration-300">
      <div className="h-[60%] flex justify-center items-center">
        <div className="w-[85px] h-[85px] border-[2px] border-[#EB5757] rounded-[50%]">
          <img className="object-cover h-[100%] w-[100%] rounded-[50%]" src={labor?.image}
               alt="face of mazdoor" />
        </div>
      </div>
      <div className="h-[25%]">
        <h2 className="w-full overflow-hidden truncate font-bold text-[19px] leading-[23px] text-center text-[#222222]">
          {labor?.name}
        </h2>
      </div>
      <div className="h-[15%]">
        <div className="flex justify-between">
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">Rating</span>
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">{labor?.rating}%</span>
        </div>
        <div className="w-full bg-white rounded-[100px] mt-1 h-[6.65px]">
          <div style={{ width: `${labor?.rating}%` }}
               className=" bg-[#EB5757] rounded-[100px] h-[6.65px]">
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default LaborCardSquare;
