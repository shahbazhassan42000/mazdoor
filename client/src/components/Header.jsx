import logo from "../assets/images/mazdoor-logo-file-web 1.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePopup } from "../store/mazdoor/mazdoorSlice";

const Header = () => {
  const dispatch=useDispatch();
  return (
    <header className="bg-white flex w-full justify-between py-5 px-20">
      <a href="#root" className="w-[22%]">
        <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo" />
      </a>
      <div>
        <ul className="flex space-x-10 mt-[20px]">
          <i className="not-italic"><a className="actNav nav text-[18px] hover:text-[#EB5757] font-[500]"
                                       href="#whyMazdoor">Why MAZDOOR</a></i>
          <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#services">Services</a></i>
          <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#mazdoors">Mazdoors</a></i>
          <i className="not-italic"><a className="mav hover:text-[#EB5757] font-[500]" href="#team">Team</a></i>
          <i className="not-italic"><a className="nav hover:text-[#EB5757] font-[500]" href="#aboutUS">About Us</a></i>
          <i className="not-italic">
            <a
              onClick={() => dispatch(updatePopup({status:true,type:"login",message:""}))}
              className="hover:text-black hover:bg-[#F2C94C] cursor-pointer font-[500] text-black px-[20px] py-[14px] rounded-[25px]">Login
            </a>
          </i>
          <i className="not-italic !ml-4">
            <a
              onClick={() => dispatch(updatePopup({status:true,type:"select-role",message:""}))}
              className="bg-[#EB5757] cursor-pointer hover:text-black hover:bg-[#F2C94C] font-[500] text-white px-[20px] py-[14px] rounded-[25px]">
              <span className="fa fa-arrow-right-to-bracket mr-2"></span>Join
            </a></i>
        </ul>
      </div>
    </header>
  );
};

export default Header;
