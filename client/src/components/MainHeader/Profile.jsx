import { useDispatch, useSelector } from "react-redux";
import { loadLaborsTypes, updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { Link, useLocation } from "react-router-dom";

const Profile = ({ setProfile }) => {
  const user = useSelector(state => state.mazdoorStore.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;
  return (
    <div
      className="absolute top-14 z-[9999] -right-4 bg-[#fff] flex flex-col space-y-3 absolute py-4 w-[304px] rounded-[3px] shadow-[0_10px_13px_#091e4240]">
      <div className="flex justify-between items-center mx-4  border-b border-b-[#091e4221]">
        <div className="w-full mb-2">
          <p className="text-center text-[14px] text-[#5e6c84]">Account</p>
        </div>
        <span
          onClick={() => setProfile(false)}
          className="fa fa-close text-[14px] text-[#5e6c84] hover:text-[#172b4d]">
              </span>
      </div>
      <div className="flex space-x-3 items-center mx-4 border-b border-b-[#091e4221] pb-3">
        <div className="relative flex justify-center items-center py-2 h-[45px] w-[35px] rounded-[50%]">
          <img className="object-cover w-[35px] h-[35px] rounded-[50%]" title={user.name} src={user.image}
               alt="profile" />
        </div>
        <div className="flex flex-col">
          <p className="text-[#172b4d] text-[14px]">{user.username}</p>
          <p className="text-[12px] text-[#B3BAC5]">{user.email}</p>
        </div>
      </div>
      {currentURL !== "/dashboard" &&
        <div className="flex flex-col space-y-2x">
          <Link className="text-[#172b4d] px-4 text-[14px] text-start py-1 hover:bg-[#091e420a]" to="/dashboard/dashboard"
                onClick={() => {
                  setProfile(false);
                  dispatch(loadLaborsTypes());
                }}>
            Dashboard
          </Link>
        </div>
      }
      {currentURL !== "/dashboard" &&
        <div className="flex flex-col space-y-2 mx-4 border-b border-b-[#091e4221] pb-3">
          <Link
           to="/dashboard/profile"
            onClick={() => {
              setProfile(false);
            }}
            className="text-[#172b4d] -mx-4 px-4  text-[14px] text-start py-1 hover:bg-[#091e420a]">
            Profile Setting
          </Link>
        </div>
      }
      <div className="flex flex-col space-y-2x">
        <button onClick={() => {
          setProfile(false);
          dispatch(updatePopup({ status: true, type: "logout", message: "" }));
        }}
                className="text-[#172b4d]  px-4  text-[14px] text-start py-1 hover:bg-[#091e420a]">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;

