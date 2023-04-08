import { useState } from "react";
import { motion } from "framer-motion";
import LaborCardSimple from "./LaborCardSimple";
import { map } from "lodash";

const LaborNav = ({ type, labors }) => {
  const [dropdown, setDropdown] = useState(false);
  const index=Math.floor(Math.random() * (labors.length - 6));
  return (
    <div className="relative flex-1">
      <li
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        className="relative px-5 py-2 flex-1 clicked-shadow-hover cursor-pointer">{type}
      </li>
      {dropdown && <motion.div
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        layout
        className="absolute bg-white flex flex-col gap-2 text-[#333] w-full z-30 p-10">
        {/*map over random 6 labors by slicing random 6 from labors array such that starting of slice is not greater than length of array - 6*/}
        {
          map(labors.slice(index,index+6),(labor,index)=><LaborCardSimple key={labor._id} labor={labor} />)
        }
      </motion.div>}
    </div>
  );
};
export default LaborNav;