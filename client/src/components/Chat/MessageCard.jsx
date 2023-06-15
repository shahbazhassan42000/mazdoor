import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom"; 
import { useEffect, useState } from 'react';
import axios from "axios";
import { apiURL, projectsURL, headers } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "../../store/mazdoor/mazdoorSlice";

const mappedStatus = (status)=> {
        switch(status){
            case "OFFERED": return "Offered";
            case "ACTIVE": return "Offer Accepted";
            case "CANCELLED": return "Offer Not Accepted";
            case "WITHDRAWN": return "Offer Withdrawn";
            case "COMPLETED": return "Offer Completed";
            default: return "Offered";
        }
    }

export const MessageCard = ({ message, me }) => {
    const [project, setProject] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.mazdoorStore.user);
    useEffect(() => {
        if (message) {
            // ^___&&&___\$\$\$___[a-zA-Z0-9]{24}_$ matches this regex
            if(message?.message.match(/^___&&&___\$\$\$___[a-zA-Z0-9]{24}_$/)){
                const id = message?.message.split("___&&&___$$$___")[1].split("_")[0];
                message.message = `Here's your Custom Offer`;
                //get project by ID
                axios.request({
                    baseURL: apiURL,
                    url: `${projectsURL}/${id}`,
                    method: "get",
                    headers
                }).then(res => {
                    setProject(res?.data);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }, [message]);
    const onProjectUpdate = (projectStatus) => {
        //update project status to withdrawn
        axios.request({
            baseURL: apiURL,
            url: `${projectsURL}/${project?._id}`,
            method: "put",
            headers,
            data: { project: { status: projectStatus } }
        }).then(res => {
            setProject(res?.data);
            dispatch(loadProjects(user?._id));
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div
            className={`flex gap-4 px-3 py-3 hover:bg-lightBg2`}>
            {/* Conversation image */}
            <div>
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
            </div>
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
                <h1 className={`${project && "italic"} text-lightGray text-sm`}>{message?.message}</h1>
                {project &&
                    // Project Card
                    <section className="flex flex-col rounded-sm border w-[500px] bg-white">
                        {/* Gig tile and project price */}
                        <header className="p-4 flex justify-between border-b bg-bg">
                            {/* Gig title */}
                            <Link
                                to={`/gig/${project?.gig?._id}`}
                                className="text-darkBlack font-medium hover:underline hover:text-lightGray truncate max-w-[400px]">{project?.gig?.title}
                            </Link>
                            {/* Project price */}
                            <h1 className="text-darkBlack font-medium">{project?.price}pkr</h1>
                        </header>
                        <main className="flex flex-col p-4">
                            {/* Project description */}
                            <h1 className="text-lightGray text-sm border-b h-[65px] line-clamp-3">{project?.description}</h1>
                            {/* Offer terms */}
                            <div className="border-b flex flex-col gap-2 py-2">
                                <h1 className="text-lightBlack font-medium">Your offer includes</h1>
                                <div className="flex gap-2 items-center">
                                    <span className="fa-sharp fa-regular fa-clock"></span>
                                    <p>{`${project?.deliveryTime} Day${project?.deliveryTime>1 ? "s ": " "}Delivery`}</p>
                                </div>
                            </div>
                            {/* Withdraw, Accepted, Decline button */}
                            {me ? <div className="flex justify-between pt-4">
                                <button></button>
                                <button
                                    disabled={project?.status !=="OFFERED"}
                                    onClick={() => onProjectUpdate("WITHDRAWN")}
                                    className="bg-lightBg hover:bg-lightBg3 disabled:bg-bg disabled:cursor-default text-lightGray font-semibold py-2 px-4 rounded-sm">
                                    {project?.status === "OFFERED" ? "Withdraw Offer" : mappedStatus(project?.status) }
                                </button>
                                
                            </div>
                                :
                                <div className="flex justify-between pt-4">
                                    {project?.status === "OFFERED" ?
                                         <button
                                            disabled={project?.status !=="OFFERED"}
                                            onClick={() => onProjectUpdate("CANCELLED")}
                                            className="bg-lightBg hover:bg-lightBg3 disabled:bg-bg disabled:cursor-default text-lightGray font-semibold py-2 px-4 rounded-sm">
                                            {project?.status === "OFFERED" ? "Decline Offer" : mappedStatus(project?.status)}
                                        </button>
                                        :
                                        <div></div>
                                    }
                                    <button
                                        disabled={project?.status !=="OFFERED"}
                                        onClick={() => onProjectUpdate("ACTIVE")}
                                        className="bg-lightBg hover:bg-lightBg3 disabled:bg-bg disabled:cursor-default  text-lightGray font-semibold py-2 px-4 rounded-sm">
                                        {project?.status === "OFFERED" ? "Accept Offer" : mappedStatus(project?.status)}
                                    </button>
                                
                            </div>
                            }

                        </main>
                    </section>
                }
            </div>
        </div>
    );
};