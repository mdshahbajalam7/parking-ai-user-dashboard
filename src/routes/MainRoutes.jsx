/* eslint-disable */
import { lazy } from "react";
import { Navigate } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import ProtectedRoute from "../views/pages/ProtectedRoute/ProtectedRoute";

// User Dashboard Views
const UserDashboard = Loadable(lazy(() => import("../views/UserDashboard/UserDashboard")));
const MyPlans = Loadable(lazy(() => import("../views/UserDashboard/MyPlans")));
const Billing = Loadable(lazy(() => import("../views/UserDashboard/Billing")));
const Resources = Loadable(lazy(() => import("../views/UserDashboard/Resources")));
const Help = Loadable(lazy(() => import("../views/UserDashboard/Help")));
const AccountInfo = Loadable(lazy(() => import("../views/UserDashboard/AccountInfo")));
const AccountActive = Loadable(lazy(() => import("../views/UserDashboard/AccountActive")));
const Logout = Loadable(lazy(() => import("../views/UserDashboard/Logout")));

// Role-aware root redirect component (defaults to User Dashboard)
const RoleBasedRedirect = () => {
  return <Navigate to="/user/dashboard" replace />;
};

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <RoleBasedRedirect />,
    },
    {
      path: "user",
      children: [
        {
          path: "dashboard",
          element: <UserDashboard />,
        },
        {
          path: "my-plans",
          element: <MyPlans />,
        },
        {
          path: "billing",
          element: <Billing />,
        },
        {
          path: "resources",
          element: <Resources />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "account-info",
          element: <AccountInfo />,
        },
        {
          path: "account-active",
          element: <AccountActive />,
        },
      ],
    },
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
