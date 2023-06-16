import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user=useSelector((state) => state.mazdoorStore.user);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};