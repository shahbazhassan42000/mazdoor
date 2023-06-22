import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const SideNav = () => {
  const {tab} = useParams ();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.mazdoorStore.user);
  return(
    <nav className="flex flex-col items-center bg-[#E0E0E0] py-5 rounded-sm">
      <ul className="flex flex-col justify-between h-full">
        <div>
          {/* item */}
          <Link
            to="/dashboard/dashboard"
            className={`${tab==="dashboard" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757] items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa fa-table-columns"></i>
            <li className="font-bold">Dashboard</li>
          </Link>
          {/* item */}
          <Link
            to="/dashboard/inbox"
            className={`${tab==="inbox" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa fa-inbox"></i>
            <li className="font-bold">Inbox</li>
          </Link>
          {/* item */}
          <Link
            to="/dashboard/profile"
            className={`${tab==="profile" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa-regular fa-user"></i>
            <li className="font-bold">Profile</li>
          </Link>
        </div>
        {/* item */}
        <Link
          to="/dashboard/logout"
          onClick={()=>{
            dispatch(updatePopup({ status: true, type: "logout", message: "" }))
          }}
          className={`${tab==="log out" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] text-[#A4A1A1] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
          <i className="fa fa-right-from-bracket rotate-180"></i>
          <li className="font-bold">Log out</li>
        </Link>

      </ul>
    </nav>
  );
}
