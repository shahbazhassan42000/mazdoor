import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { apiURL, signupURL } from "../../../utils/constants";
import { updatePopup } from "../../../store/mazdoor/mazdoorSlice";
import loadingGif from "../../../assets/gifs/loading.gif";


const Signup = () => {
  const [msg, setMsg] = useState({ msg: "", type: "error" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const popup = useSelector((state) => state.mazdoorStore.popup);
  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const formObject = Object.fromEntries(new FormData(e.target));
    const { username, password } = formObject;
    if (!username) {
      setMsg({ msg: "Please enter username", type: "error-u" });
      setLoading(false);
      return;
    }
    if (!password) {
      setMsg({ msg: "Please enter password", type: "error-p" });
      setLoading(false);
      return;
    }
    //adding email and role to formObject
    formObject.email = popup.message.email;
    formObject.role = popup.message.role;

    axios.request({
      baseURL: apiURL,
      url: signupURL,
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: { user: formObject }
    }).then((res) => {
      setMsg({ msg: "", type: "success" });
      dispatch(updatePopup({
        status: true, type: "message",
        message: {
          msg: "An Email has been sent to your email address. Please verify your email address to complete the signup process.",
          title: "Email Verification",
          type: "email-verification"
        }
      }));
    }).catch((err) => {
      console.log(err);
      if (err.response && err.response.data && err.response.data.type) {
        if (err.response.data.type === "username") setMsg({ msg: "Username already taken", type: "error-u" });
        else if (err.response.data.type === "password") setMsg({ msg: err.response.data.msg, type: "error-p" });
      } else {
        setMsg({
          msg: "Did your internet connection fail? If it's not you, it's us. Please try again later.",
          type: "error-p"
        });
      }
    }).finally(() => {
      console.clear();
      setLoading(false);
    });
  };

  return (<div
    className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
    <i
      onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
      className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
    </i>
    <h1 className="text-2xl text-[#EB5757] font-bold">Join MAZDOOR</h1>
    <form
      onSubmit={(e) => handleSignup(e)}
      className="flex flex-col items-center justify-center gap-10 w-full">
      <input
        onChange={(e) => setMsg({ msg: "", type: "error" })}
        name="username" className="inp w-full" placeholder="Username" minLength="5" type="text" required />
      {/*Error message*/}
      {msg.type === "error-u" &&
        <p className={`-mt-10 -mb-6 text-center ${msg.type === "success" ? "green" : "red"}`}>{msg.msg}</p>
      }
      <div className="relative flex flex-col w-full">
        <input
          onChange={(e) => setMsg({ msg: "", type: "error" })}
          name="password" className="inp w-full" placeholder="Password" minLength="8" type="password" required />
        <span onClick={(e) => togglePasswd(e)}
              className="text-[#5E6C84] absolute top-3 right-2 cursor-pointer fa-solid fa-eye-slash"></span>
        {/*Error message*/}
        {msg.type === "error-p" &&
          <p className={`-mb-6 text-center ${msg.type === "success" ? "green" : "red"}`}>{msg.msg}</p>
        }
      </div>

      <button className="primary-btn w-full">Join
      </button>
    </form>
    <div className="flex gap-10 w-full">
      <p className="text-gray-500 text-center -my-8">
        By signing up, you acknowledge and agree to the terms and conditions of Mazdoor.
      </p>
    </div>
    <p>Already a Member?&nbsp;
      <button
        onClick={() => dispatch(updatePopup({ status: true, type: "login", message: "" }))}
        className="text-[#EB5757] font-bold hover:text-[#EB7357]">Login
      </button>
    </p>
    {loading && <div className="popup-overlay">
      <div className="popup-container">
        <img className="h-[10vw]" src={loadingGif} alt="loading" />
      </div>
    </div>}
  </div>);

};

export default Signup;

export const togglePasswd = (e) => {
  const btn = e.target;
  const passwd = e.target.previousSibling;
  if (passwd.type === "password") {
    passwd.type = "text";
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  } else {
    passwd.type = "password";
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  }
};

