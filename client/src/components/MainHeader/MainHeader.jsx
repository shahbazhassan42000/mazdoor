import { useDispatch } from "react-redux";
import logo from "../../assets/images/mazdoor-logo-file-web 1.png";
import Msg from "./Msg";
import Notification from "./Notification";
import ProfileCircle from "./ProfileCircle";

const MainHeader = () => {
  const dispatch=useDispatch();
  return (
    <header className="bg-white flex w-full items-center text-[#333] justify-between py-5 px-20">
      <a href="/" className="w-[22%]">
        <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo" />
      </a>
      <ul className="flex space-x-5 items-center text-[#333]">
        <div className="flex">
          <input
            onChange={(e) => e.target.nextElementSibling.disabled = !e.target.value.trim()}
            name="searchBar" className="inp w-[500px] h-[40px] !rounded-[6px_0_0_6px] focus-visible:!border-[6px_0_0_6px]" placeholder="What services are you looking for today?" type="text"/>
          <button className="primary-btn fa fa-search !rounded-[0_6px_6px_0]" disabled></button>
        </div>
        <Notification />
        <Msg/>
        <i className="not-italic text-[24px] fa-regular fa-heart hover:text-[#EB5757] cursor-pointer"></i>
        <i className="not-italic"><a className="text-[18px] font-bold hover:text-[#EB5757] font-[500]" href="client/src/components/MainHeader/MainHeader#">Orders</a></i>
        <ProfileCircle/>
      </ul>
    </header>
  );
};

export default MainHeader;