import { updatePopup } from "../../../store/mazdoor/mazdoorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { apiURL, checkEmailURL } from "../../../utils/constants";
import loadingGif from "../../../assets/gifs/loading.gif";


const Join = () => {
  const [msg, setMsg] = useState({status: false, msg: "", type: "error"});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const popup = useSelector((state) => state.mazdoorStore.popup);
  const handleJoin = (e) => {
    e.preventDefault();
    setLoading(true);
    const formObject = Object.fromEntries(new FormData(e.target));
    const {email} = formObject;
    if(!email){
      setMsg({status:true,msg:"Please enter email",type:"error"});
      setLoading(false);
      return;
    }
    //check if email is already registered
    axios.request({
      baseURL: apiURL,
      url: checkEmailURL,
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data:{user:{...formObject}}
    }).then((res) => {
      if(res.data.status==='success'){
        setMsg({status:false,msg:"",type:"success"});
        dispatch(updatePopup({status:true,type:"signup",message:{...popup.message,email}}));
      }else{
        setMsg({status:true,msg:res.data.message,type:"error"});
      }
    }).catch((err) => {
      console.log(err);
      setMsg({status:true,msg:"Did your internet connection fail? If it's not you, it's us. Please try again later.",type:"error"});
    }).finally(() => {
      setLoading(false);
    });
  };

  return (<div
    className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
    <i
      onClick={() => dispatch(updatePopup({status:false,type:"join",message:""}))}
      className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
    </i>
    <h1 className="text-2xl text-[#EB5757] font-bold">Join MAZDOOR</h1>
    <form
      onSubmit={(e) => handleJoin(e)}
      className="flex flex-col items-center justify-center gap-10 w-full">
      <input
        onChange={(e) => setMsg({status:false,msg:"",type:"error"})}
        name="email" className="inp w-full" placeholder="Email" type="email" required/>
      {/*Error message*/}
      {msg.status &&
        <p className={`-mt-10 -mb-6 ${msg.type === "success" ? "green" : "red"}`}>{msg.msg}</p>
      }
      <button className="primary-btn w-full">Continue
      </button>
    </form>
    <div className="flex gap-5 w-full">
      <hr className="w-full border border-[#333333]"/>
      <p className="mt-[-14px] w-full  font-bold">or continue</p>
      <hr className="w-full border border-[#333333]"/>
    </div>
    <p>Already a Member?&nbsp;
      <button
        onClick={() => dispatch(updatePopup({status:true,type:"login",message:""}))}
        className="text-[#EB5757] font-bold hover:text-[#EB7357]">Login</button>
    </p>
    {loading && <div className="popup-overlay">
      <div className="popup-container">
        <img className="h-[10vw]" src={loadingGif} alt="loading"/>
      </div>
    </div>}
  </div>);

};

export default Join;

