import { useSelector } from "react-redux";
import { Navigate,useNavigate } from "react-router-dom";

// access: "any" | "ADMIN" | "LABOR" | "CUSTOMER" | "users" means either CUSTOMER or LABOR
export const ProtectedRoute = ({ children, access }) => {
  const user = useSelector((state) => state.mazdoorStore.user);
  const navigate = useNavigate();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  if (access !== "any") {
    if (access === "users") {
      if (user?.role === "ADMIN") {
        navigate(-1); // go back to the previous page
        return null;
      } else {
        return children;
      }
    }
    if (user?.role !== access) {
      // user is not authorized then redirect to where the request comes
      navigate(-1); // go back to the previous page
      return null;
    }
  }
  return children;
};