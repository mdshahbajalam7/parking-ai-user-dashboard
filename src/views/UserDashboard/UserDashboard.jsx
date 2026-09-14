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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Badge
} from "@mui/material";

import {
  MdLocalParking,
  MdCheckCircle,
  MdWarning,
  MdAccessTime,
  MdDirectionsCar,
  MdRefresh,
  MdAdd,
  MdQrCodeScanner,
  MdSensors,
  MdSensorDoor,
  MdReceipt,
  MdArrowForward,
  MdSearch,
  MdFilterList,
  MdOutlineDone
} from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Demo Assigned Bays Data
const initialBays = [
  { id: "A-01", section: "North Wing", status: "Occupied", vehicle: "MH-12-DE-4412", type: "EV Charging", duration: "1h 24m", fee: "$6.00" },
  { id: "A-02", section: "North Wing", status: "Available", vehicle: "--", type: "Standard", duration: "--", fee: "$0.00" },
  { id: "A-03", section: "North Wing", status: "Occupied", vehicle: "DL-01-AB-9081", type: "Compact", duration: "42m", fee: "$3.50" },
  { id: "A-04", section: "North Wing", status: "Reserved", vehicle: "VIP-PASS-102", type: "VIP", duration: "Reserved", fee: "$15.00" },
  { id: "B-01", section: "East Ramp", status: "Occupied", vehicle: "KA-05-MM-1982", type: "Standard", duration: "2h 10m", fee: "$9.00" },
  { id: "B-02", section: "East Ramp", status: "Available", vehicle: "--", type: "Standard", duration: "--", fee: "$0.00" },
  { id: "B-03", section: "East Ramp", status: "Occupied", vehicle: "HR-26-BR-5532", type: "EV Charging", duration: "3h 05m", fee: "$14.50" },
  { id: "B-04", section: "East Ramp", status: "Available", vehicle: "--", type: "Compact", duration: "--", fee: "$0.00" },
  { id: "C-01", section: "South Basement", status: "Occupied", vehicle: "TS-09-FA-8819", type: "Standard", duration: "55m", fee: "$4.00" },
  { id: "C-02", section: "South Basement", status: "Reserved", vehicle: "STAFF-LOT-04", type: "Staff Reserved", duration: "All Day", fee: "$0.00" },
  { id: "C-03", section: "South Basement", status: "Available", vehicle: "--", type: "Standard", duration: "--", fee: "$0.00" },
  { id: "C-04", section: "South Basement", status: "Available", vehicle: "--", type: "Handicap", duration: "--", fee: "$0.00" },
];

// Live Vehicle Feed
const initialLogs = [
  { id: "LOG-9042", plate: "MH-12-DE-4412", gate: "Gate 1 (North Entry)", time: "10 mins ago", type: "Entry Scanned", status: "Parked in A-01" },
  { id: "LOG-9041", plate: "KA-03-ZZ-9912", gate: "Gate 2 (South Exit)", time: "18 mins ago", type: "Exit Cleared", status: "Paid $8.00" },
  { id: "LOG-9040", plate: "DL-01-AB-9081", gate: "Gate 1 (North Entry)", time: "42 mins ago", type: "Entry Scanned", status: "Parked in A-03" },
  { id: "LOG-9039", plate: "TS-09-FA-8819", gate: "Gate 3 (Basement)", time: "55 mins ago", type: "Entry Scanned", status: "Parked in C-01" },
  { id: "LOG-9038", plate: "RJ-14-CC-3321", gate: "Gate 2 (South Exit)", time: "1h 12m ago", type: "Exit Cleared", status: "Paid $12.00" },
];

export default function UserDashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#ffffff";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [bays, setBays] = useState(initialBays);
  const [logs, setLogs] = useState(initialLogs);
  const [filterSection, setFilterSection] = useState("All");
  const [gateStatus, setGateStatus] = useState({ gate1: "Open", gate2: "Open", gate3: "Open" });
  
  // Quick Check-in modal
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [newPlate, setNewPlate] = useState("");
  const [selectedBay, setSelectedBay] = useState("A-02");
  const [vehicleType, setVehicleType] = useState("Standard");

  const totalSlots = bays.length;
  const occupiedCount = bays.filter((b) => b.status === "Occupied").length;
  const availableCount = bays.filter((b) => b.status === "Available").length;
  const reservedCount = bays.filter((b) => b.status === "Reserved").length;
  const occupancyRate = Math.round((occupiedCount / totalSlots) * 100);

  // Toggle Gate state
  const handleToggleGate = (gateName) => {
    setGateStatus((prev) => {
      const next = prev[gateName] === "Open" ? "Hold / Closed" : "Open";
      toast.info(`${gateName.toUpperCase()} is now ${next}`);
      return { ...prev, [gateName]: next };
    });
  };

  // Submit manual vehicle check-in
  const handleConfirmCheckIn = () => {
    if (!newPlate.trim()) {
      toast.error("Please enter a vehicle license plate number");
      return;
    }

    setBays((prev) =>
      prev.map((b) =>
        b.id === selectedBay
          ? { ...b, status: "Occupied", vehicle: newPlate.toUpperCase(), duration: "Just Now", fee: "$2.50" }
          : b
      )
    );

    const newLog = {
      id: "LOG-" + Math.floor(1000 + Math.random() * 9000),
      plate: newPlate.toUpperCase(),
      gate: "Manual Operator Entry",
      time: "Just Now",
      type: "Manual Check-in",
      status: `Parked in ${selectedBay}`
    };

    setLogs((prev) => [newLog, ...prev]);
    toast.success(`Vehicle ${newPlate.toUpperCase()} assigned to Bay ${selectedBay}`);
    setNewPlate("");
    setCheckInOpen(false);
  };

  // Free up a slot
  const handleFreeSlot = (bayId) => {
    setBays((prev) =>
      prev.map((b) =>
        b.id === bayId ? { ...b, status: "Available", vehicle: "--", duration: "--", fee: "$0.00" } : b
      )
    );
    toast.success(`Bay ${bayId} cleared & marked Available`);
  };

  const filteredBays = filterSection === "All" ? bays : bays.filter((b) => b.section === filterSection);

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Top Banner Header */}
      <Card
        sx={{
          mb: 3,
          p: { xs: 2, sm: 3 },
          borderRadius: "16px",
          bgcolor: cardBg,
          border: cardBorder,
          boxShadow: isDark ? "0 4px 16px -2px rgba(0, 0, 0, 0.4)" : "0 4px 16px -2px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="h3" fontWeight={800} sx={{ color: textMain, fontSize: { xs: "1.35rem", sm: "1.65rem" } }}>
                Facility Operator Console
              </Typography>
              <Chip
                label="LIVE LOT: ZONE-A"
                size="small"
                sx={{
                  bgcolor: "rgba(5, 150, 105, 0.1)",
                  color: "#059669",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  border: "1px solid rgba(5, 150, 105, 0.2)",
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ color: textSub }}>
              Real-time parking bay allocation, gate controls, and vehicle ANPR entry feeds.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<MdRefresh size={18} />}
              onClick={() => toast.success("Live sensor feed re-synchronized")}
              sx={{
                borderRadius: "10px",
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "#CBD5E1",
                color: isDark ? "#E2E8F0" : "#334155",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { borderColor: isDark ? "#94A3B8" : "#94A3B8", bgcolor: innerBg },
              }}
            >
              Sync Sensors
            </Button>

            <Button
              variant="contained"
              startIcon={<MdAdd size={18} />}
              onClick={() => setCheckInOpen(true)}
              sx={{
                borderRadius: "10px",
                bgcolor: "#059669",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.25)",
                "&:hover": { bgcolor: "#047857" },
              }}
            >
              Manual Check-In
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Available Bays */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" sx={{ color: textSub, fontWeight: 600, textTransform: "uppercase" }}>
                  Available Bays
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#059669", mt: 0.5 }}>
                  {availableCount} <Typography component="span" variant="body2" sx={{ color: textSub }}>/ {totalSlots}</Typography>
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(5, 150, 105, 0.12)", color: "#059669", width: 44, height: 44, borderRadius: "12px" }}>
                <MdLocalParking size={24} />
              </Avatar>
            </Stack>
            <Typography variant="caption" sx={{ color: "#059669", fontWeight: 600, mt: 1.5, display: "block" }}>
              ● Ready for immediate parking
            </Typography>
          </Card>
        </Grid>

        {/* Occupied Bays */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" sx={{ color: textSub, fontWeight: 600, textTransform: "uppercase" }}>
                  Occupied Bays
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#2563EB", mt: 0.5 }}>
                  {occupiedCount} <Typography component="span" variant="body2" sx={{ color: textSub }}>({occupancyRate}%)</Typography>
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(37, 99, 235, 0.12)", color: "#2563EB", width: 44, height: 44, borderRadius: "12px" }}>
                <MdDirectionsCar size={24} />
              </Avatar>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={occupancyRate}
              sx={{ mt: 1.8, height: 6, borderRadius: 3, bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0", "& .MuiLinearProgress-bar": { bgcolor: "#2563EB" } }}
            />
          </Card>
        </Grid>

        {/* Reserved Bays */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" sx={{ color: textSub, fontWeight: 600, textTransform: "uppercase" }}>
                  VIP / Reserved
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#D97706", mt: 0.5 }}>
                  {reservedCount}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(217, 119, 6, 0.12)", color: "#D97706", width: 44, height: 44, borderRadius: "12px" }}>
                <MdCheckCircle size={24} />
              </Avatar>
            </Stack>
            <Typography variant="caption" sx={{ color: "#D97706", fontWeight: 600, mt: 1.5, display: "block" }}>
              ● 2 Permits scheduled today
            </Typography>
          </Card>
        </Grid>

        {/* ANPR Scanner Health */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" sx={{ color: textSub, fontWeight: 600, textTransform: "uppercase" }}>
                  Camera & AI Vision
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: textMain, mt: 0.5 }}>
                  100%
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "rgba(16, 185, 129, 0.12)", color: "#10B981", width: 44, height: 44, borderRadius: "12px" }}>
                <MdSensors size={24} />
              </Avatar>
            </Stack>
            <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 600, mt: 1.5, display: "block" }}>
              ● 4 Cameras online (0 latency)
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Area: Left Grid (Live Bays Grid) & Right (Gate Controls + Logs) */}
      <Grid container spacing={3}>
        {/* Left Column: Interactive Bay Matrix */}
        <Grid item xs={12} lg={8} id="bays">
          <Card
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5} sx={{ mb: 2.5 }}>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: textMain }}>
                  Assigned Parking Bays
                </Typography>
                <Typography variant="caption" sx={{ color: textSub }}>
                  Click on an occupied bay to inspect details or clear the slot upon vehicle exit.
                </Typography>
              </Box>

              {/* Filter Section Dropdown */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: textSub }}>Wing / Section</InputLabel>
                <Select
                  value={filterSection}
                  label="Wing / Section"
                  onChange={(e) => setFilterSection(e.target.value)}
                  sx={{ borderRadius: "8px", bgcolor: innerBg, color: textMain }}
                >
                  <MenuItem value="All">All Sections</MenuItem>
                  <MenuItem value="North Wing">North Wing</MenuItem>
                  <MenuItem value="East Ramp">East Ramp</MenuItem>
                  <MenuItem value="South Basement">South Basement</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Bay Tiles Grid */}
            <Grid container spacing={2}>
              {filteredBays.map((bay) => {
                const isOccupied = bay.status === "Occupied";
                const isReserved = bay.status === "Reserved";
                const isAvailable = bay.status === "Available";

                let tileBg = isDark ? "rgba(5, 150, 105, 0.12)" : "#F0FDF4";
                let borderColor = isDark ? "rgba(16, 185, 129, 0.35)" : "#BBF7D0";
                let badgeColor = "#059669";
                if (isOccupied) {
                  tileBg = isDark ? "rgba(37, 99, 235, 0.14)" : "#EFF6FF";
                  borderColor = isDark ? "rgba(59, 130, 246, 0.35)" : "#BFDBFE";
                  badgeColor = "#2563EB";
                } else if (isReserved) {
                  tileBg = isDark ? "rgba(217, 119, 6, 0.14)" : "#FFFBEB";
                  borderColor = isDark ? "rgba(245, 158, 11, 0.35)" : "#FDE68A";
                  badgeColor = "#D97706";
                }

                return (
                  <Grid item xs={6} sm={4} md={3} key={bay.id}>
                    <Box
                      sx={{
                        p: 1.8,
                        borderRadius: "12px",
                        bgcolor: tileBg,
                        border: "1.5px solid",
                        borderColor: borderColor,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: 130,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={800} sx={{ color: textMain }}>
                          {bay.id}
                        </Typography>
                        <Chip
                          label={bay.status}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            bgcolor: alpha(badgeColor, 0.15),
                            color: badgeColor,
                          }}
                        />
                      </Stack>

                      <Box sx={{ my: 0.8 }}>
                        <Typography variant="body2" fontWeight={700} sx={{ color: isOccupied ? (isDark ? "#93C5FD" : "#1E293B") : textSub }}>
                          {bay.vehicle}
                        </Typography>
                        <Typography variant="caption" sx={{ color: textSub, display: "block" }}>
                          {bay.type} • {bay.section}
                        </Typography>
                      </Box>

                      {isOccupied ? (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleFreeSlot(bay.id)}
                          sx={{
                            py: 0.2,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            borderColor: isDark ? "rgba(59, 130, 246, 0.5)" : "#93C5FD",
                            color: isDark ? "#60A5FA" : "#1D4ED8",
                            textTransform: "none",
                            borderRadius: "6px",
                            "&:hover": { bgcolor: isDark ? "rgba(37, 99, 235, 0.25)" : "#DBEAFE" },
                          }}
                        >
                          Mark Free
                        </Button>
                      ) : (
                        <Typography variant="caption" sx={{ color: "#059669", fontWeight: 600 }}>
                          ✓ Ready for Entry
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Card>

          {/* Vehicle Activity Logs Table */}
          <Card
            id="vehicles"
            sx={{
              mt: 3,
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <Typography variant="h4" fontWeight={700} sx={{ color: textMain, mb: 0.5 }}>
              Live Entry & Exit Feed (ANPR)
            </Typography>
            <Typography variant="caption" sx={{ color: textSub, display: "block", mb: 2 }}>
              Automatic number plate recognition timestamps recorded at barrier gates.
            </Typography>

            <TableContainer component={Paper} elevation={0} sx={{ border: cardBorder, bgcolor: cardBg, borderRadius: "12px" }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: innerBg }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Log ID</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Plate Number</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Gate / Location</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Event Type</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>Status / Bay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} hover>
                      <TableCell sx={{ fontWeight: 600, color: textSub, fontSize: "0.78rem", borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>{log.id}</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: textMain, borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>
                        <Chip
                          label={log.plate}
                          size="small"
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            bgcolor: innerBg,
                            color: textMain,
                            border: innerBorder,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: isDark ? "#CBD5E1" : "#334155", fontSize: "0.82rem", borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>{log.gate}</TableCell>
                      <TableCell sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>
                        <Chip
                          label={log.type}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            bgcolor: log.type.includes("Entry") ? "rgba(37, 99, 235, 0.15)" : "rgba(5, 150, 105, 0.15)",
                            color: log.type.includes("Entry") ? "#3B82F6" : "#10B981",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: textSub, fontSize: "0.78rem", borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>{log.time}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: textMain, fontSize: "0.82rem", borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0" }}>{log.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right Column: Gate Status & Quick Pass Actions */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Gate Barrier Controls */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: cardBg,
                border: cardBorder,
                boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ color: textMain, mb: 0.5 }}>
                Gate & Barrier Controls
              </Typography>
              <Typography variant="caption" sx={{ color: textSub, display: "block", mb: 2 }}>
                Override barrier gates for emergency transit or manual vehicle assistance.
              </Typography>

              <Stack spacing={2}>
                {/* Gate 1 */}
                <Box sx={{ p: 1.8, borderRadius: "12px", border: innerBorder, bgcolor: innerBg }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} color={textMain}>
                        Barrier #1 - North Entry
                      </Typography>
                      <Typography variant="caption" sx={{ color: gateStatus.gate1 === "Open" ? "#059669" : "#DC2626", fontWeight: 700 }}>
                        ● Status: {gateStatus.gate1}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleToggleGate("gate1")}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        bgcolor: gateStatus.gate1 === "Open" ? "#DC2626" : "#059669",
                        "&:hover": { bgcolor: gateStatus.gate1 === "Open" ? "#B91C1C" : "#047857" },
                      }}
                    >
                      {gateStatus.gate1 === "Open" ? "Close Barrier" : "Open Barrier"}
                    </Button>
                  </Stack>
                </Box>

                {/* Gate 2 */}
                <Box sx={{ p: 1.8, borderRadius: "12px", border: innerBorder, bgcolor: innerBg }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} color={textMain}>
                        Barrier #2 - South Exit
                      </Typography>
                      <Typography variant="caption" sx={{ color: gateStatus.gate2 === "Open" ? "#059669" : "#DC2626", fontWeight: 700 }}>
                        ● Status: {gateStatus.gate2}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleToggleGate("gate2")}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        bgcolor: gateStatus.gate2 === "Open" ? "#DC2626" : "#059669",
                        "&:hover": { bgcolor: gateStatus.gate2 === "Open" ? "#B91C1C" : "#047857" },
                      }}
                    >
                      {gateStatus.gate2 === "Open" ? "Close Barrier" : "Open Barrier"}
                    </Button>
                  </Stack>
                </Box>

                {/* Gate 3 */}
                <Box sx={{ p: 1.8, borderRadius: "12px", border: innerBorder, bgcolor: innerBg }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} color={textMain}>
                        Barrier #3 - Basement Ramp
                      </Typography>
                      <Typography variant="caption" sx={{ color: gateStatus.gate3 === "Open" ? "#059669" : "#DC2626", fontWeight: 700 }}>
                        ● Status: {gateStatus.gate3}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleToggleGate("gate3")}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "8px",
                        bgcolor: gateStatus.gate3 === "Open" ? "#DC2626" : "#059669",
                        "&:hover": { bgcolor: gateStatus.gate3 === "Open" ? "#B91C1C" : "#047857" },
                      }}
                    >
                      {gateStatus.gate3 === "Open" ? "Close Barrier" : "Open Barrier"}
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Card>

            {/* Passes & Permits Summary */}
            <Card
              id="passes"
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: cardBg,
                border: cardBorder,
                boxShadow: isDark ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <Typography variant="h4" fontWeight={700} sx={{ color: textMain, mb: 0.5 }}>
                Active Visitor Passes
              </Typography>
              <Typography variant="caption" sx={{ color: textSub, display: "block", mb: 2 }}>
                Pre-authorized visitor access codes & corporate validation.
              </Typography>

              <Stack spacing={1.5}>
                <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: innerBg, border: innerBorder }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={700} color={textMain}>
                      VIP-PASS-102
                    </Typography>
                    <Chip label="Valid Today" size="small" sx={{ bgcolor: "#DCFCE7", color: "#15803D", fontWeight: 700, height: 20, fontSize: "0.65rem" }} />
                  </Stack>
                  <Typography variant="caption" color={textSub}>
                    Executive guest parking • Assigned to A-04
                  </Typography>
                </Box>

                <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: innerBg, border: innerBorder }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={700} color={textMain}>
                      STAFF-LOT-04
                    </Typography>
                    <Chip label="Permanent" size="small" sx={{ bgcolor: "#E0E7FF", color: "#4338CA", fontWeight: 700, height: 20, fontSize: "0.65rem" }} />
                  </Stack>
                  <Typography variant="caption" color={textSub}>
                    Facility operations pass • Assigned to C-02
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Manual Check-In Modal */}
      <Dialog open={checkInOpen} onClose={() => setCheckInOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#0F172A" }}>
          Manual Vehicle Check-In
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              label="License Plate Number"
              placeholder="e.g. DL-04-CA-1029"
              fullWidth
              value={newPlate}
              onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
              inputProps={{ style: { textTransform: "uppercase", fontWeight: 700 } }}
            />

            <FormControl fullWidth>
              <InputLabel>Assign Bay</InputLabel>
              <Select
                value={selectedBay}
                label="Assign Bay"
                onChange={(e) => setSelectedBay(e.target.value)}
              >
                {bays
                  .filter((b) => b.status === "Available")
                  .map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.id} ({b.section} - {b.type})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Vehicle Class</InputLabel>
              <Select
                value={vehicleType}
                label="Vehicle Class"
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <MenuItem value="Standard">Standard Sedan / Hatchback</MenuItem>
                <MenuItem value="SUV">SUV / 4x4</MenuItem>
                <MenuItem value="EV Charging">Electric Vehicle (EV)</MenuItem>
                <MenuItem value="Compact">Two-Wheeler / Bike</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCheckInOpen(false)} sx={{ color: "#64748B", textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmCheckIn}
            sx={{
              bgcolor: "#059669",
              "&:hover": { bgcolor: "#047857" },
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Confirm Check-In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
