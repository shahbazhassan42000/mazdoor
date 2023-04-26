import { ProfileSetting } from "./ProfileSetting";

export const DashboardFragment = ({ activeNav }) => {
  return(
    <div className="relative w-full pb-20">
      {activeNav === "Profile" && <ProfileSetting />}
    </div>
  );
}
