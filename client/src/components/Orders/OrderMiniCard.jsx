import { Link } from "react-router-dom"; 
import axios from "axios";
import { apiURL, projectsURL, headers } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { loadProjects } from "../../store/mazdoor/mazdoorSlice";
export const OrderMiniCard = ({ project, user }) => {
    const dispatch = useDispatch();
    const updateProject = (projectStatus) => () => {
        //update project status to withdrawn
        axios.request({
            baseURL: apiURL,
            url: `${projectsURL}/${project?._id}`,
            method: "put",
            headers,
            data: { project: { status: projectStatus } }
        }).then(res => {
            dispatch(loadProjects(user?._id));
        }).catch(err => {
            console.log(err);
        });
    };
    return (
        <section className="flex px-4 mb-2">
            <div className="text-sm font-semibold text-lightGray w-[15%]">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center h-[45px] w-[45px]">
                        <img
                            className="object-cover w-full h-full rounded-[50%]"
                            title={user?.role==="LABOR"?project?.customer?.name:project?.seller?.name}
                            src={user?.role === "LABOR" ? project?.customer?.image : project?.seller?.image} alt="user avatar"
                        />
                    </div>
                    <Link
                        to={user?.role === "LABOR" ? `` : `/labor/${project?.seller?._id}`}
                        className={`text-sm text-lightBlack ${user?.role === "CUSTOMER" ? "hover:underline" : "cursor-default"} truncate w-[70%]`}>
                        {user?.role === "LABOR" ? project?.customer?.name : project?.seller?.name}
                    </Link>
                </div>
            </div>
            <div className="text-sm font-semibold text-lightGray w-[40%]">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center h-[45px] w-[80px]">
                        <img
                            className="object-cover w-full h-full rounded-sm"
                            title={project?.gig?.title}
                            src={project?.gig?.image} alt="user avatar"
                        />
                    </div>
                    <Link
                        to={`/gig/${project?.gig?._id}&${project?.gig?.user}`}
                        className="text-sm text-lightBlack hover:underline truncate w-[70%]">
                        {project?.gig?.title}
                    </Link>
                </div>
            </div>
            <div className="text-sm font-semibold text-lightGray w-[15%]">
                <div className="flex items-center h-[45px]">
                    {/* convert 2023-06-15T07:55:20.067Z to date and then add project.deliveryTime in it*/}
                    {new Date(new Date(project?.createdAt).getTime() + project?.deliveryTime * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
            </div>
            <div className="text-sm font-semibold text-lightGray w-[10%]">
                <div className="flex items-center h-[45px]">
                    {project?.price} pkr
                </div>
            </div>
            <div className="text-sm font-semibold text-lightGray w-[20%]">
                <div className="flex gap-5 items-center h-[45px]">
                    <span className={`${project?.status==="ACTIVE" && "text-orange-500"} ${project?.status==="DELIVERED" && "text-yellow-500"} ${project?.status==="COMPLETED" && "text-green-500"} ${project?.status==="CANCELLED" && "text-red-500"} ${project?.status==="WITHDRAWN" && "text-sky-500"}`}>
                        {project?.status}
                    </span>
                    {
                        project?.status === "ACTIVE" && user?.role === "LABOR" &&
                        <button
                            onClick={updateProject("DELIVERED")}
                            className="text-xs text-white bg-yellow-500 hover:bg-yellow-700 p-2 rounded-sm">
                                Deliver
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role === "LABOR" &&
                        <button
                            onClick={updateProject("WITHDRAWN")}
                            className="text-xs text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-sm">
                                Withdraw
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role === "CUSTOMER" &&
                        <button
                            onClick={updateProject("ACTIVE")}
                            className="text-xs text-white bg-orange-500 hover:bg-orange-700 p-2 rounded-sm">
                                Accept
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role === "CUSTOMER" &&
                        <button
                            onClick={updateProject("CANCELLED")}
                            className="text-xs text-white bg-red-500 hover:bg-red-700 p-2 rounded-sm">
                                Decline
                        </button>
                    }
                    {
                        project?.status === "DELIVERED" && user?.role === "CUSTOMER" &&
                        <button
                            onClick={updateProject("COMPLETED")}
                            className="text-xs text-white bg-green-500 hover:bg-green-700 p-2 rounded-sm">
                                Complete
                        </button>
                    }
                    
                </div>
            </div>
        </section>
    );
}