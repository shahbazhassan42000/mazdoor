import { Link } from "react-router-dom"; 
import axios from "axios";
import { apiURL, projectsURL, headers } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { loadAllProjects, loadProjects } from "../../store/mazdoor/mazdoorSlice";
export const OrderMiniCard = ({ project, user,tab }) => {
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
            if (user.role === "ADMIN") dispatch(loadAllProjects());
            else dispatch(loadProjects(user._id));
        }).catch(err => {
            console.log(err);
        });
    };
    return (
        <section className="flex px-4 mb-2">
            <div className="text-sm font-semibold text-lightGray w-[160px]">
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
                        className={`text-sm text-lightBlack ${user?.role === "CUSTOMER" ? "hover:underline" : user?.role === "ADMIN" ? "hover:underline": "cursor-default"} truncate w-[70%]`}>
                        {user?.role === "LABOR" ? project?.customer?.name : project?.seller?.name}
                    </Link>
                </div>
            </div>
            {user?.role === "ADMIN" && 
                <div className="text-sm font-semibold text-lightGray  w-[160px]">
                    <div className="flex items-center gap-2">
                        <div className="flex justify-center items-center h-[45px] w-[45px]">
                            <img
                                className="object-cover w-full h-full rounded-[50%]"
                                title={project?.customer?.name}
                                src={project?.customer?.image} alt="user avatar"
                            />
                        </div>
                        <p
                            className={`text-sm text-lightBlack truncate w-[70%]`}>
                            {project?.customer?.name}
                        </p>
                    </div>
                </div>
            }
            <div className={`text-sm font-semibold text-lightGray w-[560px]  ${user?.role==="ADMIN" && "!w-[330px]"} }`}>
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
            <div className={`text-sm font-semibold text-lightGray w-[90px]  ${user?.role==="ADMIN" && "!w-[90px]"}`}>
                <div className="flex items-center h-[45px]">
                    {/* convert 2023-06-15T07:55:20.067Z to date and then add project.deliveryTime in it*/}
                    {new Date(new Date(project?.createdAt).getTime() + project?.deliveryTime * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
            </div>
            <div className={`text-sm font-semibold text-lightGray  w-[113px]  ${user?.role==="ADMIN" && "!w-[113px]"}`}>
                <div className="flex items-center h-[45px]">
                    {project?.price} pkr
                </div>
            </div>
            <div className={`text-sm font-semibold text-lightGray  w-[200px] ${user?.role==="ADMIN" && "!w-[270px]"}`}>
                <div className="flex gap-3 items-center h-[45px]">
                    <span className={`${project?.status==="ACTIVE" && "text-orange-500"} ${project?.status==="DELIVERED" && "text-yellow-500"} ${project?.status==="COMPLETED" && "text-green-500"} ${project?.status==="CANCELLED" && "text-red-500"} ${project?.status==="WITHDRAWN" && "text-sky-500"}`}>
                        {project?.status}
                    </span>
                    {
                        project?.status === "ACTIVE" && user?.role !== "CUSTOMER" &&
                        <button
                            onClick={updateProject("DELIVERED")}
                            className="text-xs text-white bg-yellow-500 hover:bg-yellow-700 p-2 rounded-sm">
                                Deliver
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role !== "CUSTOMER" &&
                        <button
                            onClick={updateProject("WITHDRAWN")}
                            className="text-xs text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-sm">
                                Withdraw
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role !== "LABOR" &&
                        <button
                            onClick={updateProject("ACTIVE")}
                            className="text-xs text-white bg-orange-500 hover:bg-orange-700 p-2 rounded-sm">
                                Accept
                        </button>
                    }
                    {
                        project?.status === "OFFERED" && user?.role !== "LABOR" &&
                        <button
                            onClick={updateProject("CANCELLED")}
                            className="text-xs text-white bg-red-500 hover:bg-red-700 p-2 rounded-sm">
                                Decline
                        </button>
                    }
                    {
                        project?.status === "DELIVERED" && user?.role !== "LABOR" &&
                        <button
                            onClick={updateProject("COMPLETED")}
                            className="text-xs text-white bg-green-500 hover:bg-green-700 p-2 rounded-sm">
                                Complete
                        </button>
                    }
                    {
                        project?.status ==="WITHDRAWN" && user?.role==="ADMIN" &&
                        <button
                                onClick={updateProject("OFFERED")}
                                className="text-xs text-white bg-gray-500 hover:bg-gray-700 p-2 rounded-sm">
                                    OFFERED
                            </button>
                    }
                    {
                        project?.status ==="CANCELLED" && user?.role==="ADMIN" &&
                        <button
                                onClick={updateProject("OFFERED")}
                                className="text-xs text-white bg-gray-500 hover:bg-gray-700 p-2 rounded-sm">
                                    OFFERED
                            </button>
                    }
                    {
                        project?.status === "ACTIVE" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("COMPLETED")}
                            className="text-xs text-white bg-green-500 hover:bg-green-700 p-2 rounded-sm">
                                Complete
                        </button>
                    }
                     {
                        project?.status === "DELIVERED" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("ACTIVE")}
                            className="text-xs text-white bg-orange-500 hover:bg-orange-700 p-2 rounded-sm">
                                Accept
                        </button>
                    }
                    {
                        project?.status === "COMPLETED" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("DELIVERED")}
                            className="text-xs text-white bg-yellow-500 hover:bg-yellow-700 p-2 rounded-sm">
                                Deliver
                        </button>
                    }
                     {
                        project?.status === "COMPLETED" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("ACTIVE")}
                            className="text-xs text-white bg-orange-500 hover:bg-orange-700 p-2 rounded-sm">
                                Accept
                        </button>
                    }
                     {
                        project?.status === "CANCELLED" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("WITHDRAWN")}
                            className="text-xs text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-sm">
                                Withdraw
                        </button>
                    }
                    {
                        project?.status === "WITHDRAWN" && user?.role === "ADMIN" &&
                        <button
                            onClick={updateProject("CANCELLED")}
                            className="text-xs text-white bg-red-500 hover:bg-red-700 p-2 rounded-sm">
                                Decline
                        </button>
                    }

                </div>
            </div>
        </section>
    );
}