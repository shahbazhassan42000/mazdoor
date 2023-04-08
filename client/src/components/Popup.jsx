import Join from "./Auth/Signup/Join";
import SelectRole from "./Auth/Signup/SelectRole";
import Signup from "./Auth/Signup/Signup";
import { useSelector } from "react-redux";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";

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