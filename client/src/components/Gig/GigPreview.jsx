import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { useSelector } from "react-redux";
import { LaborContactCard } from "../Labor/LaborContactCard";

export const GigPreview = () => {
  const { id } = useParams();
  const [gigID, userID] = id.split("&");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const user = useSelector((state) => state.mazdoorStore.user);
  const labors = useSelector((state) => state.mazdoorStore.labors);
  const labor = user?._id === userID ? user : labors?.find((labor) => labor?._id === userID);
  const gig = labor?.gigs.find((gig) => gig._id === gigID);

  useEffect(() => {
    if (labor && gig) {
      setLoading1(false);
      setLoading2(false);
    }
  }, []);

  return (
    <section className="flex lg:flex-row gap-5 flex-col px-20">
      {/*Gig Preview*/}
      <section className="flex flex-col flex-1 relative gap-3">
        {/*Gig Title*/}
        <h1 className="text-3xl text-lightBlack font-bold">{gig?.title}</h1>
        {/*Labor avatar, name, username and rating*/}
        <div className="flex items-center gap-3">
          {/*  Labor avatar*/}
          <div
            className="relative flex justify-center items-center h-[35px] w-[35px]">
            <img
              className="object-cover w-full h-full rounded-[50%]"
              title={labor.name}
              src={labor.image} alt="labor avatar" />
          </div>
          <div className="flex items-baseline gap-3">
            {/*  Labor Name*/}
            <Link
              to={`/labor/${labor?._id}`}
              className="text-xl text-lightBlack font-bold hover:underline">
              {labor?.name}
            </Link>
            {/*  Labor username*/}
            <Link
              to={`/labor/${labor?._id}`}
              className="text-sm text-lightGray hover:underline">
              @{labor?.username}
            </Link>
            <span className="text-lightGray  text-sm">|</span>
            {/*Labor Rating*/}
            <div className="w-[120px] bg-secondary rounded-[100px] h-[6.65px]">
              <div style={{ width: `${labor?.rating}%` }}
                   className=" bg-primary rounded-[100px] h-[6.65px]">
              </div>
            </div>
            <span className="text-xs text-lightBlack">{labor?.rating}%</span>
          </div>
        </div>
        {/*Horizontal Line*/}
        <hr className="w-full" />
        {/*Gig Image*/}
        <div className="relative h-[300px] w-full hover:scale-105 transition-all duration-300">
          <img
            className="object-cover w-full h-full rounded-sm"
            src={gig?.image} alt="gig image" />
        </div>
        {/*  Gig Description*/}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl text-darkBlack font-bold">About the gig</h1>
          <p className="text-lightBlack font-[500] leading-loose">{gig?.description}</p>
        </div>
        {loading2 && <div className="popup-overlay !absolute">
          <div className="popup-container !absolute">
            <img className="h-[10vw]" src={loadingGif} alt="loading" />
          </div>
        </div>}
      </section>
      {/*Labor Profile*/}
      <section className="min-w-[28%]">
        <LaborContactCard labor={labor} />
        {/*loading*/}
        {loading1 && <div className="popup-overlay !absolute">
          <div className="popup-container !absolute">
            <img className="h-[10vw]" src={loadingGif} alt="loading" />
          </div>
        </div>}
      </section>
    </section>
  );
};