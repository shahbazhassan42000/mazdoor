import { useSelector } from "react-redux";
import { filterLaborsByType } from "../../utils/helpers";
import { map } from "lodash";
import LaborNav from "./LaborNav";

const LaborsByTypeNav = () => {
  const labors=useSelector(state=>{
    return filterLaborsByType(state.mazdoorStore.labors)
  });
  return(
    <nav className="bg-[#EB5757] border-b border-[#333]">
      <ul className="flex items-center text-[#333] px-20 text-white">
        {map(labors,(labor,index)=><LaborNav key={index} type={index} labor={labor} />)}
      </ul>
    </nav>
  );
};

export default LaborsByTypeNav;