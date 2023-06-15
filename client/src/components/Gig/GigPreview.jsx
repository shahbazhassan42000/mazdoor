import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState ,useRef } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { LaborContactCard } from "../Labor/LaborContactCard";
import { GigCarousal } from "./GigCarousal";
import { useRandomGigs } from "../../Hooks/useRandomGigs";
import Badge from "@mui/material/Badge";

export const GigPreview = () => {
  const { id } = useParams();
  const [gigID, userID] = id.split("&");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const linkRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.mazdoorStore.user);
  const labors = useSelector((state) => state.mazdoorStore.labors);
  const gigs = useSelector((state) => state.mazdoorStore.gigs);
  const labor = user?._id === userID ? user : labors?.find((labor) => labor?._id === userID);
  const gig = labor?.gigs.find((gig) => gig._id === gigID);
  const conversations = useSelector((state) => state.mazdoorStore.conversations);
  
  const onChat = (e) => {
    e.preventDefault();
    if (loading1) return;
    if (conversations?.find((conversation) => conversation?.receiver?.username === labor?.username)) {
      linkRef.current.click();
    } else {
      dispatch(updatePopup({ status: true, type: "contactLabor", message: labor }))
    }
  };

  useEffect(() => {
    if (gig) {
      setLoading2(false);
    }
  }, [gig]);
  useEffect(() => {
    if(labor && conversations) setLoading1(false);
  }, [labor,conversations]);

  useEffect(() => {
    if (gigs && gigs.length > 0) {
      setLoading3(false);
    }
  }, [gigs]);


  return (
    <section className="flex flex-col gap-10 px-20 relative">
      <section className="flex lg:flex-row gap-5 flex-col">
        {/*Gig Preview*/}
        <section className="flex flex-col flex-1 gap-3">
          <div className="relative flex flex-col flex-1 gap-3">
            {/*Gig Title*/}
            <h1 className="text-3xl text-lightBlack font-bold">{gig?.title}</h1>
            {/*Labor avatar, name, username and rating*/}
            <div className="flex items-center gap-3">
              {/*  Labor avatar*/}
              <div
                className="relative flex justify-center items-center h-[35px] w-[35px]">
                <img
                  className="object-cover w-full h-full rounded-[50%]"
                  title={labor?.name}
                  src={labor?.image} alt="labor avatar" />
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
            <hr className="w-full" />
            {/*Gig price and Delivery time*/}
            <div className="flex justify-between gap-5 font-bold uppercase">
              {/*  Gig Price*/}
              <span className="flex justify-between items-center font-bold gap-2">
          <h3>
          Starting at:
        </h3>
          <h3 className="text-darkBlack">{gig?.price}pkr</h3>
        </span>
              {/*Contact Me button*/}
              <button
                disabled={loading1}
                onClick={(e) => onChat(e)}
                className="primary-btn !text-[1rem] !py-[5px]">Let's Discuss</button>
              {/*  Gig Delivery Time*/}
              <span className="flex justify-between items-center gap-2">
          <h3>
          Delivery Time:
        </h3>
          <h3 className="text-darkBlack">{gig?.deliveryTime} Days</h3>
        </span>
            </div>
            <hr className="w-full mb-3" />
            {loading2 && <div className="popup-overlay !absolute">
              <div className="popup-container !absolute">
                <img className="h-[10vw]" src={loadingGif} alt="loading" />
              </div>
            </div>}
          </div>
        </section>
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
      </section>
      {/*Recommend Gigs*/}
      <section className="flex flex-col gap-10 p-5 border rounded-sm">
        <h1 className="text-2xl text-midBlack font-bold">Recommended for you</h1>
        <div className="min-h-[330px] w-full relative">
          {loading3
            ?
            <div className="popup-overlay !absolute">
              <div className="popup-container !absolute">
                <img className="h-[10vw]" src={loadingGif} alt="loading" />
              </div>
            </div>
            :
            <GigCarousal gigs={gigs?.slice(0, 12) || []} count={4} />
          }
        </div>
      </section>
      {/*  Labor's Others Gigs*/}
      <section className="flex flex-col gap-10 p-5 border rounded-sm">
        <h1 className="text-2xl text-midBlack font-bold">More services by <Link
          className="text-primary hover:underline"
          to={`/labor/${labor?._id}`}>
          {labor?.username}
        </Link>
        </h1>
        <div className="min-h-[330px] w-full relative">
          {labor && <GigCarousal gigs={labor?.gigs.filter(gig => gig._id !== gigID)} count={4} />}
        </div>
      </section>
      {/*  Chat float button*/}
      <Link to={`/inbox/${labor?.username}`} ref={linkRef} className="hidden" />
      <div
        onClick={(e) => onChat(e)}
        className={`fixed bottom-10 left-10 items-center flex rounded-full bg-bg chat-popup-shadow gap-5 p-[8px_24px_8px_8px] z-40 hover:bg-border cursor-pointer ${loading1 && "bg-border cursor-not-allowed text-lightBlack"}`}>
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          sx={{ '& .MuiBadge-badge': { border: "2px solid white", backgroundColor: "gray" }}}
          overlap="circular" badgeContent=" ">
          <div className="w-[50px] h-[50px] rounded-[50%]">
            <img
              className="object-cover w-full h-full rounded-[50%]"
              title={labor?.name}
              src={labor?.image} alt="labor avatar" />
          </div>
        </Badge>
        <div className="flex flex-col gap-1 w-[195px] font-bold">
          <h1 className="text-midBlack truncate">Message {labor?.name}</h1>
          <div className="flex justify-between text-lightGray text-xs items-center">
            {/*    Labor Status*/}
            <span>Away</span>
            <span className="h-[3px] w-[3px] bg-lightGray"></span>
            <span>Avg. response time: 1 Hour</span>
          </div>
        </div>
      </div>


    </section>
  );
};