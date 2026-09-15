/* eslint-disable */
// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";

import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import useConfig from "hooks/useConfig";

// assets
import { IconChevronLeft, IconChevronRight, IconMenu2, IconSun, IconMoon } from "@tabler/icons-react";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, onChangeMode } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: downMD ? "auto" : 228,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: { xs: 0, md: 1 },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        {/* <Avatar
          variant="rounded"
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: mode === "dark" ? "#1E293B" : "#ffffff",
            color: mode === "dark" ? "#F8FAFC" : "#1E293B",
            border: "1px solid",
            borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "#E2E8F0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
            transition: "all .2s ease-in-out",
            "&:hover": {
              bgcolor: mode === "dark" ? "#334155" : "#F8FAFC",
              borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1",
              color: "#2563EB",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.1)",
            },
          }}
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          color="inherit"
          title="Toggle Sidebar"
        >
          <IconMenu2 stroke={2} size="20px" />
        </Avatar> */}
      </Box>

      {/* spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Dark / Light Mode Toggle Button */}
      <Tooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <Avatar
          variant="rounded"
          sx={{
            cursor: "pointer",
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: mode === "dark" ? "#1E293B" : "#ffffff",
            color: mode === "dark" ? "#FBBF24" : "#475569",
            border: "1px solid",
            borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "#E2E8F0",
            boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
            mr: 1.5,
            transition: "all .2s ease-in-out",
            "&:hover": {
              bgcolor: mode === "dark" ? "#334155" : "#F8FAFC",
              borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "#CBD5E1",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => onChangeMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? <IconSun size={20} stroke={2} /> : <IconMoon size={20} stroke={2} />}
        </Avatar>
      </Tooltip>

      {/* profile & logout section */}
      <ProfileSection />
    </>
  );
}
