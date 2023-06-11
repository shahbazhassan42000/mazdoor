import { useSelector } from "react-redux";
import { useState } from "react";
import { map } from "lodash";
import TeamCard from "./TeamCard";


const Team = () => {
  const team = useSelector(state => state.mazdoorStore.team);
  return (
    <div id="team" className="flex flex-col px-20 mt-[100px]">
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
      <div className="flex items-center mt-[80px]">
        <div className="flex w-[100%] space-x-10 justify-center">
          {map(team, (member, index) => {
            return <TeamCard key={index} member={member} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
