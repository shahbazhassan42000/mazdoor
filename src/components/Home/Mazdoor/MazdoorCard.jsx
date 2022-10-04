const MazdoorCard=({name,img,rating})=>{
    return (
        <div className="flex flex-col p-[15px] bg-[#E0E0E0] w-[189px] h-[215px] rounded-[20px] shadow-[10px_10px_4px_0px_#00000080]">
            <div className="h-[60%] flex justify-center items-center">
                <div className="w-[85px] h-[85px] border-[2px] border-[#EB5757] rounded-[50%]">
                    <img className="object-cover h-[100%] w-[100%] rounded-[50%]" src={img} alt="face of mazdoor"/>
                </div>
            </div>
            <div className="h-[25%]">
                <h2 className="w-full overflow-hidden truncate font-bold text-[19px] leading-[23px] text-center text-[#222222]">
                    {name}
                </h2>
            </div>
            <div className="h-[15%]">
                <div className="flex justify-between">
                    <span className="text-[#7E7E7E] text-[7px] leading-[8px] font-[400]">Rating</span>
                    <span className="text-[#7E7E7E] text-[7px] leading-[8px] font-[400]">{rating}%</span>
                </div>
                <div className="w-full bg-white rounded-[100px] mt-1 h-[3.65px]">
                    <div style={{width:`${rating}%`}}
                        className=" bg-[#EB5757] rounded-[100px] h-[3.65px]">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MazdoorCard;
