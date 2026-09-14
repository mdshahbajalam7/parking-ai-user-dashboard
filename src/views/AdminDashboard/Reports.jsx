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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  MdFileDownload,
  MdAdd,
  MdPictureAsPdf,
  MdDescription,
  MdTableChart,
  MdClose,
  MdAssessment,
  MdCheckCircle,
  MdSchedule,
  MdCloudDone,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialReports = [
  {
    id: "REP-901",
    title: "Monthly Revenue & Space Monetization Audit",
    category: "Financial",
    period: "August 2026",
    generatedAt: "01 Sep 2026",
    format: "PDF",
    size: "3.4 MB",
    status: "Ready",
  },
  {
    id: "REP-902",
    title: "Peak Hours & Capacity Bottleneck Analysis",
    category: "Occupancy",
    period: "Last 30 Days",
    generatedAt: "04 Sep 2026",
    format: "EXCEL",
    size: "5.8 MB",
    status: "Ready",
  },
  {
    id: "REP-903",
    title: "AI Camera License Plate & Object Recognition Log",
    category: "AI Vision",
    period: "Week 36, 2026",
    generatedAt: "07 Sep 2026",
    format: "CSV",
    size: "12.1 MB",
    status: "Ready",
  },
  {
    id: "REP-904",
    title: "Commercial Client Lot Utilization Statement",
    category: "Client Audit",
    period: "Q3 2026",
    generatedAt: "08 Sep 2026",
    format: "PDF",
    size: "2.1 MB",
    status: "Ready",
  },
  {
    id: "REP-905",
    title: "Automated Barrier Gate Inflow/Outflow Audit",
    category: "Telemetry",
    period: "01 Sep - 08 Sep",
    generatedAt: "08 Sep 2026",
    format: "CSV",
    size: "8.6 MB",
    status: "Ready",
  },
];

export default function Reports() {
  const theme = useTheme();
  const [reports, setReports] = useState(initialReports);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const [modalForm, setModalForm] = useState({
    title: "",
    category: "Occupancy",
    period: "Last 7 Days",
    format: "PDF",
  });

  const handleDownload = (report) => {
    toast.success(`Downloading ${report.title} (${report.format})...`);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!modalForm.title) {
      toast.error("Please enter report title");
      return;
    }

    const newReport = {
      id: `REP-${Math.floor(900 + Math.random() * 90)}`,
      title: modalForm.title,
      category: modalForm.category,
      period: modalForm.period,
      generatedAt: "Just now",
      format: modalForm.format,
      size: `${(Math.random() * 6 + 1).toFixed(1)} MB`,
      status: "Ready",
    };

    setReports([newReport, ...reports]);
    toast.success("New report generated successfully!");
    setOpenModal(false);
  };

  const filteredReports = reports.filter(
    (r) => selectedCategory === "All" || r.category === selectedCategory
  );

  const getFormatIcon = (format) => {
    switch (format) {
      case "PDF":
        return <MdPictureAsPdf color="#EF4444" size={20} />;
      case "EXCEL":
        return <MdTableChart color="#10B981" size={20} />;
      default:
        return <MdDescription color="#3B82F6" size={20} />;
    }
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
            Reports & Audits
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Automated parking facility logs, revenue statements, and telemetry exports
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd size={20} />}
          onClick={() => {
            setModalForm({
              title: "",
              category: "Occupancy",
              period: "Last 7 Days",
              format: "PDF",
            });
            setOpenModal(true);
          }}
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
          Generate New Report
        </Button>
      </Stack>

      {/* Metric Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  TOTAL REPORTS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {reports.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#2563EB", 0.12), color: "#2563EB", width: 44, height: 44 }}>
                <MdAssessment size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  SCHEDULED AUTO-RUN
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  4 Active
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#3B82F6", 0.12), color: "#3B82F6", width: 44, height: 44 }}>
                <MdSchedule size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  READY TO DOWNLOAD
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {reports.filter((r) => r.status === "Ready").length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#10B981", 0.12), color: "#10B981", width: 44, height: 44 }}>
                <MdCheckCircle size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  CLOUD ARCHIVE
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  Synced
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#A855F7", 0.12), color: "#A855F7", width: 44, height: 44 }}>
                <MdCloudDone size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Category */}
      <Card sx={{ p: 2.5, borderRadius: "16px", mb: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={700}>
            Available Reports Library
          </Typography>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="category-filter-label">Filter Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={selectedCategory}
              label="Filter Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Financial">Financial</MenuItem>
              <MenuItem value="Occupancy">Occupancy</MenuItem>
              <MenuItem value="AI Vision">AI Vision</MenuItem>
              <MenuItem value="Client Audit">Client Audit</MenuItem>
              <MenuItem value="Telemetry">Telemetry</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Reports Table */}
      <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Report Document</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Timeframe</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Generated On</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Format & Size</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "10px",
                          bgcolor: alpha("#FF007A", 0.08),
                        }}
                      >
                        {getFormatIcon(report.format)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>
                          {report.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {report.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.category}
                      size="small"
                      sx={{ bgcolor: alpha("#A855F7", 0.1), color: "#9333EA", fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{report.period}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {report.generatedAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={report.format} size="small" sx={{ fontWeight: 800, fontSize: "0.7rem" }} />
                      <Typography variant="caption" color="text.secondary">
                        {report.size}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      size="small"
                      sx={{
                        bgcolor: alpha("#10B981", 0.12),
                        color: "#059669",
                        fontWeight: 700,
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Download File">
                      <IconButton
                        onClick={() => handleDownload(report)}
                        sx={{
                          bgcolor: alpha("#2563EB", 0.08),
                          color: "#2563EB",
                          "&:hover": {
                            bgcolor: "#2563EB",
                            color: "#fff",
                          },
                        }}
                      >
                        <MdFileDownload size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Generate Report Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: "1px solid", borderColor: "divider" }}>
          Generate New Parking Report
        </DialogTitle>
        <form onSubmit={handleGenerate}>
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Report Title / Name"
                placeholder="e.g. Q3 Financial Occupancy Audit"
                value={modalForm.title}
                onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                required
              />

              <FormControl fullWidth>
                <InputLabel id="category-select">Report Category</InputLabel>
                <Select
                  labelId="category-select"
                  value={modalForm.category}
                  label="Report Category"
                  onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
                >
                  <MenuItem value="Occupancy">Occupancy & Traffic Telemetry</MenuItem>
                  <MenuItem value="Financial">Financial & Revenue Audits</MenuItem>
                  <MenuItem value="AI Accuracy">Vision AI & Sensor Diagnostics</MenuItem>
                  <MenuItem value="Security">Security & Incident Logs</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="period-select">Time Range</InputLabel>
                    <Select
                      labelId="period-select"
                      value={modalForm.period}
                      label="Time Range"
                      onChange={(e) => setModalForm({ ...modalForm, period: e.target.value })}
                    >
                      <MenuItem value="Today">Today (24h)</MenuItem>
                      <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                      <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                      <MenuItem value="Current Quarter">Current Quarter</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="format-select">Export Format</InputLabel>
                    <Select
                      labelId="format-select"
                      value={modalForm.format}
                      label="Export Format"
                      onChange={(e) => setModalForm({ ...modalForm, format: e.target.value })}
                    >
                      <MenuItem value="PDF">PDF Report Document</MenuItem>
                      <MenuItem value="CSV">CSV Spreadsheet Data</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Stack spacing={1}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include AI sensor detection logs" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Include automated revenue summary" />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenModal(false)} color="inherit" sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                boxShadow: "0 1px 3px rgba(37, 99, 235, 0.3)",
                "&:hover": {
                  bgcolor: "#1D4ED8",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                },
              }}
            >
              Generate & Export
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
