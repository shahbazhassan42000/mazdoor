import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom"; 
export const MessageCard = ({ message, me }) => {
    return (
        <div
            className={`flex gap-4 px-3 py-3 hover:bg-lightBg2`}>
            {/* Conversation image */}
            <Badge
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                sx={{ '& .MuiBadge-badge': { border: "2px solid white", backgroundColor: "gray" } }}
                overlap="circular" badgeContent=" ">
                <div className="w-[50px] h-[50px] rounded-[50%]">
                    <img
                        className="object-cover w-full h-full rounded-[50%]"
                        title={message?.sender?.name}
                        src={message?.sender?.image} alt="conversation avatar" />
                </div>
            </Badge>
            {/* Conversation name and last message */}
            <div className="flex flex-col gap-1">
                {me ?
                    <h1
                        className="text-darkBlack font-semibold w-full">
                        Me
                    </h1>
                    :
                    <Link
                        to={`/labor/${message?.receiver?._id}`}
                         className="text-darkBlack cursor-pointer font-semibold w-full">
                        {message?.receiver?.name}
                    </Link>
                }
                <h1 className="text-lightGray text-sm">{message?.message}</h1>
            </div>
        </div>
    );
};