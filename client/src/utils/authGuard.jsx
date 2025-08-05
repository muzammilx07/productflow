import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("firebaseToken");
  const isPublic = location.pathname === "/" || location.pathname === "/login";

  // If not logged in and trying to access protected page, redirect to login
  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (token && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthGuard;
