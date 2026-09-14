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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdBusiness,
  MdEmail,
  MdPhone,
  MdLocationCity,
  MdCheckCircle,
  MdClose,
  MdPeople,
  MdStar,
  MdAttachMoney,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialClients = [
  {
    id: "CLI-101",
    company: "Apex Real Estate Group",
    contactName: "David Harrison",
    email: "david.h@apexgroup.com",
    phone: "+1 (555) 234-5678",
    locationsCount: 8,
    plan: "Enterprise",
    spend: "$4,200/mo",
    status: "Active",
    joinedDate: "15 Jan 2024",
  },
  {
    id: "CLI-102",
    company: "Metropolitan Airport Authority",
    contactName: "Sarah Jenkins",
    email: "s.jenkins@metroairport.gov",
    phone: "+1 (555) 876-5432",
    locationsCount: 14,
    plan: "Enterprise",
    spend: "$8,500/mo",
    status: "Active",
    joinedDate: "02 Feb 2024",
  },
  {
    id: "CLI-103",
    company: "Westfield Retail Center",
    contactName: "Michael Chang",
    email: "mchang@westfieldpark.com",
    phone: "+1 (555) 345-6789",
    locationsCount: 3,
    plan: "Professional",
    spend: "$1,800/mo",
    status: "Active",
    joinedDate: "18 Mar 2024",
  },
  {
    id: "CLI-104",
    company: "Silicon Valley Tech Hub",
    contactName: "Elena Rostova",
    email: "elena@svtechhub.io",
    phone: "+1 (555) 901-2345",
    locationsCount: 2,
    plan: "Starter",
    spend: "$750/mo",
    status: "Trial",
    joinedDate: "05 Apr 2024",
  },
  {
    id: "CLI-105",
    company: "Harbor View Hospital Complex",
    contactName: "Robert Vance",
    email: "rvance@harborhospital.org",
    phone: "+1 (555) 432-1098",
    locationsCount: 6,
    plan: "Professional",
    spend: "$3,100/mo",
    status: "Active",
    joinedDate: "20 May 2024",
  },
];

export default function Clients() {
  const theme = useTheme();
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    locationsCount: 1,
    plan: "Professional",
    spend: "$1,500/mo",
    status: "Active",
  });

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      company: "",
      contactName: "",
      email: "",
      phone: "",
      locationsCount: 1,
      plan: "Professional",
      spend: "$1,500/mo",
      status: "Active",
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (client) => {
    setEditingClient(client);
    setFormData({ ...client });
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this client?")) {
      setClients(clients.filter((c) => c.id !== id));
      toast.success("Client removed successfully!");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.email) {
      toast.error("Please fill in required company and email fields");
      return;
    }

    if (editingClient) {
      setClients(
        clients.map((c) =>
          c.id === editingClient.id ? { ...formData, id: c.id } : c
        )
      );
      toast.success("Client details updated successfully!");
    } else {
      const newId = `CLI-${Math.floor(100 + Math.random() * 900)}`;
      setClients([
        {
          ...formData,
          id: newId,
          joinedDate: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        },
        ...clients,
      ]);
      toast.success("New client registered successfully!");
    }
    setOpenModal(false);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            Client Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enterprise accounts, facility operators, and commercial parking clients
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd size={20} />}
          onClick={handleOpenAdd}
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
          Add New Client
        </Button>
      </Stack>

      {/* Metric Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  TOTAL CLIENTS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {clients.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#2563EB", 0.12), color: "#2563EB", width: 44, height: 44 }}>
                <MdBusiness size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  ACTIVE ACCOUNTS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {clients.filter((c) => c.status === "Active").length}
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
                  TOTAL LOTS MANAGED
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {clients.reduce((acc, c) => acc + Number(c.locationsCount || 0), 0)}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#3B82F6", 0.12), color: "#3B82F6", width: 44, height: 44 }}>
                <MdLocationCity size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  ENTERPRISE CLIENTS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {clients.filter((c) => c.plan === "Enterprise").length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#A855F7", 0.12), color: "#A855F7", width: 44, height: 44 }}>
                <MdStar size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Filter and Search Bar */}
      <Card sx={{ p: 2.5, borderRadius: "16px", mb: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search clients by company, contact person or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} color="#94A3B8" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="client-status-label">Status Filter</InputLabel>
            <Select
              labelId="client-status-label"
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Trial">Trial</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Clients Table */}
      <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Client / Organization</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Lots Managed</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Plan Tier</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Monthly Spend</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "8px",
                            bgcolor: "#2563EB",
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          {client.company.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {client.company}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {client.id} • Joined {client.joinedDate}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {client.contactName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {client.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {client.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${client.locationsCount} Facilities`}
                        size="small"
                        sx={{ bgcolor: alpha("#2563EB", 0.08), color: "#2563EB", fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={client.plan}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor:
                            client.plan === "Enterprise"
                              ? alpha("#6366F1", 0.12)
                              : client.plan === "Professional"
                              ? alpha("#2563EB", 0.12)
                              : alpha("#64748B", 0.12),
                          color:
                            client.plan === "Enterprise"
                              ? "#4F46E5"
                              : client.plan === "Professional"
                              ? "#2563EB"
                              : "#475569",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {client.spend}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={client.status}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 700,
                          bgcolor:
                            client.status === "Active"
                              ? alpha("#10B981", 0.12)
                              : client.status === "Trial"
                              ? alpha("#F59E0B", 0.12)
                              : alpha("#EF4444", 0.12),
                          color:
                            client.status === "Active"
                              ? "#059669"
                              : client.status === "Trial"
                              ? "#D97706"
                              : "#DC2626",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Edit Client">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEdit(client)}
                            sx={{ color: "#3B82F6", "&:hover": { bgcolor: alpha("#3B82F6", 0.1) } }}
                          >
                            <MdEdit size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Client">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(client.id)}
                            sx={{ color: "#EF4444", "&:hover": { bgcolor: alpha("#EF4444", 0.1) } }}
                          >
                            <MdDelete size={18} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No clients found matching criteria</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add / Edit Client Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight={700}>
            {editingClient ? "Edit Client Details" : "Register New Client"}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <MdClose size={20} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Company / Client Name"
                fullWidth
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <TextField
                label="Primary Contact Person"
                fullWidth
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Monitored Lots"
                    type="number"
                    fullWidth
                    value={formData.locationsCount}
                    onChange={(e) => setFormData({ ...formData, locationsCount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="plan-tier-label">Plan Tier</InputLabel>
                    <Select
                      labelId="plan-tier-label"
                      value={formData.plan}
                      label="Plan Tier"
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    >
                      <MenuItem value="Starter">Starter</MenuItem>
                      <MenuItem value="Professional">Professional</MenuItem>
                      <MenuItem value="Enterprise">Enterprise</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      value={formData.status}
                      label="Status"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Trial">Trial</MenuItem>
                      <MenuItem value="Suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
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
              {editingClient ? "Save Changes" : "Create Client"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
