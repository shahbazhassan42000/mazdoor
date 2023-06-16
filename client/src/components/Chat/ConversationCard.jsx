import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom"; 
import { useLocation } from "react-router";


export const ConversationCard = ({ conversation, lastMe, setConversation, id, offerSender}) => {
    const { pathname } = useLocation();
    return (
        <Link
            onClick={() => setConversation(conversation)}
            to={`/${pathname.split("/")[1] === "dashboard" ? "dashboard/inbox" : pathname.split("/")[1]}/${conversation?.receiver?.username}`}
            className={`flex gap-4 px-3 py-3 border-b max-w-[300px] cursor-pointer select-none hover:bg-lightBg2 ${id===conversation?.receiver?.username && "bg-lightBg2"}`}>
            {/* Conversation image */}
            <Badge
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                sx={{ '& .MuiBadge-badge': { border: "2px solid white", backgroundColor: "gray" }}}
                overlap="circular" badgeContent=" ">
                <div className="w-[50px] h-[50px] rounded-[50%]">
                    <img
                    className="object-cover w-full h-full rounded-[50%]"
                    title={conversation?.receiver?.name}
                    src={conversation?.receiver?.image} alt="conversation avatar" />
                </div>
            </Badge>
            {/* Conversation name and last message */}
            <div className="flex flex-col gap-1 max-w-[210px]">
                <h1 className="text-darkBlack font-semibold truncate w-full">{conversation?.receiver?.name}</h1>
                <h1 className="text-lightGray text-sm !truncate">{lastMe && "Me: "}{conversation?.lastMessage?.message.match(/^___&&&___\$\$\$___[a-zA-Z0-9]{24}_$/)? `${offerSender} just sent you a new Custom Offer.`:conversation?.lastMessage?.message}</h1>
            </div>
        </Link>
    );
};