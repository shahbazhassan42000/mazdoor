import { useState } from "react";
import { SideNav } from "./SideNav";
import { DashboardFragment } from "./DashboardFragment";
import loadingGif from "../../assets/gifs/loading.gif";
import { useSelector } from "react-redux";
import { Message } from "../Message";
import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState( location.state && location.state.tab || "Dashboard");
  const profileCompleted = useSelector(state => state.mazdoorStore.profileCompleted);
  const user = useSelector((state) => state.mazdoorStore.user);
  return (
    <div className="flex gap-5 text-[#333]">
      {/*  Side Nav */}
      <SideNav activeNav={activeNav} setActiveNav={setActiveNav} />
      {/*Main*/}
      <div className="flex flex-col flex-1 relative">
        {user && user.role === "LABOR" && activeNav !== "Profile" && !user.profileCompleted && !profileCompleted.status ?
          <div className="popup-overlay !absolute">
            <div className="popup-container !absolute">
              <div
                className="popup-container text-[#333333] flex flex-col items-center justify-center gap-5 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
                <li className="fa-solid text-5xl fa-user-lock"></li>
                <h1 className="text-2xl text-[#EB5757] font-bold">Please Complete your profile</h1>
              </div>
            </div>
          </div>
          :
          <>
            {/*  Top */}
            {activeNav !== "Profile" && <div className="flex justify-between w-full">
              <div>Active Orders - 0($0)</div>
              <div>Active Orders</div>
            </div>}
            {/*  Main */}
            <DashboardFragment activeNav={activeNav} />
          </>
        }
      </div>
    </div>
  );
};

export default Dashboard;