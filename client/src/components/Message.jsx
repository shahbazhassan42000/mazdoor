import { useDispatch, useSelector } from "react-redux";
import { updatePopup } from "../store/mazdoor/mazdoorSlice";

export const Message = () => {
  const popup = useSelector(state => state.mazdoorStore.popup);
  const dispatch = useDispatch();
  return (
    <div
      className="popup-container text-[#333333] flex flex-col items-center justify-center gap-10 bg-white px-16 py-10 w-[35vw] rounded-xl border-4 border-[#EB5757] hover:border-[#EB7357] relative">
      {popup.message.type!=="incomplete-profile" && <i
        onClick={() => dispatch(updatePopup({ status: false, type: "message", message: {} }))}
        className="fa fa-close absolute top-2 right-2 rounded-sm bg-[#EB5757] text-white px-2 py-1 hover:bg-[#F2C94C] hover:text-[#333333] cursor-pointer">
      </i>}
      <h1 className="text-2xl text-[#EB5757] font-bold">{popup.message.title}</h1>
      <p>{popup.message.msg}</p>
      {/*  link to email */}
      {popup.message.type==="email-verification" && <a
        onClick={() => dispatch(updatePopup({ status: false, type: "message", message: {} }))}
        className="primary-btn" href="mailto:" >Mailbox</a>}
    </div>
  );
};