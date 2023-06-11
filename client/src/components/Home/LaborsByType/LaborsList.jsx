import LaborCardRectangle from "../../Labor/LaborCardRectangle";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const LaborsList = ({ labors }) => {
  const [index, setIndex] = useState(0); // State for current index
  const [laborsList, setLaborsList] = useState([]); // State for labors list

  // Function to move forward or backward of user records
  const move = (direction) => {
    if (labors?.length <= 6) return; // If records are less than 6 then don't move
    if (direction === "forward") {
      // Increment the index by 6
      setIndex((index) => (index + 6) % labors.length);
    } else if (direction === "backward") {
      // Decrement the index by 6
      setIndex((index) => (index - 6 + labors.length) % labors.length);
    }
  };

  useEffect(() => {
    setLaborsList(labors.slice(0, 6));
  }, [labors]);

  useEffect(() => {
    const filtered = [];
    if (labors?.length > 6) {
      for (let i = 0; i < 6; i++) {
        // Use modulo to wrap around the index
        let j = (index + i) % labors?.length;
        filtered.push(labors[j]);
      }
    }else{
      filtered.push(...labors);
    }
    setLaborsList(filtered);
  }, [index]);

  return (
    <div className="flex flex-col items-center flex-1">
      <motion.div layout className="flex flex-wrap justify-center h-full gap-12">
        {map(laborsList, (labor, index) => <LaborCardRectangle key={labor._id} labor={labor} />)}
      </motion.div>
      {/* Navigation buttons */}
      <div className="flex gap-10 justify-center items-end">
        <button
          onClick={() => move("backward")}
          className="fa fa-angle-left text-[30px]  text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></button>
        <button
          onClick={() => move("forward")}
          className="fa fa-angle-right text-[30px] text-[#EB5757] hover:text-[#EB7357] cursor-pointer"
        ></button>
      </div>
    </div>
  );
};

export default LaborsList;