import { useSelector } from "react-redux";
import Landing from "./Landing/Landing";
import Home from "./Home/Home";

export const HomePageRender = () => {
  const user=useSelector((state) => state.mazdoorStore.user);
  return(user?<Home/>:<Landing/>)
}