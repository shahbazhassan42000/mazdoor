import { useDispatch, useSelector } from "react-redux";
import { updateProfileCompleted } from "../store/mazdoor/mazdoorSlice";

export const ProfileCompletedMsg = () => {
  const profileCompleted = useSelector(state=>state.mazdoorStore.profileCompleted);
  const dispatch = useDispatch();
  return(
    <div className="absolute shadow-[0_10px_13px_#091e4240] flex text-white gap-5 p-5 right-5 mt-5 bg-[#CCA55A] z-[99] rounded-md">
      <div>
        <h3 className="text-[18px] font-[500]">Complete Your Profile</h3>
        <p>To be able to accept works and add gigs.</p>
      </div>
      <div className="relative">
        <span
          onClick={()=>dispatch(updateProfileCompleted({status:true}))}
          className="fa fa-close absolute text-[14px] -right-3 -top-3 hover:text-[#172b4d]">
              </span>
        {/*completion circle*/}
        <div className="rounded-[50%] bg-[#A28448] h-[50px] w-[50px] flex flex-col justify-center items-center">
          <span className="fa fa-user text-[#C7B690] flex flex-col justify-center items-center"></span>
        {/*  Percentage */}
          <h3 className=" font-[500]">
            {profileCompleted.percent}%
          </h3>
        </div>
      </div>

    </div>
  );
}