import { useSelector } from "react-redux";
import { useState } from "react";
import Profile from "./Profile";

const ProfileCircle = () => {
  const [profile, setProfile] = useState(false);
  const user= useSelector(state => state.mazdoorStore.user);
  return(
    <div className="relative flex justify-center items-center h-[45px] w-[45px]">
      <img
        className="object-cover w-full h-full rounded-[50%] border hover:border-primary"
        title={user.name}
        onClick={() => setProfile(!profile)}
        src={user.image} alt="profile"/>
      {profile && <Profile setProfile={setProfile}/>}
    </div>
  );
}
export default ProfileCircle;