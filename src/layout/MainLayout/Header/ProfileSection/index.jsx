/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";

// assets
import {
  IconLogout,
  IconChevronDown,
  IconCalendar,
  IconClock,
  IconMail,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";

export default function ProfileSection() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Live date and time state
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Retrieve user details from localStorage
  const userRole = localStorage.getItem("userRole") || "user";
  const userName =
    localStorage.getItem("userName") || "Alex Morgan";
  const userEmail =
    localStorage.getItem("userEmail") || "alex.morgan@parkingai.com";

  const getInitials = (name) => {
    if (!name) return "AM";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    navigate("/auth/sign-in");
  };

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
      {/* Profile Trigger Button on the right edge */}
      <Box
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          p: 0.5,
          pl: 0.8,
          pr: { xs: 0.8, sm: 1.5 },
          borderRadius: "14px",
          cursor: "pointer",
          border: "1.5px solid",
          borderColor: open ? "#2563EB" : "transparent",
          bgcolor: open ? alpha("#2563EB", 0.08) : "transparent",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: alpha("#2563EB", 0.06),
            borderColor: alpha("#2563EB", 0.35),
            transform: "translateY(-1px)",
          },
        }}
      >
        {/* User Avatar */}
        <Avatar
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            bgcolor: "#2563EB",
            color: "#ffffff",
            fontSize: "0.85rem",
            fontWeight: 700,
            boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
          }}
        >
          {getInitials(userName)}
        </Avatar>

        {/* User text labels (desktop) */}
        <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}>
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.primary"
            lineHeight={1.2}
          >
            {userName}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{
              color: userRole === "user" ? "#059669" : "#2563EB",
              fontSize: "0.7rem",
            }}
          >
            {userRole === "user" ? "Facility Operator" : "Administrator"}
          </Typography>
        </Box>

        <IconChevronDown
          size={16}
          style={{
            color: "#64748B",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </Box>

      {/* Profile Animated Dropdown positioned strictly to the RIGHT */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        TransitionComponent={Grow}
        transitionDuration={240}
        PaperProps={{
          elevation: 16,
          sx: {
            mt: 1.5,
            width: 320,
            maxWidth: "92vw",
            borderRadius: "18px",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.18)",
            overflow: "hidden",
            p: 0,
            "& .MuiList-root": {
              p: 0,
            },
          },
        }}
      >
        {/* Top Header with User Identity */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: "#f8fafc",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={1.8} alignItems="center">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                borderRadius: "10px",
                bgcolor: "#2563EB",
                color: "#ffffff",
                fontSize: "1.1rem",
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
              }}
            >
              {getInitials(userName)}
            </Avatar>

            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                noWrap
                color="text.primary"
              >
                {userName}
              </Typography>

              <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mt: 0.4 }}>
                <IconMail size={14} color="#64748B" />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ maxWidth: 200 }}
                >
                  {userEmail}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Session, Date & Time Details inside popup */}
        <Box sx={{ p: 2 }}>
          <Card
            elevation={0}
            sx={{
              p: 1.8,
              borderRadius: "12px",
              bgcolor: "#f8fafc",
              border: "1px solid",
              borderColor: "divider",
              mb: 1.8,
            }}
          >
            <Stack spacing={1.2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  Session Status
                </Typography>
                <Chip
                  icon={<IconShieldCheck size={14} color="#10B981" />}
                  label="Authenticated"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    bgcolor: alpha("#10B981", 0.12),
                    color: "#059669",
                  }}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <IconCalendar size={14} color="#2563EB" />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Date
                  </Typography>
                </Stack>
                <Typography variant="caption" fontWeight={700} color="text.primary">
                  {formattedDate}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={0.6} alignItems="center">
                  <IconClock size={14} color="#6366F1" />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Live Time
                  </Typography>
                </Stack>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ fontFamily: "monospace", color: "#0F172A", letterSpacing: "0.5px" }}
                >
                  {formattedTime}
                </Typography>
              </Stack>
            </Stack>
          </Card>

          {/* Quick Nav Links */}
          <Stack spacing={1} sx={{ mb: 1.5 }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<IconUser size={16} />}
              onClick={() => {
                handleClose();
                navigate("/user/account-info");
              }}
              sx={{
                borderRadius: "8px",
                borderColor: "#E2E8F0",
                color: "#334155",
                fontWeight: 600,
                textTransform: "none",
                justifyContent: "flex-start",
                px: 1.5,
                "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" }
              }}
            >
              Account Info &amp; Vehicles
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<IconShieldCheck size={16} />}
              onClick={() => {
                handleClose();
                navigate("/user/account-active");
              }}
              sx={{
                borderRadius: "8px",
                borderColor: "#E2E8F0",
                color: "#334155",
                fontWeight: 600,
                textTransform: "none",
                justifyContent: "flex-start",
                px: 1.5,
                "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" }
              }}
            >
              Account Active Status
            </Button>
          </Stack>

          {/* Logout Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<IconLogout size={18} />}
            onClick={handleLogout}
            sx={{
              py: 1.1,
              borderRadius: "8px",
              bgcolor: "#DC2626",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              boxShadow: "0 1px 3px rgba(220, 38, 38, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#B91C1C",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.35)",
              },
            }}
          >
            Sign Out / Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
