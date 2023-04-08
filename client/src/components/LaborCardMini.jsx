import { updatePopup } from "../store/mazdoor/mazdoorSlice";

const LaborCardMini=({labor})=>{
  return(
    <div
      title={labor.name}
      className="select-none relative p-2 w-[350px] flex gap-2 h-[120px] rounded-md labor-card-shadow-hover bg-[#E0E0E0]">
      {/* details button */}
      <i

        className="fa fa-bars absolute top-2 right-2 rounded-sm text-[#969696] hover:text-[#333] cursor-pointer">
      </i>
      {/* image */}
      <div className="py-3 h-[100px] w-[100px] flex-[0.5]">
          <img src={labor.image} alt="labor" className="w-full h-full object-cover rounded-[50%]"/>
      </div>
      {/* Name and rating */}
      <div className="flex flex-col gap-2 justify-end gap-5 py-5 flex-1">
        <h2 className="text-[#222222] text-[18px] font-bold whitespace-nowrap overflow-hidden truncate max-w-full">{labor.name}</h2>
        <div className="h-[15%]">
          <div className="flex justify-between">
            <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">Rating</span>
            <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">{labor.rating}%</span>
          </div>
          <div className="w-full bg-white rounded-[100px] mt-1 h-[6.65px]">
            <div style={{width: `${labor.rating}%`}}
                 className=" bg-[#EB5757] rounded-[100px] h-[6.65px]">
            </div>
          </div>
        </div>
      </div>
      {/* starting quote */}
      <div className="flex flex-col justify-end items-center flex-[0.5]">
          <span className="text-[14px] text-[#EB5757]">Starting at</span>
        <h1 className="text-[#222222] text-[18px] font-bold">1000pkr</h1>
      </div>

    </div>
  );
}
export default LaborCardMini;