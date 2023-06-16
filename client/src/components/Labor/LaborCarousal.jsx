import Carousel from "react-material-ui-carousel";
import { map } from "lodash";
import { useEffect, useRef, useState } from "react";
import LaborCardSquare from "../Landing/Labors/LaborCardSquare";
import LaborCardRectangle from "./LaborCardRectangle";

export const LaborCarousal = ({ labors, cardType, count, cols }) => {


  const cont = useRef(null);

  useEffect(()=>{
    if(cont?.current){
      cont.current.style.display = "grid";
      cont.current.style.justifyItems = "center";
      cont.current.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }
  },[cols]);


  // initialize the index with zero
  const [index, setIndex] = useState(0);
  const [filteredLabors, setFilteredLabors] = useState([]);

  const forward = () => {
    if (labors?.length <= count) return;
    setIndex((index + count) % labors?.length);
  };

  const backward = () => {
    if (labors?.length <= count) return;
    setIndex((index - count + labors?.length) % labors?.length);
  };
  useEffect(() => {
    const filtered = [];
    for (let i = 0; i < count; i++) {
      let j = (index + i) % labors?.length;
      filtered.push(labors[j]);
    }
    setFilteredLabors(filtered);
  }, [index]);


  return (
    <Carousel
      next={() => forward()}
      prev={() => backward()}
      indicators={false}
      fullHeightHover={false} // this will make the items have their own height
      autoPlay={false}
      animation="slide"
      interval={5000}
    >
      <div
        ref={cont}
        className="flex justify-evenly w-full gap-5">
        {
          map(filteredLabors, (labor) => {
            return cardType === "SQUARE" ? <LaborCardSquare labor={labor} key={labor?._id} /> :
              <LaborCardRectangle labor={labor} key={labor?._id} />;
          })
        }
      </div>
    </Carousel>
  );

};