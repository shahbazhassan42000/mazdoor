import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiURL, loginURL } from "../../utils/constants";
import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { togglePasswd } from "./Signup/Signup";
import loadingGif from "../../assets/gifs/loading.gif";

const Logout=()=>{
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.mazdoorStore.popup);
  const user= useSelector(state => state.mazdoorStore.user);
  return (<div
    className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
    <i
      onClick={() => dispatch(updatePopup({status:false,type:popup.type,message:popup.message}))}
      className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
    </i>
    <h1 className="text-2xl text-[#EB5757] font-bold">Logout to MAZDOOR</h1>
    <form
      className="flex flex-col items-center justify-center gap-10 w-full">
      <div className="flex space-x-3 items-center">
        <div className="relative flex justify-center items-center py-2 w-[72px]">
          <img
            className="object-cover w-[72px] h-[72px] rounded-[50%]"
            src={user.image} alt="profile"/>
        </div>
        <div className="flex flex-col">
          <p className="text-[#5e6c84] text-start font-bold text-[20px]">{user.username}</p>
          <p className="text-[14px] text-[#253858]">{user.email}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          localStorage.removeItem("token");
          window.location.pathname = "/";
          e.preventDefault();
        }}
        className="primary-btn w-full">Logout
      </button>
    </form>
  </div>);
};

export default Logout;