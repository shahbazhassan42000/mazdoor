import labour from "../../../assets/gifs/WBPi.gif";
import LaborCardSquare from "./LaborCardSquare";
import { useSelector } from "react-redux";
import { useState } from "react";
import { map } from "lodash";
import { LaborCarousal } from "../../Labor/LaborCarousal";


const Labor = () => {

  const labors = useSelector(state => state.mazdoorStore.labors);
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col px-20 mt-[10px]">
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[55%] pt-[130px]">
          <p className="actNav text-[18px] uppercase">Labors</p>
          <h2 className="leading-[60px] font-bold text-[#333333] text-[45px] relative">
                    <span

                      className="absolute rotate-[-25deg] bg-[#F2C94C] w-[14px] h-[14px] rounded-[3px] -top-10 right-40">
                    </span>
            Labor That is Always available for you
          </h2>
        </div>
        <div className="pr-[90px] h-[303px]">
          <img className="object-fill w-[100%] h-[100%]" src={labour} alt="labour standing with clipboard in hands" />
        </div>
      </div>
      {labors?.length > 0 && <LaborCarousal labors={labors} count={8} cols={4} cardType="SQUARE" />}
    </div>
  );
};

export default Labor;
