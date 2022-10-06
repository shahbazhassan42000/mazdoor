const TeamCard = ({member}) => {
    return (
        <div className="w-[20%] h-[180px] relative p-[18px] select-none cursor-pointer">
            <div className="z-10 h-[180px] w-full rounded-[40px] gradBorder p-[1px]">
                <div className="z-20 h-[178px] bg-white w-full rounded-[40px] p-[15px]">
                    <a href={member.linkedin} className="z-30 h-full rounded-[30px] relative flex justify-center items-center">
                        <img className="object-fill h-[100%] hover:blur-sm w-[100%] img  rounded-[30px]" src={member.img} alt="member profile"/>
                        <span className="absolute z-40 hidden hide text-[50px] fa-brands fa-linkedin text-[#0A66C2]"></span>
                    </a>
                </div>
            </div>
            <div className="absolute -z-10 top-0 left-0 h-[90px] w-full rounded-[50px_50px_0_0] linearBg">
            </div>
            <h3 className="absolute text-center font-[700] text-[20px] leading-[20px] -bottom-36 h-[100px] left-0 w-full">
                {member.name}
            </h3>
        </div>
    );
}
export default TeamCard;
