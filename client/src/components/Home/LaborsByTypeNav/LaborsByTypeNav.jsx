import { useSelector } from "react-redux";
import { filterLaborsByType } from "../../../utils/helpers";
import { map } from "lodash";
import LaborNav from "./LaborNav";

const LaborsByTypeNav = () => {
  const labors=useSelector(state=>{
    return filterLaborsByType(state.mazdoorStore.labors)
  });
  return(
    <nav className="bg-[#EB5757] border-b border-[#333]">
      <ul className="flex items-center px-20 text-white">
        {map(labors,(labors,index)=>{
          if(index!=="undefined"){
            return <LaborNav key={index} type={index} labors={labors} />;
          }
        })}
      </ul>
    </nav>
  );
};

export default LaborsByTypeNav;