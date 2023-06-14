import { useDispatch, useSelector } from "react-redux";
import { loadConversations, updatePopup } from "../store/mazdoor/mazdoorSlice";
import Badge from "@mui/material/Badge";
import React, { useState,useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import msg_sent from "../assets/svgs/msg-sent.svg"
import loadingGif from "../assets/gifs/loading.gif";
import axios from "axios";
import { apiURL, headers, sendMessageURL } from "../utils/constants";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

export const ContactLabor = () => {
  const [msg, setMsg] = useState("");
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.mazdoorStore.popup);
  const user = useSelector((state) => state.mazdoorStore.user);
  const [loading, setLoading] = useState(false);

  const [fragment, setFragment] = useState(true);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  const onMsgSend = (e) => {
    e.preventDefault();
    //send message to labor
    const message = {
      sender: user?._id,
      receiver: popup?.message?._id,
      message: msg
    }

    setLoading(true);
    //send message to labor
    axios.request({
      baseURL: apiURL,
      url: sendMessageURL,
      method: "post",
      headers,
      data: {message}
    }).then(res => { 
      dispatch(loadConversations(user?._id));
      setFragment(false);
    }).catch(err => { 
      console.log(err);
      NotificationManager.error("While sending message, Please try again later", "ERROR!", 5000);
    }).finally(() => { 
      setLoading(false);
    });
  }

  return (
    <section
      className="popup-container text-[#333333] flex flex-col justify-center bg-white w-[544px] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
      <i
        onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
        className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
      </i>
      {fragment ?
        <div className="flex flex-col justify-center">
          {/*Header*/}
          <div
            className="items-center flex gap-5 p-[24px]">
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              sx={{ "& .MuiBadge-badge": { border: "2px solid white", backgroundColor: "gray" } }}
              overlap="circular" badgeContent=" ">
              <div className="w-[50px] h-[50px] rounded-[50%]">
                <img
                  className="object-cover w-full h-full rounded-[50%]"
                  title={popup?.message?.title}
                  src={popup?.message?.image} alt="labor avatar" />
              </div>
            </Badge>
            <div className="flex flex-col gap-1">
              <h1
                className="text-darkBlack font-bold text-[18px] w-full truncate">Message {popup?.message?.username}</h1>
              <div className="flex justify-between w-[230px] text-lightBlack text-[14px] items-center">
                {/*    Labor Status*/}
                <span>Away</span>
                <span className="h-[3px] w-[3px] bg-lightBlack"></span>
                <span>Avg. response time: <span className="font-bold">1 Hour</span></span>
              </div>
            </div>
          </div>
          <hr className={`w-full bg-${focus ? "lightBlack" : "border"}`} />
          {/*Text Area for message*/
          }
          <textarea
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            maxLength={2500}
            spellCheck={true}
            placeholder={`Ask ${popup?.message?.username} a question or share your project details (requirements, timeline, budget, etc.)`}
            className="p-[20px] placeholder-midBlack outline-none min-h-[230px] text-[16px] text-darkBlack resize-none" />
          {/*  Textarea count*/}
          <div className="flex w-full justify-end p-[8px_24px_12px_24px]">
            <span className="text-lightGray text-[16px]">{msg?.length}/2500</span>
          </div>
          {/*  Send button*/}
          <div className="p-[12px_24px_24px_24px] flex w-full justify-end">
            <button
              onClick={(e)=>onMsgSend(e)}
              disabled={msg?.length < 1}
              className="flex gap-1 items-center primary-btn">
              {/*  icon*/}
              <SendIcon className="-rotate-45" fontSize="small" />
              {/*  text*/}
              <span className="text-white text-[14px] font-bold">Send Message</span>
            </button>
          </div>
        </div>
        :
        <div className="flex p-[24px] flex-col items-center justify-center w-full">
          <div className="p-[100px]">
            <div className="">
                <img src={msg_sent} alt="message sent" className="object-cover w-full h-full" />
                <h2 className="text-lg text-darkBlack font-bold">Message Sent!</h2>
            </div>
          </div>
          <button
            onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
            className="primary-btn !py-[8px] w-full mb-3">Got it</button>
          <Link 
            onClick={() => dispatch(updatePopup({ status: false, type: popup.type, message: popup.message }))}
            to={`/inbox/${popup?.message?.username}`}
            className="secondary-btn text-center !py-[8px] w-full">View Message</Link>
        </div>
      }
      {loading && <div className="popup-overlay !absolute">
            <div className="popup-container !absolute">
              <img className="h-[10vw]" src={loadingGif} alt="loading" />
            </div>
          </div>}
    </section>
  )
    ;
};