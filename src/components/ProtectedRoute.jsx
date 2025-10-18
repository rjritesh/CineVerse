import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user); // get user from Redux

  if (!user) {
    // If user is not logged in, redirect to landing page
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the child component
  return children;
};

export default ProtectedRoute;
