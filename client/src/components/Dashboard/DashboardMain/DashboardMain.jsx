import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GigCarousal } from "../../Gig/GigCarousal";


export const DashboardMain = () => {
  const user = useSelector((state) => state.mazdoorStore.user);
  return (
    <section className="relative flex flex-col">
      {/*User Gigs*/}
      {user?.role==="LABOR" && <div className="w-full my-10">
        {user?.gigs?.length > 0 && <GigCarousal gigs={user?.gigs} count={4} /> }
      </div>
      }
      {/*Create Gig button*/}
      {user?.role === "LABOR" &&
        <div className="flex justify-end">
          <Link
            to="/dashboard/dashboard/create-gig"
            className="primary-btn">
            Create New Gig
          </Link>
        </div>
      }
      {user?.role === "CUSTOMER" &&
        <div className="flex gap-5 justify-center items-center">
            <Link
                to="/gigs"
                className="primary-btn"
              >
            View Gigs
          </Link>
        </div>
      }
    </section>
  );
};