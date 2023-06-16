import drillMan from "../../assets/gifs/8t4M.gif";
import Services from "./Services";
import Labor from "./Labors/Labor";
import Team from "./Our Team/Team";
import AboutUs from "./AboutUs";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Popup";
import { updatePopup } from "../../store/mazdoor/mazdoorSlice";

const Landing = () => {
  const popup = useSelector(state => state.mazdoorStore.popup);
  const dispatch = useDispatch();
  return (
    <>
    <div className="flex justify-between px-20">
      <div className="flex flex-col text-[#333333] space-y-[4vw] 2xl:pt-[7vw] pt-[2.19vw] w-[50%]">

        <h1 className="font-bold text-[5.27vw] leading-[105px] relative">
          <span className="absolute bg-[#EB5757] w-[6px] h-[6px] rounded-[50%] -top-3 left-72"></span>
          Be The Fastest In Getting Mazdoor at&nbsp;
          <span className="actNav !font-bold relative">
                            <span
                              className="absolute bg-[#F2C94C] w-[10px] h-[10px] rounded-[50%] top-6 -right-36"></span>
                            DoorStep
                        </span>
        </h1>
        <p className="text-[18px] leading-[30px] w-[430px] font-[500]">
          To provide an easy platform for builders to hire the laborers
        </p>
        <div
          onClick={() => dispatch(updatePopup({ status: true, type: "login", message: "" }))}
          className="text-center primary-btn w-fit !rounded-[25px]">
          Find Mazdoor
      </div>
    </div>
    <div className="w-[50%] relative">
      <img className="object-fill w-[100%] h-[90%]" src={drillMan} alt="constructor drilling" />
      <span
        className="absolute rotate-[-25deg] bg-[#EB5757] w-[14px] h-[14px] rounded-[3px] bottom-48 right-9"></span>
    </div>
    </div>
  <Services />
  <Labor />
  <Team />
  <AboutUs />
</>
)
  ;
};

export default Landing;
