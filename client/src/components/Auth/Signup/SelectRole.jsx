import { updatePopup } from "../../../store/mazdoor/mazdoorSlice";
import { useDispatch } from "react-redux";
import customerGif from "../../../assets/gifs/customer.gif";
import laborGif from "../../../assets/gifs/labor.gif";

const SelectRole = () => {
  const dispatch=useDispatch();
  const handleRoleSelect=(role)=>{
    dispatch(updatePopup({status:true,type:"join",message:{role}}));
  }
  return (<div
    className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
    <i
      onClick={() => dispatch(updatePopup({status:false,type:"select-role",message:""}))}
      className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
    </i>
    <h1 className="text-2xl text-[#EB5757] font-bold">Join MAZDOOR</h1>
    <h1 className="text-[#EB5757] font-bold">AS A</h1>
    <div className="flex justify-between gap-10 w-full px-10 ">
      <div
        onClick={()=>handleRoleSelect("CUSTOMER")}
        className="h-48 bottom-light-shadow flex flex-col cursor-pointer">
          <img className="object-fill w-full h-full" src={customerGif} alt="customer gif"/>
        <h1 className="text-[#EB5757] text-center font-bold">Customer</h1>
      </div>
      <div
        onClick={()=>handleRoleSelect("LABOR")}
        className="h-48 bottom-light-shadow cursor-pointer">
        <img className="object-fill w-full h-full" src={laborGif} alt="customer gif"/>
        <h1 className="text-[#EB5757] text-center font-bold">Labor</h1>
      </div>
    </div>
  </div>);
};

export default SelectRole;