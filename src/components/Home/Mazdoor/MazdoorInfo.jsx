const MazdoorInfo = ({mazdoor, setMazdoorInfo}) => {

    return (
        <div
            className="relative flex flex-col w-[60] bg-[#E0E0E0] w-[60%] mt-[48px] mb-[80px] w-[768px] rounded-[20px] p-[16px] shadow-[10px_10px_4px_0px_#00000080] select-none">
            <div className="relative flex justify-center items-center h-[60%] ">
                <div className="w-[85px] h-[85px] border-[2px] border-[#EB5757] rounded-[50%]">
                    <img className="object-cover h-[100%] w-[100%] rounded-[50%]" src={mazdoor.img}
                         alt="face of mazdoor"/>
                </div>
                <span
                    onClick={() =>setMazdoorInfo(false)}
                    className="absolute border border-[#EB5757]  top-0 right-0 fa fa-close text-2xl text-[#EB5757] hover:text-[#F2C94C] hover:border-[#F2C94C]  h-[40px] w-[40px] flex justify-center items-center rounded-[50%]">
                </span>
            </div>
            <div className="h-[25%]">
                <h2 className="w-full overflow-hidden truncate font-bold text-[19px] leading-[23px] text-center text-[#222222]">
                    {mazdoor.name}
                </h2>
            </div>
            <div className="h-[15%]">
                <div className="flex justify-between">
                    <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">Rating</span>
                    <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">{mazdoor.rating}%</span>
                </div>
                <div className="w-full bg-white rounded-[100px] mt-1 h-[6.65px]">
                    <div style={{width: `${mazdoor.rating}%`}}
                         className=" bg-[#EB5757] rounded-[100px] h-[6.65px]">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MazdoorInfo;
