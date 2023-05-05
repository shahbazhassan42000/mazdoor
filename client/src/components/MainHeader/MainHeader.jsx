import logo from "../../assets/images/mazdoor-logo-file-web 1.png";
import Msg from "./Msg";
import Notification from "./Notification";
import ProfileCircle from "./ProfileCircle";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom";

const MainHeader = () => {
  const location=useLocation();
  return (
    <header className="bg-white flex w-full items-center text-[#333] gap-10 justify-between py-5 px-20 relative">
      <Link to="/" className="w-[22%]">
        <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo" />
      </Link>
      <ul className="flex space-x-5 items-center text-[#333] flex-1">
        {location.pathname!=="/dashboard" ? <div className="flex flex-1">
          <input
            onChange={(e) => e.target.nextElementSibling.disabled = !e.target.value.trim()}
            name="searchBar" className="inp w-full h-[40px] !rounded-[6px_0_0_6px] focus-visible:!border-[6px_0_0_6px]" placeholder="What services are you looking for today?" type="text"/>
          <button className="primary-btn fa fa-search !rounded-[0_6px_6px_0]" disabled></button>
        </div>
        :<div className="w-full"></div>
        }
        <div className="flex space-x-5 items-center justify-self-end">
          <Notification />
          <Msg/>
          <i className="not-italic text-[24px] fa-regular fa-heart hover:text-[#EB5757] cursor-pointer"></i>
          <i className="not-italic"><a className="text-[18px] font-bold hover:text-[#EB5757] font-[500]" href="client/src/components/MainHeader/MainHeader#">Orders</a></i>
          <ProfileCircle/>
        </div>
      </ul>
    </header>
  );
};

export default MainHeader;