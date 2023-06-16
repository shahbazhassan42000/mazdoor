import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../../assets/gifs/loading.gif";
import { useState , useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { map } from "lodash";
import { ConversationCard } from "./ConversationCard";
import inbox_holder from "../../assets/svgs/inbox-holder.svg"
import axios from "axios";
import { apiURL, headers , getMessagesURL, sendMessageURL} from "../../utils/constants";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { MessageCard } from "./MessageCard";
import { loadConversations , updatePopup} from "../../store/mazdoor/mazdoorSlice";


export const Inbox = () => {
    const { pathname } = useLocation()
    const { id } = useParams();
    const user = useSelector((state) => state.mazdoorStore.user);
    const conversations = useSelector((state) => state.mazdoorStore.conversations);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState(null);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch(null);
    const onMsgSend = () => {
        //send message to labor
        const message = {
            sender: user?._id,
            receiver: conversation?.receiver?._id,
            message: msg,
            conversation:conversation?._id
        }
        //send message to labor
        axios.request({
            baseURL: apiURL,
            url: sendMessageURL,
            method: "post",
            headers,
            data: {message}
        }).then(res => { 
            dispatch(loadConversations(user?._id));
            setMsg("");
        }).catch(err => { 
            console.log(err);
            NotificationManager.error("While sending message, Please try again later", "ERROR!", 5000);
        })
    }

    useEffect(() => {
        if (conversations && user) setLoading1(false);
    }, [conversations, user])
    
    useEffect(() => {
        if (!id) setLoading2(false);
        else {
            //if conversation is null then set it
            if (id &&  conversations) {
                setConversation(conversations.find(conversation => conversation?.receiver?.username === id));
            }
        }
    }, [id, conversations]);


    useEffect(() => {
        if (conversation) {
             setLoading2(true);
            axios.request({
                baseURL: apiURL,
                url: `${getMessagesURL}${conversation?._id}`,
                method: "get",
                headers,
            }).then(res => {
                setMessages(res.data);
            }
            ).catch(err => {
                console.log(err);
                NotificationManager.error("While getting messages, Please try again later", "ERROR!", 5000);
            }).finally(() => {
                setLoading2(false);
            });
        }
        }, [conversation]);

    return (
        <section className={`flex flex-col bg-lightBg2 h-[88vh] ${pathname.split("/")[1]==="inbox" && "px-20 py-5"}`}>
            <div className="flex border h-full bg-white rounded-sm">
                {/* All Conversations */}
                <div className="w-[300px] flex flex-col border-r relative">
                    <header className="text-lightGray font-medium text-lg border-b px-3 py-5 sticky top-0 bg-white z-10">
                        All Conversations
                    </header>
                    {/* Conversations */}
                    {conversations && map(conversations, (conversation) => {
                        return <ConversationCard key={conversation._id} conversation={conversation} lastMe={conversation?.lastMessage?.sender === user?._id} offerSender={conversation?.lastMessage?.sender === user?._id ? user?.username: conversation?.receiver?.username} setConversation={setConversation} id={id} />
                    })}
                    {loading1 && <div className="popup-overlay !absolute">
                        <div className="popup-container !absolute">
                            <img className="h-[10vw]" src={loadingGif} alt="loading" />
                        </div>
                    </div>}
                </div>
                {/* Chat Window */}
                <div className="flex-1 relative">
                    {!id && 
                        <div className="flex flex-col justify-center items-center gap-5 py-28">
                            <div className="h-[215px]">
                                <img className="w-full object-cover h-full" src={inbox_holder} alt="inbox holder" />
                            </div>
                            <h1 className="text-2xl font-bold text-midBlack">
                                Pick up where you left off
                            </h1>
                            <p className="text-lightGray text-lg -mt-2">
                                Select a conversation and chat away.
                            </p>
                        </div>
                    }
                    {id && conversation && 
                        <div className="flex flex-col flex-1  h-full relative">
                            {/* Header */}
                            <header className="flex items-center gap-2 border-b px-5 py-5 sticky top-0 bg-white z-10 w-[887px]">
                                <span className="w-[10px] h-[10px] rounded-full bg-customGray"></span>
                                <Link
                                     to={`/labor/${conversation?.receiver?._id}`}
                                    className="text-lg font-bold underline cursor-pointer">
                                    {conversation?.receiver?.name}
                                </Link>
                                <h2 className="truncate text-lightGray font-medium">@{conversation?.receiver?.username}</h2>
                            </header>
                            {/* Main */}
                            <main className="overflow-y-auto flex-1 pt-5 px-1">
                                <div className="flex flex-col text-lightGray">
                                    <div className="flex items-center w-full gap-2 px-2">
                                        <span className="flex-1 mb-[1px] h-[1px] bg-lightGray"></span>
                                        <h3 className="text-bold">We have your back</h3>
                                         <span className="flex-1 mb-[1px] bg-lightGray h-[1px]"></span>
                                    </div>
                                    <p className="text-sm text-center">For added safety, remember to keep all payments and communication within the platform</p>
                                    {/* Messages */}
                                    
                                    <div className="flex flex-col">
                                    {messages && map(messages, (message) => {
                                        return <MessageCard key={message?._id} message={message} me={message?.sender?._id===user?._id} />
                                    })}
                                    </div>
                                    
                                </div>

                            </main>
                            {/* Footer */}
                            <footer className="sticky bottom-0 flex flex-col border-t gap-5 p-5 bg-white">
                                <textarea
                                    onChange={(e) => setMsg(e.target.value)}
                                    value={msg}
                                    maxLength={2500}
                                    spellCheck={true}
                                    className="p-[20px] border outline-none block min-h-[20px] max-h-[120px] text-[16px] text-darkBlack resize-none" />
                                <div className="flex justify-between">
                                    <button
                                        disabled={user?.role==="CUSTOMER"}
                                        onClick={() => {
                                            dispatch(updatePopup(
                                                {
                                                    status: true,
                                                    type: "offer",
                                                    message: {
                                                        conversation
                                                    }
                                                }))
                                        }}
                                        title="Create and send your customer a unique offer based on their specific requests."
                                        className="primary-btn  !text-[14px] !font-bold">
                                        Create an Offer
                                    </button>
                                    {msg?.length>=2500 ?
                                        <span className="text-lightGray text-[16px]">{msg?.length}/2500</span>
                                        :
                                        <button
                                            onClick={(e)=>onMsgSend(e)}
                                            disabled={msg?.length < 1}
                                            className="flex gap-1 items-center primary-btn">
                                            {/*  icon*/}
                                            <SendIcon className="-rotate-45" fontSize="small" />
                                            {/*  text*/}
                                            <span className="text-white text-[14px] font-bold">Send Message</span>
                                        </button>
                                    }
                                </div>
                            </footer>
                        </div>
                    }
                    {loading2 && <div className="popup-overlay !absolute">
                        <div className="popup-container !absolute">
                            <img className="h-[10vw]" src={loadingGif} alt="loading" />
                        </div>
                    </div>}
                </div>
            </div>
        </section>
    );
};