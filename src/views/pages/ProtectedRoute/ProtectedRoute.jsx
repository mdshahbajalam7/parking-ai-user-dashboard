// /* eslint-disable */
// // components/ProtectedRoute.js
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isLoading, error, token } = useSelector((state) => state.global);

//   const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

//   if (!storedUser || !storedUser.email || !storedUser.password) {
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
/* eslint-disable */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole") || "user";
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // If user role is "user" and trying to access admin-only pages, redirect to user dashboard
  const adminOnlyPaths = ["/admin/users", "/admin/users-list", "/admin/subscriptions", "/admin/clients"];
  if (userRole === "user" && adminOnlyPaths.some((p) => location.pathname.startsWith(p))) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

