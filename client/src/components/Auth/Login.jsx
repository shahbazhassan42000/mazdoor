import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import loadingGif from "../../assets/gifs/loading.gif";
import { apiURL, headers, loginURL } from "../../utils/constants";
import { loadUser, updatePopup } from "../../store/mazdoor/mazdoorSlice";
import { togglePasswd } from "./Signup/Signup";


const Login = () => {
  const [msg, setMsg] = useState({msg: "", type: "error"});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const popup = useSelector((state) => state.mazdoorStore.popup);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const formObject = Object.fromEntries(new FormData(e.target));
    const {username,password} = formObject;
    if(!username){
      setMsg({msg:"Please enter username",type:"error-u"});
      setLoading(false);
      return;
    }
    if(!password){
      setMsg({msg:"Please enter password",type:"error-p"});
      setLoading(false);
      return;
    }

    axios.request({
      baseURL: apiURL,
      url: loginURL,
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      cors:true,
      data:{user:formObject}
    }).then((res) => {
      //store token in localstorage
      localStorage.setItem('token',res.data);
      setMsg({msg:"",type:"success"});
      dispatch(updatePopup({status:false,type:"",message:{}}));
      //redirects to /home page
      window.location.pathname="/";
    }).catch((err) => {
      if (err.response.status===400)  setMsg({msg:err.response.data,type:"error-p"});
       else setMsg({msg:"Did your internet connection fail? If it's not you, it's us. Please try again later.",type:"error-p"});
    }).finally(() => {
      setLoading(false);
      console.clear();
    });
  };

  return (<div
    className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
    <i
      onClick={() => dispatch(updatePopup({status:false,type:popup.type,message:popup.message}))}
      className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
    </i>
    <h1 className="text-2xl text-[#EB5757] font-bold">Login to MAZDOOR</h1>
    <form
      onSubmit={(e) => handleLogin(e)}
      className="flex flex-col items-center justify-center gap-10 w-full">
      <input
        onChange={(e) => setMsg({msg:"",type:"error"})}
        name="username" className="inp w-full" placeholder="Username"  type="text" required/>
      {/*Error message*/}
      {msg.type==='error-u' &&
        <p className={`-mt-10 -mb-6 text-center ${msg.type === "success" ? "green" : "red"}`}>{msg.msg}</p>
      }
      <div className="relative flex flex-col w-full">
        <input
          onChange={(e) => setMsg({msg:"",type:"error"})}
          name="password" className="inp w-full" placeholder="Password" type="password" required/>
        <span onClick={(e) => togglePasswd(e)}
              className="text-[#5E6C84] absolute top-3 right-2 cursor-pointer fa-solid fa-eye-slash"></span>
        <p className="cursor-pointer text-[#EB5757] text-right">Forgot Password?</p>
        {/*Error message*/}
        {msg.type==='error-p' &&
          <p className={`-mb-10 text-center ${msg.type === "success" ? "green" : "red"}`}>{msg.msg}</p>
        }
      </div>

      <button className="primary-btn w-full">Login
      </button>
    </form>
    <div className="flex gap-5 w-full">
      <hr className="w-full border border-[#333333]"/>
      <p className="mt-[-14px] w-full  font-bold">or continue</p>
      <hr className="w-full border border-[#333333]"/>
    </div>
    <p>Not a member yet?&nbsp;
      <button
        onClick={() => dispatch(updatePopup({status:true,type:"select-role",message:""}))}
        className="text-[#EB5757] font-bold hover:text-[#EB7357]">Sign up</button>
    </p>
    {loading && <div className="popup-overlay">
      <div className="popup-container">
        <img className="h-[10vw]" src={loadingGif} alt="loading"/>
      </div>
    </div>}
  </div>);

};

export default Login;

