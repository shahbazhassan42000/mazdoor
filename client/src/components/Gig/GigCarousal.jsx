import Carousel from "react-material-ui-carousel";
import { map } from "lodash";
import { GigCard } from "./GigCard";
import { useEffect, useRef, useState } from "react";

export const GigCarousal = ({ gigs, count, cols, type }) => {
  const cont = useRef(null);

  useEffect(()=>{
    if(cont?.current){
      cont.current.style.display = "grid";
      cont.current.style.justifyItems = "center";
      cont.current.style.gridTemplateColumns = `repeat(${cols||4}, 1fr)`;
    }
  },[cols]);

  const [index, setIndex] = useState(0);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const forward = () => {
    if (gigs?.length <= count) return;
    setIndex((index + count) % gigs?.length);
  };

  const backward = () => {
    if (gigs?.length <= count) return;
    setIndex((index - count + gigs?.length) % gigs?.length);
  };
  useEffect(() => {
    console.log("index updated", index);
    const filtered = [];
    if (gigs?.length > count) {
      for (let i = 0; i < count; i++) {
        // Use modulo to wrap around the index
        let j = (index + i) % gigs?.length;
        filtered.push(gigs[j]);
      }
      setFilteredGigs(filtered);
    } else {
      setFilteredGigs(gigs);
    }
  }, [index]);


  return (
    type ?
      <Carousel
        next={() => forward()}
        prev={() => backward()}
        indicators={false}
        fullHeightHover={false} // this will make the items have their own height
        autoPlay={false}
        animation="slide"
        interval={5000}
        navButtonsProps={{
          style: {
            backgroundColor: "#EB5757",
            borderRadius: 6,
            width: 130,
          }
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: "0",
            top: "unset"
          }
        }}
        NextIcon="next"
        PrevIcon="prev"
      >
        <div ref={cont} className="flex justify-evenly w-full gap-5">
          {map(filteredGigs, (gig) => <GigCard key={gig?._id} gig={gig} />)}
        </div>
      </Carousel>
      :
      <Carousel
        next={() => forward()}
        prev={() => backward()}
        indicators={false}
        fullHeightHover={false} // this will make the items have their own height
        autoPlay={false}
        animation="slide"
        interval={5000}
      >
        <div ref={cont} className="flex justify-evenly w-full gap-5">
          {map(filteredGigs, (gig) => <GigCard key={gig?._id} gig={gig} />)}
        </div>
      </Carousel>

  );

};