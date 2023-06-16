const LaborInfo = ({mazdoor, setMazdoorInfo}) => {

    return (
        <div
            className="relative flex flex-col bg-[#E0E0E0] mt-[48px] mb-[80px] w-[500px] rounded-[20px] p-[20px] shadow-[10px_10px_4px_0px_#00000080] select-none">
             <span
                 onClick={() =>setMazdoorInfo(false)}
                 className="absolute border border-[#EB5757]  top-4 right-4 fa fa-close text-2xl text-[#EB5757] hover:bg-[#091e4214] h-[35px] w-[35px] flex justify-center items-center rounded-[50%]">
                </span>
            <div className="flex w-full space-x-[20px] mb-[17px]">
                <div className=" w-[50%] h-[250px] border-[2px] border-[#EB5757] rounded-[12px]">
                    <img className="object-cover h-[100%] w-[100%] rounded-[12px]" src={mazdoor.img}
                         alt="face of mazdoor"/>
                </div>
                <div className="flex w-[50%] flex-col justify-center items-center space-y-[20px] p-[20px]">
                    <h2 className="w-full  font-bold text-[24px] leading-[25px] text-center text-[#222222]">
                        {mazdoor.name}
                    </h2>
                    <div className="w-full">
                        <div className="flex justify-between">
                            <span className="text-[#7E7E7E] text-[14px] leading-[10px] font-[600]">Rating</span>
                            <span className="text-[#7E7E7E] text-[14px] leading-[10px] font-[600]">{mazdoor.rating}%</span>
                        </div>
                        <div className="w-full bg-white rounded-[100px] mt-1 h-[8.65px]">
                            <div style={{width: `${mazdoor.rating}%`}}
                                 className=" bg-[#EB5757] rounded-[100px] h-[8.65px]">
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex flex-col mx-auto space-y-2 mb-[17px]">
                <div className="flex space-x-2">
                    <h3 className="font-[700] text-[19px] leading-[22px] text-[#222222] w-[100px]">Age:</h3>
                    <p className="text-[19px] leading-[22px]">{mazdoor.age}</p>
                </div>
                <div className="flex space-x-2">
                    <h3 className="font-[700] text-[19px] leading-[22px] text-[#222222] w-[100px]">CNIC:</h3>
                    <p className="text-[19px] leading-[22px]">{mazdoor.cnic==="-"?"-":mazdoor.cnic.slice(0,5)+"-"+mazdoor.cnic.slice(5)}</p>
                </div>
                <div className="flex space-x-2">
                    <h3 className="font-[700] text-[19px] leading-[22px] text-[#222222] w-[100px]">Area:</h3>
                    <p className="text-[19px] leading-[22px]">{mazdoor.area}</p>
                </div>
                <div className="flex space-x-2">
                    <h3 className="font-[700] text-[19px] leading-[22px] text-[#222222] w-[100px]">Type:</h3>
                    <p className="text-[19px] leading-[22px]">{mazdoor.type}</p>
                </div>
                <div className="flex space-x-2">
                    <h3 className="font-[700] text-[19px] leading-[22px] text-[#222222] w-[100px]">Contact:</h3>
                    <p className="text-[19px] leading-[22px]">{mazdoor.phone.slice(0,4)}-{mazdoor.phone.slice(4)}</p>
                </div>

            </div>
            <div className="flex justify-center">
                <a className="text-center w-[100px] hover:text-black bg-[#EB5757] hover:bg-[#F2C94C]  text-white px-[20px] py-[12px] rounded-[25px]"
                   href={`tel:+92${mazdoor.phone.slice(1)}`}>
                    CALL
                </a>
            </div>
        </div>
    );
}

export default LaborInfo;
