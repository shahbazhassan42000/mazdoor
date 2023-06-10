import Carousel from "react-material-ui-carousel";
import { map } from "lodash";
import { GigCard } from "./GigCard";
import { useEffect, useState } from "react";

export const GigCarousal = ({ gigs, count }) => {
  console.log(gigs, count);

  // initialize the index with zero
  const [index, setIndex] = useState(0);
  const [filteredGigs, setFilteredGigs] = useState([]);
  // function to increment the index in a circular way
  const forward = () => {
    // add one to the index and use modulus operator to wrap around the array length
    setIndex((index + count) % gigs?.length);
  };

  // function to decrement the index in a circular way
  const backward = () => {
    // subtract one from the index and use modulus operator to wrap around the array length
    // add the array length to avoid negative values
    setIndex((index - count + gigs?.length) % gigs?.length);
  };
  useEffect(() => {
    const filtered = [];
    for (let i = 0; i < count; i++) {
      // Use modulo to wrap around the index
      let j = (index + i) % gigs?.length;
      filtered.push(gigs[j]);
    }
    setFilteredGigs(filtered);
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
      <div className="flex justify-evenly gap-5">
        {map(filteredGigs, (gig) => <GigCard key={gig?._id} gig={gig} />)}
      </div>
    </Carousel>
  );

};