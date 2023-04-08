import LaborCardMini from "../../LaborCardMini";
import { map } from "lodash";

const LaborsList = ({ labors }) => {
  const laborsList=labors.slice(0,6);
  return (
    <div className="flex flex-col items-center h-full flex-1">
      <div className="flex flex-wrap justify-center h-full gap-12">
        {map(laborsList,(labor, index) => <LaborCardMini key={labor._id} labor={labor} />)}
      </div>
      {/* Navigation buttons */}
      <div className="flex gap-10 items-center justify-center">
        <li
          className="fa fa-angle-left text-[30px] text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></li>
        <li
          className="fa fa-angle-right text-[30px] text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></li>
      </div>
    </div>
  );
};

export default LaborsList;