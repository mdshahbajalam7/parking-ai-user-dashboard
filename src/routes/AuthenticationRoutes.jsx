/* eslint-disable */

import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// maintenance routing
const LoginPage = Loadable(
  lazy(() => import("views/pages/authentication/Login"))
);
const RegisterPage = Loadable(
  lazy(() => import("views/pages/authentication/Register"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/auth/sign-in",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/admin/register",
      element: <RegisterPage />,
    },
  ],
};

export default AuthenticationRoutes;
