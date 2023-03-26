import Join from "./Join";
import SelectRole from "./SelectRole";
import Signup from "./Signup";
import { useSelector } from "react-redux";

const SignupPopup = () => {
  const popup=useSelector(state=>state.mazdoorStore.popup);
  return (
    <div className="popup-overlay">
      {popup.type==="join" && <Join/>}
      {popup.type==="select-role" && <SelectRole/>}
      {popup.type==="signup" && <Signup/>}
    </div>
  );
};

export default SignupPopup;