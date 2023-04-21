import logo from "../assets/images/mazdoor-logo-file-web 1.png";
import { useDispatch } from "react-redux";
import { updatePopup } from "../store/mazdoor/mazdoorSlice";

const Header = () => {
  const dispatch=useDispatch();
  return (
    <header className="bg-white flex w-full items-center justify-between py-5 px-20 relative">
      <a href="/" className="w-[22%]">
        <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo" />
      </a>
      <ul className="flex space-x-10 items-center text-[#333] font-[500] text-[18px]">
        <i className="not-italic"><a className="actNav nav text-[18px]  hover:text-[#EB5757]"
                                     href="#whyMazdoor">Why MAZDOOR</a></i>
        <i className="not-italic"><a className="nav hover:text-[#EB5757]" href="#services">Services</a></i>
        <i className="not-italic"><a className="nav hover:text-[#EB5757]" href="#mazdoors">Mazdoors</a></i>
        <i className="not-italic"><a className="mav hover:text-[#EB5757]" href="#team">Team</a></i>
        <i className="not-italic"><a className="nav hover:text-[#EB5757]" href="#aboutUS">About Us</a></i>
        <i className="not-italic flex items-center">
          <a
            onClick={() => dispatch(updatePopup({status:true,type:"login",message:""}))}
            className="hover:text-[#333] hover:bg-[#F2C94C] text-[18px] cursor-pointer px-[13px] py-[7px] rounded-[25px]">Login
          </a>
        </i>
        <i className="not-italic flex items-center">
          <a
            onClick={() => dispatch(updatePopup({status:true,type:"select-role",message:""}))}
            className="bg-[#EB5757] cursor-pointer hover:text-[#333] text-[18px] hover:bg-[#F2C94C] text-white px-[13px] py-[7px] rounded-[25px]">
            <span className="fa fa-arrow-right-to-bracket mr-2"></span>Join
          </a></i>
      </ul>
    </header>
  );
};

export default Header;
