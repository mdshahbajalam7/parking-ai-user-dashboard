/* eslint-disable */
import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme
} from "@mui/material";
import {
  IconCircleCheck,
  IconShieldCheck,
  IconActivity,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconLockCheck,
  IconCpu,
  IconServer,
  IconEye,
  IconKey
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountActive() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [sessions, setSessions] = useState([
    {
      id: "sess-1",
      device: "Desktop Browser (Chrome / Windows 11)",
      location: "Facility Operations Control Room",
      ip: "192.168.1.104",
      lastActive: "Active Now",
      isCurrent: true,
      icon: <IconDeviceDesktop size={24} color="#2563EB" />
    },
    {
      id: "sess-2",
      device: "Parking AI Field App (iOS 17.5)",
      location: "South Entrance Handheld Scanner",
      ip: "10.0.4.88",
      lastActive: "1 hour ago",
      isCurrent: false,
      icon: <IconDeviceMobile size={24} color="#7C3AED" />
    }
  ]);

  const permissions = [
    { name: "Live ANPR Optical Stream Access", desc: "View real-time license plate detection feeds", granted: true },
    { name: "Emergency Barrier Remote Trigger", desc: "Force manual gate open/close override commands", granted: true },
    { name: "VIP Whitelist & Blacklist Controls", desc: "Authorize automatic plate entry without manual validation", granted: true },
    { name: "Tariff Configuration & Invoicing", desc: "Manage billing accounts, receipts, and hourly rates", granted: true },
    { name: "Cloud Audit & Plate Archive Search", desc: "Look up 90-day vehicle historical timestamps", granted: true }
  ];

  const handleRevokeSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    toast.success("All other active device sessions have been revoked!");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Status Hero Card */}
      <Card
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: "20px",
          background: "linear-gradient(135deg, #064E3B 0%, #065F46 60%, #047857 100%)",
          color: "#ffffff",
          mb: 3.5,
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.15)"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0) 70%)",
            pointerEvents: "none"
          }}
        />

        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={3}>
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                icon={<IconCircleCheck size={16} color="#34D399" />}
                label="ACCOUNT ACTIVE &amp; VERIFIED"
                size="small"
                sx={{
                  bgcolor: "rgba(52, 211, 153, 0.2)",
                  color: "#34D399",
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  letterSpacing: "0.6px"
                }}
              />
              <Chip
                label="Enterprise SLA"
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "#E2E8F0", fontSize: "0.72rem" }}
              />
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", sm: "2.1rem" }, mb: 1 }}>
              Smart Parking Operator License
            </Typography>
            <Typography variant="body2" sx={{ color: "#A7F3D0", maxWidth: 620, lineHeight: 1.6 }}>
              Your account credentials are fully authenticated with the Parking AI Vision Edge Network. All registered camera nodes and barrier relays are synced.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              p: 2.5,
              minWidth: { xs: "100%", md: 260 }
            }}
          >
            <Typography variant="caption" sx={{ color: "#A7F3D0", textTransform: "uppercase", fontWeight: 700 }}>
              License Validation
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, my: 0.5, color: "#fff" }}>
              Valid through Dec 2026
            </Typography>
            <Typography variant="caption" sx={{ color: "#D1FAE5" }}>
              Status: 100% Health Score
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* System Telemetry & Engine Health */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: cardBg, border: cardBorder }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <IconCpu size={20} color="#38BDF8" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: textSub, textTransform: "uppercase" }}>
                AI Vision Pipeline
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 0.5 }}>
              Active (64ms)
            </Typography>
            <Chip
              label="Zero-latency stream"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF",
                color: isDark ? "#60A5FA" : "#1D4ED8",
                fontWeight: 700,
                fontSize: "0.7rem"
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: cardBg, border: cardBorder }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <IconServer size={20} color="#16A34A" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: textSub, textTransform: "uppercase" }}>
                Edge Gate Synced
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 0.5 }}>
              Online 99.98%
            </Typography>
            <Chip
              label="Local buffer active"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
                color: isDark ? "#4ADE80" : "#166534",
                fontWeight: 700,
                fontSize: "0.7rem"
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: cardBg, border: cardBorder }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <IconEye size={20} color="#A78BFA" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: textSub, textTransform: "uppercase" }}>
                OCR Confidence
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 0.5 }}>
              99.4% Accuracy
            </Typography>
            <Chip
              label="Reflective ANPR calibrated"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(124, 58, 237, 0.2)" : "#F5F3FF",
                color: isDark ? "#C4B5FD" : "#7C3AED",
                fontWeight: 700,
                fontSize: "0.7rem"
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: cardBg, border: cardBorder }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <IconKey size={20} color="#D97706" />
              <Typography variant="caption" sx={{ fontWeight: 700, color: textSub, textTransform: "uppercase" }}>
                Active Token
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 0.5 }}>
              Encrypted (TLS 1.3)
            </Typography>
            <Chip
              label="Auto-refreshed"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(217, 119, 6, 0.2)" : "#FEF3C7",
                color: isDark ? "#FCD34D" : "#B45309",
                fontWeight: 700,
                fontSize: "0.7rem"
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Permissions and Active Sessions */}
      <Grid container spacing={3}>
        {/* Permission Scopes */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <IconLockCheck size={22} color="#38BDF8" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Account Privileges &amp; Scopes
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: textSub, mb: 2.5 }}>
              Security roles and capabilities permitted under this operator profile.
            </Typography>

            <List dense>
              {permissions.map((p, idx) => (
                <ListItem
                  key={idx}
                  disableGutters
                  sx={{
                    py: 1.2,
                    borderBottom: idx !== permissions.length - 1 ? (isDark ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid #F1F5F9") : "none"
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: isDark ? "#4ADE80" : "#16A34A" }}>
                    <IconCircleCheck size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={p.name}
                    secondary={p.desc}
                    primaryTypographyProps={{ fontWeight: 700, color: textMain, fontSize: "0.88rem" }}
                    secondaryTypographyProps={{ fontSize: "0.78rem", color: textSub }}
                  />
                  <Chip
                    label="GRANTED"
                    size="small"
                    sx={{
                      bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
                      color: isDark ? "#4ADE80" : "#166534",
                      fontWeight: 800,
                      fontSize: "0.68rem"
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Active Sessions */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <IconActivity size={22} color="#A78BFA" />
                <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                  Active Device Sessions
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: textSub, mb: 2.5 }}>
                Manage terminals and mobile scanners authorized with your account credentials.
              </Typography>

              <Stack spacing={2}>
                {sessions.map((sess) => (
                  <Box
                    key={sess.id}
                    sx={{
                      p: 2,
                      borderRadius: "14px",
                      bgcolor: innerBg,
                      border: innerBorder,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "#fff", border: innerBorder }}>
                        {sess.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain }}>
                          {sess.device}
                        </Typography>
                        <Typography variant="caption" sx={{ color: textSub }}>
                          {sess.location} • IP: {sess.ip}
                        </Typography>
                      </Box>
                    </Stack>

                    <Chip
                      label={sess.lastActive}
                      size="small"
                      sx={{
                        bgcolor: sess.isCurrent
                          ? (isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7")
                          : (isDark ? "rgba(255, 255, 255, 0.08)" : "#F1F5F9"),
                        color: sess.isCurrent
                          ? (isDark ? "#4ADE80" : "#166534")
                          : textSub,
                        fontWeight: 700,
                        fontSize: "0.7rem"
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            <Button
              variant="outlined"
              color="error"
              onClick={handleRevokeSessions}
              sx={{
                mt: 3,
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                py: 1.1
              }}
            >
              Revoke All Other Device Sessions
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
