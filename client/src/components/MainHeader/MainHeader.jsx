import logo from "../../assets/images/mazdoor-logo-file-web 1.png";
import Msg from "./Msg";
import Notification from "./Notification";
import ProfileCircle from "./ProfileCircle";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const user = useSelector((state) => state.mazdoorStore.user);
  return (
    <header className="bg-white flex w-full items-center text-[#333] gap-10 justify-between py-5 px-20 relative">
      <Link to="/" className="w-[22%]">
        <img className="object-fill w-[100%] h-[100%]" src={logo} alt="logo" />
      </Link>
      <ul className="flex space-x-5 items-center text-[#333] flex-1">
        <SearchBar />
        <div className="flex space-x-5 items-center justify-self-end">
          <Notification />
          <Msg />
          <i className="not-italic text-[24px] fa-regular fa-heart hover:text-[#EB5757] cursor-pointer"></i>
          {/* {user?.role !== "ADMIN" && */}
            <i className="not-italic">
              <Link
                to="/orders"
                className="text-[18px] hover:text-[#EB5757] font-[500]">
                Orders
              </Link>
            </i>
          {/* } */}
          <ProfileCircle />
        </div>
      </ul>
    </header>
  );
};

export default MainHeader;