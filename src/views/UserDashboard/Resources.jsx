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
  TextField,
  InputAdornment,
  Divider,
  Paper,
  useTheme
} from "@mui/material";
import {
  IconSearch,
  IconBook2,
  IconFileCode,
  IconVideo,
  IconDownload,
  IconExternalLink,
  IconCamera,
  IconBarrierBlock,
  IconDeviceMobile,
  IconCpu,
  IconSparkles
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Resources() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Camera Setup", "Gate Automation", "APIs & Webhooks", "Mobile & Passes"];

  const resourceArticles = [
    {
      id: "res-1",
      category: "Camera Setup",
      title: "ANPR Optical Alignment & Night-Vision Calibration",
      description: "Step-by-step angle, shutter speed, and focal length setup for 99.4% optical character accuracy on reflective plates.",
      readTime: "12 min read",
      type: "Guide",
      icon: <IconCamera size={22} color="#2563EB" />,
      tag: "Popular"
    },
    {
      id: "res-2",
      category: "Gate Automation",
      title: "Configuring Barrier Relay Signals & Loop Detectors",
      description: "Connect high-speed automated boom barriers, magnetic induction loops, and dry-contact relay controllers with Parking AI.",
      readTime: "8 min read",
      type: "Hardware",
      icon: <IconBarrierBlock size={22} color="#D97706" />,
      tag: "Essential"
    },
    {
      id: "res-3",
      category: "APIs & Webhooks",
      title: "REST API & Real-time Webhook Event Stream",
      description: "Integrate vehicle entry/exit telemetry, ANPR plate scans, and bay occupancy events directly into your ERP or building systems.",
      readTime: "v4.2 Docs",
      type: "Developer",
      icon: <IconFileCode size={22} color="#7C3AED" />,
      tag: "API v4.2"
    },
    {
      id: "res-4",
      category: "Mobile & Passes",
      title: "Visitor QR Pass & Digital Permit Onboarding",
      description: "How to generate dynamic visitor QR tickets, set guest expiration timers, and enable contactless entry on smartphones.",
      readTime: "5 min read",
      type: "User Guide",
      icon: <IconDeviceMobile size={22} color="#059669" />,
      tag: "Feature"
    },
    {
      id: "res-5",
      category: "Camera Setup",
      title: "Edge Compute Gateway & Local Offline Buffer",
      description: "Ensure your parking barrier opens without interruption even during internet broadband outages with Edge Sync.",
      readTime: "10 min read",
      type: "Architecture",
      icon: <IconCpu size={22} color="#E11D48" />,
      tag: "Reliability"
    },
    {
      id: "res-6",
      category: "APIs & Webhooks",
      title: "Custom Parking Fee Calculator & ANPR Billing Hooks",
      description: "Configure hourly tariffs, grace periods, overnight surcharges, and webhook notifications for third-party payment gates.",
      readTime: "7 min read",
      type: "Integration",
      icon: <IconBook2 size={22} color="#0284C7" />,
      tag: "Billing"
    }
  ];

  const videoTutorials = [
    {
      id: "vid-1",
      title: "ANPR Camera Installation & Real-Time Test Scan",
      duration: "4:35",
      views: "2.4k views",
      color: "#2563EB"
    },
    {
      id: "vid-2",
      title: "Configuring VIP Whitelist & Automated Barrier Rules",
      duration: "6:18",
      views: "1.8k views",
      color: "#7C3AED"
    },
    {
      id: "vid-3",
      title: "Issuing Visitor Passes & ANPR Daily Quota Review",
      duration: "3:50",
      views: "940 views",
      color: "#059669"
    }
  ];

  const downloads = [
    { name: "Vehicle_Bulk_Import_Template.csv", size: "24 KB", desc: "Batch upload license plates & permits" },
    { name: "ParkingAI_Barrier_Wiring_Diagram.pdf", size: "1.4 MB", desc: "Relay & loop detector schematic" },
    { name: "ANPR_Calibration_Test_Target_Plates.pdf", size: "3.2 MB", desc: "Standard printable test targets" }
  ];

  const filteredArticles = resourceArticles.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (art) => {
    toast.info(`Opening "${art.title}" documentation viewer...`);
  };

  const handleDownload = (file) => {
    toast.success(`Starting download: ${file.name}`);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Banner */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: textMain, fontSize: "1.8rem" }}>
          Knowledge &amp; Resources
        </Typography>
        <Typography variant="body2" sx={{ color: textSub, mt: 0.5 }}>
          Explore technical documentation, video guides, hardware wiring schematics, and developer API references.
        </Typography>
      </Box>

      {/* Search & Filter Bar */}
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: "18px",
          bgcolor: cardBg,
          border: cardBorder,
          mb: 3.5
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }}>
          <TextField
            placeholder="Search documentation, guides, and camera calibration steps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} color={textSub} />
                </InputAdornment>
              )
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: innerBg,
                color: textMain,
                "& fieldset": { borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0" }
              }
            }}
          />

          <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: { xs: 1, md: 0 } }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                clickable
                onClick={() => setActiveCategory(cat)}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  bgcolor: activeCategory === cat ? "#2563EB" : isDark ? "rgba(255, 255, 255, 0.06)" : "#F1F5F9",
                  color: activeCategory === cat ? "#ffffff" : textSub,
                  "&:hover": {
                    bgcolor: activeCategory === cat ? "#1D4ED8" : isDark ? "rgba(255, 255, 255, 0.12)" : "#E2E8F0"
                  }
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Articles Grid */}
      <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 2 }}>
        Documentation &amp; Setup Guides
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredArticles.map((art) => (
          <Grid item xs={12} sm={6} md={4} key={art.id}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: cardBg,
                border: cardBorder,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)" : "0 12px 24px -6px rgba(15, 23, 42, 0.08)",
                  borderColor: "#38BDF8"
                }
              }}
            >
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "12px",
                      bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF"
                    }}
                  >
                    {art.icon}
                  </Box>
                  <Chip
                    label={art.tag}
                    size="small"
                    sx={{ bgcolor: innerBg, border: innerBorder, color: textSub, fontWeight: 700, fontSize: "0.7rem" }}
                  />
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 800, color: textMain, mb: 1, fontSize: "1.05rem" }}>
                  {art.title}
                </Typography>
                <Typography variant="body2" sx={{ color: textSub, fontSize: "0.85rem", lineHeight: 1.5, mb: 2 }}>
                  {art.description}
                </Typography>
              </Box>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 2, borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #F1F5F9" }}>
                <Typography variant="caption" sx={{ color: textSub, fontWeight: 600 }}>
                  {art.readTime}
                </Typography>
                <Button
                  size="small"
                  endIcon={<IconExternalLink size={14} />}
                  onClick={() => handleOpenArticle(art)}
                  sx={{ color: "#38BDF8", fontWeight: 700, textTransform: "none" }}
                >
                  Read Guide
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Video Guides & Downloads Row */}
      <Grid container spacing={3}>
        {/* Video Guides */}
        <Grid item xs={12} md={7}>
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
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconVideo size={22} color="#38BDF8" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Video Tutorials
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: textSub, mb: 2.5 }}>
              Visual step-by-step demonstrations for camera calibration and gate hardware wiring.
            </Typography>

            <Stack spacing={2}>
              {videoTutorials.map((vid) => (
                <Box
                  key={vid.id}
                  onClick={() => toast.info(`Playing video: ${vid.title}`)}
                  sx={{
                    p: 2,
                    borderRadius: "14px",
                    bgcolor: innerBg,
                    border: innerBorder,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "#EFF6FF",
                      borderColor: "#38BDF8"
                    }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "10px",
                        bgcolor: vid.color,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ▶
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain }}>
                        {vid.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: textSub }}>
                        {vid.views} • Full HD
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label={vid.duration}
                    size="small"
                    sx={{ bgcolor: isDark ? "rgba(255, 255, 255, 0.1)" : "#E2E8F0", color: textMain, fontWeight: 700, fontSize: "0.72rem" }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Downloadable Assets */}
        <Grid item xs={12} md={5}>
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
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconDownload size={22} color="#16A34A" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Downloadable Templates
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: textSub, mb: 2.5 }}>
              Ready-to-use CSV templates, printable test targets, and wiring schematics.
            </Typography>

            <Stack spacing={2}>
              {downloads.map((d, idx) => (
                <Box
                  key={idx}
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
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain, fontSize: "0.85rem" }}>
                      {d.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: textSub }}>
                      {d.desc} • {d.size}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<IconDownload size={14} />}
                    onClick={() => handleDownload(d)}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 700,
                      borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#CBD5E1",
                      color: textMain
                    }}
                  >
                    Get
                  </Button>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
