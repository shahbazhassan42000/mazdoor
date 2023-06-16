import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL, signupURL } from "../../utils/constants";
import email_verified from "../../assets/gifs/email-verified.gif"
import invalid_link from "../../assets/gifs/invalid-link.gif"
import loading_gif from "../../assets/gifs/loading.gif"

export const EmailVerify = () => {
  const [status, setStatus] = useState("loading");
  const params = useParams();
  useEffect(() => {
    const URL=`users/verification/${params.id}/verify/${params.token}`;
    axios.request({
      baseURL: apiURL,
      url: URL,
      method:'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res=>{
      setStatus("verified");
    }).catch(err=>{
      setStatus("invalid");
    }).finally(()=>{
      console.clear();
    });
  }, []);

  return (
    <div className={`${status==="invalid"? 'bg-white': 'bg-[#E7E5E7]'} flex flex-col justify-center items-center`}>
      <img src={status==="verified"?email_verified:status==="loading"?loading_gif:invalid_link}  alt={status==="verified"?"Email verified":status==="loading"?"Loading":"Invalid link"}/>
      {status==="invalid" && <h1 className="text-[#F2553E] font-bold text-4xl">Invalid Link</h1>}
    </div>
  );
};