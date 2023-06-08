import { useState } from "react";
import { Link } from "react-router-dom";

export const DashboardMain = ({user}) => {
  const [createGigBtn, setCreateGigBtn] = useState(false);
  console.log("render");
  return (
      <section className="relative">
        {/*Create Gig button*/}
        <div className="flex justify-end">
          <Link
            to="/dashboard/dashboard/create-gig"
            className="primary-btn">
            Create New Gig
          </Link>
        </div>
      </section>
  );
};