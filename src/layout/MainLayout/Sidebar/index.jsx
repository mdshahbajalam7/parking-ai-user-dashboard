/* eslint-disable*/
import { memo, useMemo } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// third party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MenuCard from "./MenuCard";
import MenuList from "../MenuList";
import LogoSection from "../LogoSection";
import MiniDrawerStyled from "./MiniDrawerStyled";

import useConfig from "hooks/useConfig";
import { drawerWidth } from "store/constant";

import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// ==============================|| SIDEBAR DRAWER ||============================== //

function Sidebar() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const { miniDrawer, mode } = useConfig();

  const logo = useMemo(
    () => (
      <Box sx={{ display: "flex", p: 2 }}>
        <LogoSection />
      </Box>
    ),
    []
  );

  const drawer = useMemo(() => {
    let drawerSX = {
      paddingLeft: "0px",
      paddingRight: "0px",
      marginTop: "10px",
    };
    if (drawerOpen)
      drawerSX = {
        paddingLeft: "16px",
        paddingRight: "16px",
        marginTop: "0px",
      };

    return (
      <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
        {/* Floating Sidebar Toggle Button permanently on the Right Border */}
        <Box
          sx={{
            position: "absolute",
            top: 14,
            right: -13,
            zIndex: 1250,
            display: { xs: "none", md: "block" },
          }}
        >
          <Avatar
            variant="circular"
            sx={{
              width: 26,
              height: 26,
              cursor: "pointer",
              bgcolor: "#ffffff",
              color: "#2563EB",
              border: "1.5px solid #2563EB",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
              transition: "all .2s ease-in-out",
              "&:hover": {
                bgcolor: "#2563EB",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                transform: "scale(1.08)",
              },
            }}
            onClick={() => handlerDrawerOpen(!drawerOpen)}
            title={drawerOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {drawerOpen ? (
              <IconChevronLeft stroke={2.5} size="15px" />
            ) : (
              <IconChevronRight stroke={2.5} size="15px" />
            )}
          </Avatar>
        </Box>

        <Box
          sx={{
            height: "calc(100vh - 56px)",
            overflowY: "auto",
            overflowX: "hidden",
            ...drawerSX,
            "&::-webkit-scrollbar": {
              display: "none",
              width: 0,
              height: 0,
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "& .ps__rail-y, & .ps__rail-x, & .ps__thumb-y, & .ps__thumb-x": {
              display: "none !important",
              opacity: "0 !important",
              visibility: "hidden !important",
              width: "0 !important",
            },
          }}
        >
          <MenuList />
        </Box>
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downMD, drawerOpen, mode]);

  return (
    <>
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: { xs: "auto", md: drawerWidth } }}
        aria-label="mailbox folders"
      >
        {downMD || (miniDrawer && drawerOpen) ? (
          <Drawer
            variant={downMD ? "temporary" : "persistent"}
            anchor="left"
            open={drawerOpen}
            onClose={() => handlerDrawerOpen(!drawerOpen)}
            sx={{
              "& .MuiDrawer-paper": {
                mt: downMD ? 0 : "56px",
                zIndex: 1099,
                width: drawerWidth,
                bgcolor: "background.default",
                color: "text.primary",
                borderRight: "none",
              },
            }}
            ModalProps={{ keepMounted: true }}
            color="inherit"
          >
            {downMD && logo}
            {drawer}
          </Drawer>
        ) : (
          <MiniDrawerStyled variant="permanent" open={drawerOpen}>
            <Box sx={{ mt: "56px" }}>{drawer}</Box>
          </MiniDrawerStyled>
        )}
      </Box>
    </>
  );
}

export default memo(Sidebar);
