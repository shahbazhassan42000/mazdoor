import { map } from "lodash";

const VerticalLaborsNav = ({ labors, selected, setSelected }) => {
  return(
  <nav className="flex flex-col items-center bg-[#E0E0E0] rounded-md">
    <ul className="flex flex-col min-w-[200px] h-full">
      {map(labors.slice(0,8),(labor,index)=> {
        if(labors[index][0]!=="undefined"){
          return <li key={index}
                     onClick={()=>setSelected(labors[index][0])}
                     className={`${selected===labors[index][0] && 'actSecond'}  flex gap-3 px-5 py-3 text-[18px] hover:text-white hover:bg-[#EB5757] rounded-md items-center cursor-pointer justify-start`}>
            {labors[index][0]}
          </li>;
        }
      })}

    </ul>
  </nav>
  );
};

export default VerticalLaborsNav;