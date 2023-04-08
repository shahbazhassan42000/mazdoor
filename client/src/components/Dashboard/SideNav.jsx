import { updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { useDispatch } from "react-redux";

export const SideNav = ({activeNav,setActiveNav}) => {
  const dispatch=useDispatch();
  return(
    <nav className="flex flex-col items-center bg-[#E0E0E0] py-5 rounded-sm">
      <ul className="flex flex-col justify-between h-full">
        <div>
          {/* item */}
          <div
            onClick={()=>setActiveNav("Dashboard")}
            className={`${activeNav==="Dashboard" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757] items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa fa-table-columns"></i>
            <li className="font-bold">Dashboard</li>
          </div>
          {/* item */}
          <div
            onClick={()=>setActiveNav("Inbox")}
            className={`${activeNav==="Inbox" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa fa-inbox"></i>
            <li className="font-bold">Inbox</li>
          </div>
          {/* item */}
          <div
            onClick={()=>setActiveNav("Orders")}
            className={`${activeNav==="Orders" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa fa-bars-progress"></i>
            <li className="font-bold">Orders</li>
          </div>
          {/* item */}
          <div
            onClick={()=>setActiveNav("Profile")}
            className={`${activeNav==="Profile" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
            <i className="fa-regular fa-user"></i>
            <li className="font-bold">Profile</li>
          </div>
        </div>
        {/* item */}
        <div
          onClick={()=>{
            dispatch(updatePopup({ status: true, type: "logout", message: "" }))
            setActiveNav("Log out");
          }}
          className={`${activeNav==="Log out" && 'actNav'} flex gap-3 px-5 py-2 mb-3 text-[18px] text-[#A4A1A1] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover`}>
          <i className="fa fa-right-from-bracket rotate-180"></i>
          <li className="font-bold">Log out</li>
        </div>

      </ul>
    </nav>
  );
}
