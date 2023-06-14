import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { format } from "date-fns";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const LaborContactCard = ({ labor, conversations }) => {
  const dispatch = useDispatch();
  const linkRef = useRef(null);

  const onContactLabor = (e) => {
    e.preventDefault();
    if (conversations?.find((conversation) => conversation?.receiver?.username === labor?.username)) {
      linkRef.current.click();
    } else {
      dispatch(updatePopup({ status: true, type: "contactLabor", message: labor }))
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 min-w-[28%] relative rounded-sm border-2">
      {/*Labor Image*/}
      <a
        rel="noreferrer"
        href={labor?.image}
        target="_blank"
        className="rounded-full overflow-hidden w-[150px] h-[150px]  labor-card-shadow-hover flex justify-center items-center select-none cursor-pointer border hover:border-primary mb-2">
        <img className="object-cover w-full h-full" src={labor?.image} alt="labor" />
      </a>
      {/*Labor Name*/}
      <h1 className="text-2xl font-bold">{labor?.name}</h1>
      {/*Labor username*/}
      <h1 className="text-xl text-lightGray">@{labor?.username}</h1>
      {/*Labor Rating*/}
      <div className="w-[80%]">
        <div className="flex justify-between">
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">Rating</span>
          <span className="text-[#7E7E7E] text-[10px] leading-[8px] font-[600]">{labor?.rating}%</span>
        </div>
        <div className="w-full bg-secondary rounded-[100px] mt-1 h-[6.65px]">
          <div style={{ width: `${labor?.rating}%` }}
               className=" bg-primary rounded-[100px] h-[6.65px]">
          </div>
        </div>
      </div>
      {/*Contact me button*/}
      <button
        onClick={(e) => onContactLabor(e)}
        className="primary-btn my-3 !text-[1rem] !py-[5px]">Contact Me</button>
      <Link to={`/inbox/${labor?.username}`} ref={linkRef} className="hidden" />
      {/*horizontal line*/}
      <hr className="w-full mb-3" />
      {/*Labor Details */}
      <div className="flex flex-col gap-2 w-full">
        {/*row*/}
        <div className="flex w-full justify-between text-lightBlack">
          {/*Icon with text*/}
          <span className="flex items-center gap-2">
                    <LocationOnIcon fontSize="small" />
                    <p>From</p>
                  </span>
          {/*  Detail */}
          <p className="font-bold max-w-[200px] whitespace-nowrap overflow-hidden truncate">{labor?.area}</p>
        </div>
        {/*row*/}
        <div className="flex w-full justify-between text-lightBlack">
          {/*Icon with text*/}
          <span className="flex items-center gap-2">
                    <CategoryIcon fontSize="small" />
                    <p>Category</p>
                  </span>
          {/*  Detail */}
          <p className="font-bold max-w-[200px] whitespace-nowrap overflow-hidden truncate">{labor?.type}</p>
        </div>
        {/*row*/}
        <div className="flex w-full justify-between text-lightBlack">
          {/*Icon with text*/}
          <span className="flex items-center gap-2">
                    <PersonIcon fontSize="small" />
                    <p>Member since</p>
                  </span>
          {/*  Detail */}
          <p
            className="font-bold">{format(new Date(labor?.createdAt || "2023-06-09T10:46:46.823Z"), "MMM yyyy")}</p>
        </div>
        {/*row*/}
        <div className="flex w-full justify-between text-lightBlack">
          {/*Icon with text */}
          <span className="flex items-center gap-2">
                    <AccessTimeIcon fontSize="small" />
                    <p>Avg. Response Time</p>
                  </span>
          {/*  Detail */}
          <p className="font-bold">2 hours</p>
        </div>
        {/*row*/}
        <div className="flex w-full justify-between text-lightBlack">
          {/*Icon with text */}
          <span className="flex items-center gap-2">
                    <SendIcon className="-rotate-45" fontSize="small" />
                    <p>Last Delivery</p>
                  </span>
          {/*  Detail */}
          <p className="font-bold">23 hours</p>
        </div>
      </div>
    </div>
  );
};