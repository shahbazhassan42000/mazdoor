import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import CategoryIcon from "@mui/icons-material/Category";
import { GigCard } from "../Gig/GigCard";
import { LaborContactCard } from "./LaborContactCard";

export const LaborProfile = () => {
  const { id } = useParams();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const user = useSelector((state) => state.mazdoorStore.user);
  const labors = useSelector((state) => state.mazdoorStore.labors);
  const conversations=useSelector((state) => state.mazdoorStore.conversations);

  const labor = user?._id === id ? user : labors.find((labor) => labor?._id === id);

  useEffect(() => {
    if (labor) {
      setLoading2(false);
    }
    if(labor && conversations) setLoading1(false);
  }, [labor,conversations]);

  return (
    <section className="flex lg:flex-row lg:gap-0 gap-5 flex-col px-20 my-10">
      {/*Labor Profile*/}
      <section className="min-w-[28%] mt-5">
        <div className="relative">
          <LaborContactCard labor={labor} conversations={conversations} />
          {/*loading*/}
          {loading1 && <div className="popup-overlay !absolute">
            <div className="popup-container !absolute">
              <img className="h-[10vw]" src={loadingGif} alt="loading" />
            </div>
          </div>}
        </div>
      </section>
      {/*Labor Gigs*/}
      <section className="flex flex-col flex-1 relative px-8">
        <h1 className="text-xl font-bold mb-2">{labor?.username}'s Gigs</h1>
        <div className="flex flex-wrap justify-center  items-center lg:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-5">
          {labor?.gigs && labor?.gigs.map((gig) => (
            <GigCard key={gig?._id} gig={gig} />
          ))}
        </div>
        {loading2 && <div className="popup-overlay !absolute">
          <div className="popup-container !absolute">
            <img className="h-[10vw]" src={loadingGif} alt="loading" />
          </div>
        </div>}
      </section>
    </section>
  );
};