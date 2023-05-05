import { ProfileSetting } from "./ProfileSetting";
import { useParams } from "react-router-dom";

export const DashboardFragment = () => {
  const {tab} = useParams ();
  return(
    <div className="relative w-full pb-20">
      {tab === "profile" && <ProfileSetting />}
    </div>
  );
}
