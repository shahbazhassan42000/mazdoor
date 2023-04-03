const Notification = () => {
  return(
    <i title="Notifications" className="msg not-italic text-[24px] fa-regular fa-bell hover:text-[#EB5757] cursor-pointer relative">
      <span className="absolute msg-count top-[-5px] right-[-6px] bg-[#EB5757] text-[6px] font-bold text-white rounded-full w-[15px] h-[15px] flex items-center justify-center">9</span>
    </i>
  );
};
export default Notification;