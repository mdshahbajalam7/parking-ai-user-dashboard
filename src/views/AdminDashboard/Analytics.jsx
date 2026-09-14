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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";


import {
  MdTrendingUp,
  MdTrendingDown,
  MdRefresh,
  MdDownload,
  MdLocalParking,
  MdAttachMoney,
  MdAccessTime,
  MdVideocam,
  MdCheckCircle,
  MdWarning,
  MdLocationOn,
} from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kpiStats = [
  {
    title: "Real-time Occupancy",
    value: "84.2%",
    change: "+5.4%",
    isPositive: true,
    subtitle: "1,264 / 1,500 slots occupied",
    icon: <MdLocalParking size={24} />,
    color: "#2563EB",
    progress: 84,
  },
  {
    title: "Total Revenue (MTD)",
    value: "$48,920",
    change: "+14.8%",
    isPositive: true,
    subtitle: "vs $42,600 last month",
    icon: <MdAttachMoney size={24} />,
    color: "#059669",
    progress: 78,
  },
  {
    title: "Avg Parking Duration",
    value: "1h 42m",
    change: "-8.1%",
    isPositive: true,
    subtitle: "Faster slot turnover rate",
    icon: <MdAccessTime size={24} />,
    color: "#3B82F6",
    progress: 65,
  },
  {
    title: "AI Camera Uptime",
    value: "99.8%",
    change: "+0.2%",
    isPositive: true,
    subtitle: "64 of 65 sensors operational",
    icon: <MdVideocam size={24} />,
    color: "#10B981",
    progress: 99,
  },
];

const parkingLotsData = [
  {
    id: "LOT-01",
    name: "Downtown Central Garages",
    location: "450 Market St, Financial Dist.",
    totalSlots: 450,
    occupiedSlots: 395,
    todayRevenue: "$3,840",
    status: "High Demand",
    aiAccuracy: "99.4%",
  },
  {
    id: "LOT-02",
    name: "Airport North Terminal P1",
    location: "Terminal Blvd, Gate 4",
    totalSlots: 600,
    occupiedSlots: 498,
    todayRevenue: "$7,220",
    status: "Busy",
    aiAccuracy: "99.9%",
  },
  {
    id: "LOT-03",
    name: "Metro Grand Mall Underground",
    location: "800 Boulevard Ave",
    totalSlots: 300,
    occupiedSlots: 185,
    todayRevenue: "$2,110",
    status: "Normal",
    aiAccuracy: "98.7%",
  },
  {
    id: "LOT-04",
    name: "Tech Park East Plaza",
    location: "12 Innovation Way",
    totalSlots: 150,
    occupiedSlots: 92,
    todayRevenue: "$980",
    status: "Normal",
    aiAccuracy: "100%",
  },
];

const hourlyOccupancy = [
  { hour: "06:00", percent: 25 },
  { hour: "08:00", percent: 62 },
  { hour: "10:00", percent: 88 },
  { hour: "12:00", percent: 94 },
  { hour: "14:00", percent: 85 },
  { hour: "16:00", percent: 91 },
  { hour: "18:00", percent: 76 },
  { hour: "20:00", percent: 45 },
  { hour: "22:00", percent: 30 },
];

export default function Analytics() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("week");

  const handleExport = () => {
    toast.success("Analytics summary exported successfully!");
  };

  const handleRefresh = () => {
    toast.info("Refreshed real-time analytics data");
  };

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 } }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.5px",
            }}
          >
            Parking AI Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Real-time lot occupancy, revenue tracking, and AI vision telemetry
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="time-range-label">Time Period</InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              label="Time Period"
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ borderRadius: "8px", bgcolor: "#fff" }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Refresh Data">
            <IconButton
              onClick={handleRefresh}
              sx={{
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px",
                "&:hover": { bgcolor: alpha("#2563EB", 0.08), color: "#2563EB" },
              }}
            >
              <MdRefresh size={20} />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={<MdDownload size={18} />}
            onClick={handleExport}
            sx={{
              bgcolor: "#2563EB",
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 2.2,
              py: 0.9,
              boxShadow: "0 1px 3px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                bgcolor: "#1D4ED8",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
              },
            }}
          >
            Export Report
          </Button>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {kpiStats.map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: alpha(kpi.color, 0.15),
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 24px ${alpha(kpi.color, 0.2)}`,
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {kpi.title}
                  </Typography>
                  <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5, mb: 0.5 }}>
                    {kpi.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: alpha(kpi.color, 0.12),
                    color: kpi.color,
                    width: 46,
                    height: 46,
                    borderRadius: "12px",
                  }}
                >
                  {kpi.icon}
                </Avatar>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={kpi.progress}
                sx={{
                  mt: 1.5,
                  mb: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(kpi.color, 0.12),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 3,
                    bgcolor: kpi.color,
                  },
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {kpi.subtitle}
                </Typography>
                <Chip
                  icon={kpi.isPositive ? <MdTrendingUp size={14} /> : <MdTrendingDown size={14} />}
                  label={kpi.change}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    bgcolor: alpha("#10B981", 0.12),
                    color: "#059669",
                  }}
                />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hourly Occupancy Chart Visualization */}
      <Card sx={{ p: 3, borderRadius: "16px", mb: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Hourly Traffic & Space Utilization
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Average occupancy percentage across all connected lots
            </Typography>
          </Box>
          <Chip label="Live AI Feed" color="success" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        </Stack>

        <Box sx={{ display: "flex", alignItems: "flex-end", height: 180, gap: { xs: 1, sm: 2 }, pt: 2, pb: 1 }}>
          {hourlyOccupancy.map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="caption" fontWeight={700} sx={{ mb: 0.5, fontSize: "0.7rem", color: item.percent > 90 ? "#DC2626" : "text.secondary" }}>
                {item.percent}%
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 38,
                  height: `${item.percent}%`,
                  borderRadius: "6px 6px 2px 2px",
                  bgcolor: item.percent > 90 ? "#EF4444" : "#2563EB",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: item.percent > 90 ? "#DC2626" : "#1D4ED8",
                    transform: "scaleY(1.02)",
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontSize: "0.72rem" }}>
                {item.hour}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Connected Lots Performance Table */}
      <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" fontWeight={700}>
            Managed Parking Locations Status
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Live telemetry breakdown per smart parking facility
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Facility Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Capacity</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Utilization</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Today's Revenue</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>AI Accuracy</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkingLotsData.map((lot) => {
                const utilPercent = Math.round((lot.occupiedSlots / lot.totalSlots) * 100);
                return (
                  <TableRow key={lot.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "8px",
                            bgcolor: alpha("#2563EB", 0.1),
                            color: "#2563EB",
                          }}
                        >
                          <MdLocationOn size={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {lot.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lot.location}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {lot.occupiedSlots} / {lot.totalSlots}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        slots
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 140 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LinearProgress
                          variant="determinate"
                          value={utilPercent}
                          sx={{
                            flexGrow: 1,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: alpha("#000", 0.06),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              bgcolor: utilPercent > 85 ? "#DC2626" : "#10B981",
                            },
                          }}
                        />
                        <Typography variant="caption" fontWeight={700}>
                          {utilPercent}%
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700} color="text.primary">
                        {lot.todayRevenue}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<MdCheckCircle size={14} />}
                        label={lot.aiAccuracy}
                        size="small"
                        sx={{
                          bgcolor: alpha("#10B981", 0.1),
                          color: "#059669",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lot.status}
                        size="small"
                        sx={{
                          bgcolor:
                            lot.status === "High Demand"
                              ? alpha("#DC2626", 0.1)
                              : alpha("#2563EB", 0.1),
                          color: lot.status === "High Demand" ? "#DC2626" : "#2563EB",
                          fontWeight: 700,
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
