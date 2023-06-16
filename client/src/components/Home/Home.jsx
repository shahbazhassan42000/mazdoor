import plumber from "../../assets/images/plumber-bg.png";
import labor_1 from "../../assets/images/labors-carousal/labors-1.jpeg";
import LaborsByTypeNav from "./LaborsByTypeNav/LaborsByTypeNav";
import LaborsByType from "./LaborsByType/LaborsByType";
import { useRandomGigs } from "../../Hooks/useRandomGigs";
import { GigCard } from "../Gig/GigCard";
import { useEffect, useState } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { map } from "lodash";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {

  const gigs = useSelector((state) => state.mazdoorStore.gigs);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (gigs) {
      setLoading(false);
    }
  }, [gigs]);
  return (
    <div className="flex flex-col">
      {/*hero section*/}
      <div className="flex flex-col h-screen">
        <LaborsByTypeNav />
        <div className="flex justify-between px-20 bg-[#EB5757]">
          <div className="flex flex-col text-white space-y-[2vw] 2xl:pt-[7vw] pt-[2.19vw] w-[50%]">

            <h1 className="font-bold text-[5.27vw] leading-[105px] relative">
              <span className="absolute bg-[#EB5757] w-[6px] h-[6px] rounded-[50%] -top-3 left-72"></span>
              Be The Fastest In Getting Mazdoor at&nbsp;
              <span className="text-[#F2C94C] !font-bold relative">
                            <span
                              className="absolute bg-[#F2C94C] w-[10px] h-[10px] rounded-[50%] top-6 -right-36">
                            </span>
                            DoorStep
              </span>
            </h1>
            <p className="text-[18px] leading-[30px] w-[430px] font-[500]">
              Our job is to filling your provide you mazdoor with fast and free method at doorstep
            </p>
            <Link
              to="/gigs"
              className="text-center primary-btn  !text-[#333] !bg-[#F2C94C] w-fit hover:!bg-white hover:!text-[#EB5757] !rounded-[25px]">
              Find Mazdoor
            </Link>
          </div>
          <div className="w-[50%] flex justify-end relative">
            <img className="object-fill h-[82vh] w-[95%]" src={plumber} alt="constructor drilling" />
            <span
              className="absolute rotate-[-25deg] bg-[#EB5757] w-[14px] h-[14px] rounded-[3px] bottom-48 right-9"></span>
          </div>
        </div>
      </div>
      {/*Labors by type*/}
      <LaborsByType />
      {/*ourself section*/}
      <div className="flex justify-between gap-10 px-20 py-16 bg-[#F9CDCD]">
        <div className="text-midBlack flex-1">
          <div className="flex flex-col gap-5 w-[80%]">
            <h1 className="font-bold text-[38px] mb-5">
              A whole world of Labors talent at your single click
            </h1>
            {/*Heading*/}
            <div className="flex items-center text-[20px] gap-3 -mb-3">
              <i className="fa-regular fa-circle-check text-[#7A7D85]"></i>
              <h2 className="font-bold">
                The best for every budget
              </h2>
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates, just project-based pricing.
            </p>
            {/*Heading*/}
            <div className="flex items-center text-[20px] gap-3 -mb-3">
              <i className="fa-regular fa-circle-check text-[#7A7D85]"></i>
              <h2 className="font-bold">
                Quality work done quickly
              </h2>
            </div>
            <p>
              Find the right Labor to begin working on your project within minutes.
            </p>
            {/*Heading*/}
            <div className="flex items-center text-[20px] gap-3 -mb-3">
              <i className="fa-regular fa-circle-check text-[#7A7D85]"></i>
              <h2 className="font-bold">
                Protected payments, every time
              </h2>
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released until you approve the work.
            </p>
            {/*Heading*/}
            <div className="flex items-center text-[20px] gap-3 -mb-3">
              <i className="fa-regular fa-circle-check text-[#7A7D85]"></i>
              <h2 className="font-bold">
                24/7 support
              </h2>
            </div>
            <p className="mb-2">
              Questions? Our round-the-clock support team is available to help anytime, anywhere.
            </p>
          </div>
        </div>
        {/*Labors poster*/}
        <div className="flex justify-center items-center flex-1">
          <img className="rounded-sm clicked-shadow-hover" src={labor_1} alt="laborers" />
        </div>
      </div>
      {/* Recommended Gigs*/}
      <section className="flex flex-col gap-10 px-20 my-10">
        <h1 className="text-2xl text-midBlack font-bold">Gigs you may like</h1>
        <div className="min-h-[500px] w-full relative">
          {loading
            ?
            <div className="popup-overlay !absolute">
              <div className="popup-container !absolute">
                <img className="h-[10vw]" src={loadingGif} alt="loading" />
              </div>
            </div>
            :
            <div
              className="flex flex-wrap justify-center  items-center lg:grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-2 gap-5">
              {map(gigs.slice(0, 12), (gig) => <GigCard key={gig._id} gig={gig} />)}
            </div>
          }
        </div>
        <div className="flex justify-center">
          <Link
            to="/gigs"
            className="primary-btn "
          >
            View More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;