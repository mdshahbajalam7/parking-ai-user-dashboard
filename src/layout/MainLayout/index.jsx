/* eslint-disable  */

import { useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // add useNavigate

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// project imports
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContentStyled from "./MainContentStyled";
import Customization from "../Customization";
import Loader from "ui-component/Loader";
// import Breadcrumbs from "ui-component/extended/Breadcrumbs";

import useConfig from "hooks/useConfig";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import { useSelector } from "react-redux";

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const theme = useTheme();
  const navigate = useNavigate(); // 👈 add this
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  // const { token } = useSelector((state) => state.global);
  const { borderRadius, miniDrawer } = useConfig();
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  // 👇 Redirect if user is not valid
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/sign-in"); // 👈 redirect if no token found
    }
  }, [, navigate]);

  useEffect(() => {
    handlerDrawerOpen(!miniDrawer);
  }, [miniDrawer]);

  useEffect(() => {
    downMD && handlerDrawerOpen(false);
  }, [downMD]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "56px !important", sm: "56px !important" },
            height: 56,
            px: { xs: 1.5, sm: 2.5 },
            py: 0,
          }}
        >
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      <Sidebar />

      {/* main content */}
      <MainContentStyled {...{ borderRadius, open: drawerOpen }}>
        <Box
          sx={{
            ...{ px: { xs: 0 } },
            minHeight: "calc(100vh - 56px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Breadcrumbs /> */}
          <Outlet />
          {/* <Footer /> */}
        </Box>
      </MainContentStyled>
      <Customization />
    </Box>
  );
}
