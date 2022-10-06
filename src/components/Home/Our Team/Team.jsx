import {useSelector} from "react-redux";
import {useState} from "react";
import {map} from "lodash";
import TeamCard from "./TeamCard";


const Team = () => {
    const SIZE=4;

    const allTeam = useSelector(state => state.mazdoorStore.team);
    const [index, setIndex] = useState(0);
    const team = allTeam.slice(index, index + SIZE);
    return (
        <div className="flex flex-col px-20 mt-[100px]">
            <div className="relative">
                <span
                    className="absolute rotate-[-25deg] bg-[#F2C94C] w-[12px] h-[12px] rounded-[3px] top-6 right-0">
                </span>
            </div>
            <div className="flex flex-col w-[55%] ">
                <p className="actNav text-[18px] relative">
                    <span
                        className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] -top-14 left-16">
                        </span>
                    Our Team
                </p>
                <h2 className="leading-[60px] font-bold text-[#333333] text-[45px] relative">
                        <span
                            className="absolute rotate-[-25deg] bg-[#EB5757] w-[14px] h-[14px] rounded-[3px] -top-10 right-40">
                        </span>
                    Meet Our Team
                </h2>
            </div>
            <div className="flex pb-[200px] items-center mt-[80px]">
                <span
                    onClick={() => {
                        setIndex(index - SIZE < 0 ? index - SIZE + allTeam.length : index - SIZE)
                    }}
                    className="fa fa-angle-left h-[64px] w-[64px] flex items-center justify-center bg-[#E0E0E0] hover:bg-[#EB5757] hover:text-white cursor-pointer rounded-[50%]">
                </span>
                <div className="flex w-[90%] space-x-10 justify-center">
                    {map(team,(member,index)=>{
                        return <TeamCard key={index} member={member} />
                    })}
                </div>
                <span
                    onClick={() => {
                        setIndex((index + SIZE) % allTeam.length)
                    }}
                    className="fa fa-angle-right h-[64px] w-[64px] flex items-center justify-center bg-[#E0E0E0] hover:bg-[#EB5757] hover:text-white cursor-pointer rounded-[50%]">
                </span>
            </div>
        </div>
    );
}

export default Team;
