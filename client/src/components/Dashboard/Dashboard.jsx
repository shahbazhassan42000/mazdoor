import { useState } from "react";
import { SideNav } from "./SideNav";
import { DashboardFragment } from "./DashboardFragment";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  return (
    <div className="flex gap-2 text-[#333]">
      {/*  Side Nav */}
      <SideNav activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex flex-col flex-1">
        {/*  Top */}
        {activeNav !== "Profile" && <div className="flex justify-between w-full">
          <div>Active Orders - 0($0)</div>
          <div>Active Orders</div>
        </div>}
        {/*  Main */}
        <DashboardFragment activeNav={activeNav}/>
      </div>
    </div>
  );
};

export default Dashboard;