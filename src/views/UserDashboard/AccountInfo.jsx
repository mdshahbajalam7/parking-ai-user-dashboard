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
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme
} from "@mui/material";
import {
  IconUser,
  IconLock,
  IconShieldCheck,
  IconCar,
  IconBell,
  IconPlus,
  IconTrash,
  IconCheck,
  IconDeviceFloppy
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountInfo() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "alex.morgan@parkingai.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [facilityName, setFacilityName] = useState("Apex Metro Smart Parking Facility");

  // Notification toggles
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [overstayAlerts, setOverstayAlerts] = useState(true);

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Registered vehicles
  const [vehicles, setVehicles] = useState([
    { id: "v1", plate: "MH-12-DE-4412", model: "Tesla Model 3", type: "EV Resident", permit: "VIP-PASS-01" },
    { id: "v2", plate: "CA-78-KL-9901", model: "Ford F-150", type: "Staff Reserved", permit: "STAFF-PASS-44" },
    { id: "v3", plate: "NY-44-AB-1200", model: "Toyota RAV4 Hybrid", type: "Monthly Permit", permit: "PERMIT-892" }
  ]);

  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [newPlate, setNewPlate] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newType, setNewType] = useState("Staff Reserved");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", `${firstName} ${lastName}`);
    localStorage.setItem("userEmail", email);
    toast.success("Profile details updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password updated securely!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newPlate || !newModel) {
      toast.error("Please enter plate and vehicle model.");
      return;
    }

    const item = {
      id: "v-" + Date.now(),
      plate: newPlate.toUpperCase(),
      model: newModel,
      type: newType,
      permit: "PASS-" + Math.floor(100 + Math.random() * 900)
    };

    setVehicles([...vehicles, item]);
    toast.success(`Vehicle ${item.plate} registered!`);
    setOpenVehicleModal(false);
    setNewPlate("");
    setNewModel("");
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
    toast.info("Vehicle permit unlinked.");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Profile Card */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: cardBg,
          border: cardBorder,
          mb: 3.5
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#2563EB",
              fontSize: "1.8rem",
              fontWeight: 800,
              boxShadow: "0 8px 16px rgba(37, 99, 235, 0.25)"
            }}
          >
            AM
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: textMain, fontSize: "1.5rem" }}>
                {firstName} {lastName}
              </Typography>
              <Chip
                icon={<IconShieldCheck size={14} color={isDark ? "#4ADE80" : "#166534"} />}
                label="Verified Operator"
                size="small"
                sx={{
                  bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
                  color: isDark ? "#4ADE80" : "#166534",
                  fontWeight: 700,
                  fontSize: "0.72rem"
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ color: textSub }}>
              {email} • {facilityName}
            </Typography>
          </Box>
        </Stack>
      </Card>

      <Grid container spacing={3}>
        {/* Personal Details Form */}
        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              mb: 3
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconUser size={22} color="#38BDF8" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Personal &amp; Facility Details
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSaveProfile}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Facility Name"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                startIcon={<IconDeviceFloppy size={18} />}
                sx={{
                  mt: 3,
                  bgcolor: "#2563EB",
                  fontWeight: 700,
                  borderRadius: "10px",
                  textTransform: "none",
                  px: 2.5
                }}
              >
                Save Profile Changes
              </Button>
            </Box>
          </Card>

          {/* Registered Vehicles */}
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconCar size={22} color="#38BDF8" />
                <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                  Registered Vehicles &amp; Passes
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                size="small"
                startIcon={<IconPlus size={16} />}
                onClick={() => setOpenVehicleModal(true)}
                sx={{
                  borderRadius: "8px",
                  fontWeight: 700,
                  textTransform: "none",
                  borderColor: isDark ? "rgba(255,255,255,0.2)" : undefined,
                  color: isDark ? "#38BDF8" : undefined
                }}
              >
                Add Vehicle
              </Button>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: innerBg }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Plate Number</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Vehicle Model</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Permit Type</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell sx={{ fontWeight: 700, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>
                        <Chip
                          label={v.plate}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF",
                            color: isDark ? "#60A5FA" : "#1D4ED8"
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: isDark ? "#E2E8F0" : "#475569", borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{v.model}</TableCell>
                      <TableCell sx={{ color: textSub, fontSize: "0.8rem", borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{v.type}</TableCell>
                      <TableCell align="right" sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>
                        <IconButton size="small" onClick={() => handleDeleteVehicle(v.id)} sx={{ color: "#EF4444" }}>
                          <IconTrash size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Security & Notification Preferences */}
        <Grid item xs={12} md={5}>
          {/* Security / Password */}
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              mb: 3
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconLock size={22} color="#D97706" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Security &amp; Password
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleChangePassword}>
              <Stack spacing={2}>
                <TextField
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  size="small"
                />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                    borderRadius: "10px",
                    textTransform: "none",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#CBD5E1",
                    color: textMain
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </Box>
          </Card>

          {/* Notification Preferences */}
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <IconBell size={22} color="#16A34A" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Alert Preferences
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain }}>
                    Gate Blockage SMS
                  </Typography>
                  <Typography variant="caption" sx={{ color: textSub }}>
                    Instant emergency text when barrier cannot close
                  </Typography>
                </Box>
                <Switch checked={smsAlerts} onChange={(e) => setSmsAlerts(e.target.checked)} color="primary" />
              </Box>
              <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : undefined }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain }}>
                    Daily Occupancy Report
                  </Typography>
                  <Typography variant="caption" sx={{ color: textSub }}>
                    PDF summary sent every morning at 8:00 AM
                  </Typography>
                </Box>
                <Switch checked={dailyDigest} onChange={(e) => setDailyDigest(e.target.checked)} color="primary" />
              </Box>
              <Divider sx={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : undefined }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain }}>
                    Overstay Dwell Warnings
                  </Typography>
                  <Typography variant="caption" sx={{ color: textSub }}>
                    Alerts when vehicle parked beyond permit limit
                  </Typography>
                </Box>
                <Switch checked={overstayAlerts} onChange={(e) => setOverstayAlerts(e.target.checked)} color="primary" />
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Add Vehicle Modal */}
      <Dialog
        open={openVehicleModal}
        onClose={() => setOpenVehicleModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px", p: 1, bgcolor: cardBg, color: textMain, border: cardBorder } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.2rem", color: textMain }}>
          Register Parking Permit Vehicle
        </DialogTitle>
        <Box component="form" onSubmit={handleAddVehicle}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label="License Plate Number"
                placeholder="e.g. MH-12-DE-4412"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                fullWidth
                size="small"
                required
              />
              <TextField
                label="Vehicle Make & Model"
                placeholder="e.g. Honda Civic Silver"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                fullWidth
                size="small"
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenVehicleModal(false)} sx={{ color: textSub, fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#2563EB", fontWeight: 700, borderRadius: "10px", px: 2.5 }}
            >
              Add Vehicle
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
