import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { apiURL,headers, updateUserURL } from "../../utils/constants";
import axios from "axios";
import { loadAllUsers } from "../../store/mazdoor/mazdoorSlice";
import { useState } from "react";
import loadingPlainGif from "../../assets/gifs/loading_plain.gif"

export const UserMiniCard = ({ user,tab }) => {
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const onStatusUpdate = (status, user) => {
        setLoading(true);
        // update user status
        axios.request({
            baseURL: apiURL,
            url: `${updateUserURL}`,
            method: "put",
            headers,
            data: {
                user: { 
                    _id: user._id,
                    status
            } }
        }).then(res => {
            dispatch(loadAllUsers());
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    };
    return (
        <section className="flex gap-1 px-5 text-lightBlack relative">
            {/* User Name and Avatar */}
            <div className="text-sm font-semibold w-[160px]">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center h-[45px] w-[45px]">
                        <img
                            className="object-cover w-full h-full rounded-[50%]"
                            title={user?.name}
                            src={user?.image} alt="user avatar"
                        />
                    </div>
                    <Link
                        to={tab==="LABORS" ?`/labor/${user?._id}`:''}
                        className={`text-sm text-lightBlack ${tab==="LABORS" ? "hover:underline" : "cursor-default"} truncate w-[70%]`}>
                        {user?.name}
                    </Link>
                </div>
            </div>
            {/* Username */}
            <div className="text-sm font-semibold w-[160px]">
                <div className="flex items-center h-[45px]">
                    <Link
                        title={user?.username}
                        to={tab==="LABORS" ?`/labor/${user?._id}`:''}
                        className={`text-sm text-lightBlack ${tab==="LABORS" ? "hover:underline" : "cursor-default"} truncate w-full`}>
                        {user?.username}
                    </Link>
                </div>
            </div>
            {/* CNIC */}
            <div className="text-sm font-semibold w-[160px]">
                <div className="flex items-center h-[45px]">
                    <p className="w-full truncate" title={user?.CNIC}>{user?.CNIC ? user?.CNIC : "NILL"}</p>
                </div>
            </div>
            {/* Email */}
            <div className="text-sm font-semibold w-[160px]">
                <div className="flex items-center h-[45px]">
                    <p className="w-full truncate" title={user?.email}>{user?.email}</p>
                </div>
            </div>
            {/* Phone */}
            <div className="text-sm font-semibold w-[160px]">
                <div className="flex items-center h-[45px]">
                    <p className="w-full truncate" title={user?.phone}>{user?.phone}</p>
                </div>
            </div>
            {/* Gigs */}
            {user?.role === "LABOR" &&
                <div className="text-sm font-semibold w-[100px]">
                    <div className="flex items-center h-[45px]">
                    <p >{user?.gigs?.length}</p>
                    </div>
                </div>
            }
            {/* Projects */}
            <div className="text-sm font-semibold w-[100px]">
                 <div className="flex items-center h-[45px]">
                    <p >{user?.projects?.length}</p>
                </div>
            </div>
            {/* Status */}
            <div className="text-sm font-semibold">
                <div className="flex items-center h-[45px]">
                    <select className={`w-full bg-transparent  text-${user?.status==="verified" ? "green-500" : user?.status==="unverified" ? "yellow-500":user?.status==="blocked" ? "red-500": "text-lightBlack"}`} value={user?.status} onChange={(e) => onStatusUpdate(e.target.value,user)}>
                        <option className="text-lightBlack" value="verified">VERIFIED</option>
                        <option className="text-lightBlack" value="unverified">UNVERIFIED</option>
                        <option className="text-lightBlack" value="blocked">BLOCKED</option>
                    </select>
                </div>
            </div>
            {loading && <div className="popup-overlay !absolute">
                    <div className="popup-container !absolute">
                        <img className="h-[10vw]" src={loadingPlainGif} alt="loading" />
                    </div>
                </div>
            }
        </section >
    );
};