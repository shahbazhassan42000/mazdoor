import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useRandomGigs = (num) => {
  const gigs = useSelector((state) => state.mazdoorStore.gigs);
  const [randomGigs, setRandomGigs] = useState([]);

  // uncomment this when have large data
  // for (let i = 0; i < num; i++) {
  //   const randomIndex = Math.floor(Math.random() * labors.length);
  //   const randomLabor = labors[randomIndex];
  //   const randomGigIndex = Math.floor(Math.random() * randomLabor.gigs.length);
  //   const randomGig = randomLabor.gigs[randomGigIndex];
  //   gigs.push(randomGig);
  // }

  //test data

  return gigs.slice(0, num);

};