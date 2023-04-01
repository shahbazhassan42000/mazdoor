import { useSelector } from "react-redux";

export const useAuth=(nextState, replace)=>{
  const user=useSelector((state) => state.mazdoorStore.user);
  if(!user){
    replace({
      pathname: "/",
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

