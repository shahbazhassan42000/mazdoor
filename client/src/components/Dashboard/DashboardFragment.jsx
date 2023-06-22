import { ProfileSetting } from "./ProfileSetting";
import { useParams } from "react-router-dom";
import { DashboardMain } from "./DashboardMain/DashboardMain";
import { Inbox } from "../Chat/Inbox";
import { Orders } from "../Orders/Orders";

export const DashboardFragment = () => {
  const {tab} = useParams ();
  return(
    <div className="relative w-full flex-1 pb-20 pr-14 pl-5">
      {tab === "profile" && <ProfileSetting />}
      {tab === "dashboard" && <DashboardMain />}
      {tab === "inbox" && <Inbox />}
    </div>
  );
}
