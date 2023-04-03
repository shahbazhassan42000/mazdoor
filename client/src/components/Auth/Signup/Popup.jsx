import Join from "./Join";
import SelectRole from "./SelectRole";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Login from "../Login";
import Logout from "../Logout";

const Popup = () => {
  const popup=useSelector(state=>state.mazdoorStore.popup);
  return (
    <div className="popup-overlay">
      {popup.type==="join" && <Join/>}
      {popup.type==="select-role" && <SelectRole/>}
      {popup.type==="signup" && <Signup/>}
      {popup.type==="login" && <Login/>}
      {popup.type==="logout" && <Logout/>}
    </div>
  );
};

export default Popup;