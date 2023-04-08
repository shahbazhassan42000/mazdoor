import LaborCardMini from "../../LaborCardMini";
import { map } from "lodash";
import { useEffect, useState } from "react";
import {motion} from "framer-motion";


const LaborsList = ({ labors }) => {
  const [index, setIndex] = useState(0); // State for current index
  const laborsList=labors.slice(index,index+6);

  // Function to move forward or backward of user records
  const move = (direction) => {
    if (direction === 'forward') {
      // Increment the index by 6
      setIndex((index) => (index + 6) % labors.length);
    } else if (direction === 'backward') {
      // Decrement the index by 6
      setIndex((index) => (index - 6 + labors.length) % labors.length);
    }
  };
  return (
    <div className="flex flex-col items-center flex-1">
      <motion.div layout className="flex flex-wrap justify-center h-full gap-12">
        {map(laborsList,(labor, index) => <LaborCardMini key={labor._id} labor={labor} />)}
      </motion.div>
      {/* Navigation buttons */}
      <div className="flex gap-10 justify-center items-end">
        <button
          onClick={() => move('backward')}
          className="fa fa-angle-left text-[30px]  text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></button>
        <button
          onClick={() => move('forward')}
          className="fa fa-angle-right text-[30px] text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></button>
      </div>
    </div>
  );
};

export default LaborsList;