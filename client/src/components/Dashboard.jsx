const Dashboard = () => {
  return (
    <div className="flex gap-2 text-[#333]">
      {/*  Side Nav */}
      <nav className="flex flex-col items-center bg-[#E0E0E0] py-5 rounded-sm">
        <ul className="flex flex-col justify-between h-full">
        <div>
          {/* item */}
          <div className="flex gap-3 actNav px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757] items-center cursor-pointer justify-start clicked-shadow-hover">
            <i className="fa fa-table-columns"></i>
            <li className="font-bold">Dashboard</li>
          </div>
          {/* item */}
          <div className="flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover">
            <i className="fa fa-inbox"></i>
            <li className="font-bold">Inbox</li>
          </div>
          {/* item */}
          <div className="flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover">
            <i className="fa fa-bars-progress"></i>
            <li className="font-bold">Orders</li>
          </div>
          {/* item */}
          <div className="flex gap-3 px-5 py-2 mb-3 text-[18px] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover">
            <i className="fa-regular fa-user"></i>
            <li className="font-bold">Profile</li>
          </div>
        </div>
          {/* item */}
          <div className="flex gap-3 px-5 py-2 mb-3 text-[18px] text-[#A4A1A1] hover:text-[#EB5757]  items-center cursor-pointer justify-start clicked-shadow-hover">
            <i className="fa fa-right-from-bracket rotate-180"></i>
            <li className="font-bold">Log out</li>
          </div>

        </ul>
      </nav>
      <div className="flex flex-col flex-1">
        {/*  Top */}
        <div className="flex justify-between w-full">
          <div>Active Orders - 0($0)</div>
          <div>Active Orders</div>
        </div>

        {/*  Main */}
      </div>
    </div>
  );
};

export default Dashboard;