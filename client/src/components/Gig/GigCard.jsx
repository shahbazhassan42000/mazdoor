import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";

export const GigCard = ({ gig }) => {
  const [hover, setHover] = useState(false);
  return (
    // Gig Card
    <Link
      to={`/gig/${gig?._id}&${gig?.user?._id || gig?.user}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col w-[250px] cursor-pointer select-none rounded-sm border hover:scale-105 transition-all duration-300">
      {/*  Gig image*/}
      <div className="h-[150px]">
        <img src={gig?.image} alt="gig" className="w-full h-full object-cover rounded-sm" />
      </div>
      {/*  Gig Title*/}
      <h2
        className={`${hover && "text-primary"} text-darkBlack text-[16px] leading-[22px] gigCard-title break-words h-[53px] px-[12px] py-[5px]`}>
        {gig?.title}
      </h2>
      {/*Gig Rating*/}
      <div className="px-[12px] mt-2">
        <div className="flex justify-between">
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">Rating</span>
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">{gig?.rating}%</span>
        </div>
        <div className="w-full bg-secondary rounded-[100px] mt-1 h-[6.65px]">
          <div style={{ width: `${gig?.rating}%` }}
               className=" bg-primary rounded-[100px] h-[6.65px]">
          </div>
        </div>
      </div>
      {/*horizontal line*/}
      <hr className="w-full my-3" />
      {/*  love icon and gig price*/}
      <div className="flex text-lightGray justify-between items-center py-[10px] px-[12px]">
        <FavoriteIcon
          fontSize="small"
          />
        <span className="flex justify-between items-center font-bold gap-2">
          <h3 className="uppercase text-[14px]">
          Starting at
        </h3>
          <h3 className="text-darkBlack text-[16px]">{gig?.price}pkr</h3>
        </span>
      </div>

    </Link>
  );
};














