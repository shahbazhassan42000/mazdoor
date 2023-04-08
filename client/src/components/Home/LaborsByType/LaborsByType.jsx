import { useSelector } from "react-redux";
import { filterLaborsByType } from "../../../utils/helpers";
import { useEffect, useMemo, useState } from "react";
import VerticalLaborsNav from "./VerticalLaborsNav";
import loadingGif from "../../../assets/gifs/loading.gif";
import LaborsList from "./LaborsList";

const LaborsByType = () => {
  const [loading, setLoading] = useState(true);
  const labors = useSelector(state => {
    return filterLaborsByType(state.mazdoorStore.labors);
  });
  const [selected, setSelected] = useState(null);

  // Get the first key of labors object
  const firstKey = Object.keys(labors)[0];

  useEffect(() => {
    //if labors is not empty then set selected to first labor type
    if(firstKey){
      setSelected(firstKey);
      setLoading(false);
    }
  }, [firstKey]); // Add firstKey as dependency

  // Rest of the component
  return (
    <>
      <div className="relative min-h-[500px] flex gap-2 text-[#333] px-20 mb-[90px]">
        <VerticalLaborsNav labors={firstKey?Object.entries(labors):[]} selected={selected} setSelected={setSelected} />
        <LaborsList labors={selected?labors[selected]:[]}/>
        {loading && <div className="popup-overlay !absolute !mx-20">
          <div className="popup-container !absolute !mx-20">
            <img className="h-[10vw]" src={loadingGif} alt="loading"/>
          </div>
        </div>}
      </div>
    </>
  );
};

export default LaborsByType;