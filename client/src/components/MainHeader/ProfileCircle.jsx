import { useSelector } from "react-redux";
import { useState } from "react";
import Profile from "./Profile";

const ProfileCircle = () => {
  const [profile, setProfile] = useState(false);
  const user= useSelector(state => state.mazdoorStore.user);
  return(
    <div className="relative flex justify-center items-center py-2 h-[50px] w-[38px]">
      <img
        className="object-cover rounded-[50%] border hover:border-[#EB5757]"
        title={user.name}
        onClick={() => setProfile(!profile)}
        src={user.image} alt="profile picture"/>
      {profile && <Profile setProfile={setProfile}/>}
    </div>
  );
}
export default ProfileCircle;