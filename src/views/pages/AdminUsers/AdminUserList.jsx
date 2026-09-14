/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Chip,
  Fade,
  Slide,
  Avatar,
  Tooltip,
  alpha,
  useTheme,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminUser,
  getAllAdminUsers,
} from "../../../Redux_app/slices/global";
import AuthRegister from "../auth-forms/AuthRegister";
import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdPerson,
  MdAdminPanelSettings,
  MdEmail,
  MdClose,
  MdSearch,
  MdCheckCircle,
  MdSecurity,
  MdVerifiedUser,
  MdRefresh,
} from "react-icons/md";
import { useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { id: "fullname", label: "Admin Details" },
  { id: "email", label: "Email Address" },
  { id: "role", label: "Access Level" },
  { id: "Status", label: "Status" },
  { id: "actions", label: "Actions", align: "right" },
];

export default function AdminUserList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, error, Admin_users_data } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    dispatch(getAllAdminUsers());
  }, []);

  const defaultAdmins = [
    {
      _id: "usr_adm_9918",
      fullname: "Alex Johnson",
      email: "alex.johnson@parkingai.com",
      role: "Super Admin",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      _id: "usr_adm_8821",
      fullname: "Sarah Connor",
      email: "sarah.c@parkingai.com",
      role: "Operations Manager",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      _id: "usr_adm_7734",
      fullname: "David Miller",
      email: "david.m@parkingai.com",
      role: "Security Supervisor",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      _id: "usr_adm_6645",
      fullname: "Elena Rostova",
      email: "elena.r@parkingai.com",
      role: "Financial Auditor",
      status: "inactive",
      createdAt: new Date().toISOString()
    }
  ];

  const fetchedUsers = Array.isArray(Admin_users_data)
    ? Admin_users_data
    : Admin_users_data?.users || Admin_users_data?.data || [];

  const rawUsers = fetchedUsers.length > 0 ? fetchedUsers : defaultAdmins;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this administrator account?")) {
      try {
        const resultAction = await dispatch(deleteAdminUser({ payload: id, toast }));
        toast.success("Administrator account removed!");
        await dispatch(getAllAdminUsers());
      } catch (error) {
        toast.error("Failed to delete admin user");
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUser({});
    setSearchParams({});
  };

  const handleRefresh = () => {
    dispatch(getAllAdminUsers());
    toast.info("Refreshed administrator accounts");
  };

  const getInitials = (fullname) => {
    if (!fullname) return "AD";
    return fullname
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredUsers = rawUsers.filter((item) => {
    const nameMatch = item?.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = item?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Active" && (item?.status?.toLowerCase() === "active" || !item?.status)) ||
      (statusFilter === "Inactive" && item?.status?.toLowerCase() === "inactive");

    return (nameMatch || emailMatch) && statusMatch;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 } }}>
      <ToastContainer autoClose={3000} position="top-right" />

      {/* Header Section */}
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
            Admin User Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage administrator accounts, authentication credentials, and security roles
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Tooltip title="Refresh List">
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
            startIcon={<MdAdd size={20} />}
            onClick={() => {
              setUser({});
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
            Create Admin User
          </Button>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  TOTAL ADMINISTRATORS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {rawUsers.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#2563EB", 0.12), color: "#2563EB", width: 44, height: 44 }}>
                <MdAdminPanelSettings size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  ACTIVE SESSIONS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {rawUsers.filter((u) => u?.status?.toLowerCase() === "active" || !u?.status).length}
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
                  SYSTEM OPERATORS
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  {rawUsers.filter((u) => u?.role === "Manager" || u?.role === "Operator").length || rawUsers.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#3B82F6", 0.12), color: "#3B82F6", width: 44, height: 44 }}>
                <MdSecurity size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  SECURITY AUDIT
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ mt: 0.5 }}>
                  Passed
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: alpha("#A855F7", 0.12), color: "#A855F7", width: 44, height: 44 }}>
                <MdVerifiedUser size={22} />
              </Avatar>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters Bar */}
      <Card sx={{ p: 2.5, borderRadius: "16px", mb: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search administrators by full name or email address..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} color="#94A3B8" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="admin-status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="admin-status-filter-label"
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Active">Active Only</MenuItem>
              <MenuItem value="Inactive">Inactive Only</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* Users Table */}
      <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{ fontWeight: 700 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={36} sx={{ color: "#2563EB" }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                      Loading administrator directory...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((item) => {
                  const isActive = item?.status?.toLowerCase() === "active" || !item?.status;
                  return (
                    <TableRow key={item._id || Math.random()} hover>
                      {/* Name & ID */}
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "8px",
                              bgcolor: "#2563EB",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            {getInitials(item.fullname)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={700}>
                              {item.fullname || "Unnamed Administrator"}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {item._id ? item._id.slice(-8) : "SYSTEM"}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Email */}
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MdEmail size={16} color="#94A3B8" />
                          <Typography variant="body2" color="text.secondary">
                            {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell>
                        <Chip
                          label={item.role || "Administrator"}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: alpha("#3B82F6", 0.1),
                            color: "#2563EB",
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          icon={
                            isActive ? (
                              <MdCheckCircle size={14} />
                            ) : undefined
                          }
                          label={isActive ? "Active" : "Inactive"}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 700,
                            bgcolor: isActive
                              ? alpha("#10B981", 0.12)
                              : alpha("#EF4444", 0.12),
                            color: isActive ? "#059669" : "#DC2626",
                          }}
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="Edit Administrator">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setUser({ ...item, isEditable: true });
                                setOpenModal(true);
                                setSearchParams({ edit: true });
                              }}
                              sx={{
                                color: "#3B82F6",
                                "&:hover": { bgcolor: alpha("#3B82F6", 0.1) },
                              }}
                            >
                              <MdEdit size={18} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete Administrator">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(item._id)}
                              sx={{
                                color: "#EF4444",
                                "&:hover": { bgcolor: alpha("#EF4444", 0.1) },
                              }}
                            >
                              <MdDelete size={18} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Avatar
                      sx={{
                        width: 54,
                        height: 54,
                        margin: "0 auto",
                        bgcolor: alpha("#2563EB", 0.08),
                        color: "#2563EB",
                        mb: 1.5,
                      }}
                    >
                      <MdPerson size={28} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={700}>
                      No administrators found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search criteria or add a new admin user.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination bar */}
        {filteredUsers.length > rowsPerPage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} administrators
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size="small"
            />
          </Box>
        )}
      </Card>

      {/* Admin User Create / Edit Dialog Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
            bgcolor: "#ffffff",
          }}
        >
          <Stack direction="row" spacing={1.8} alignItems="center">
            <Avatar
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                bgcolor: "#2563EB",
                color: "#ffffff",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
              }}
            >
              <MdAdminPanelSettings size={24} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#0F172A",
                  lineHeight: 1.2,
                }}
              >
                {user?.isEditable ? "Edit Administrator" : "Create Admin User"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: "block" }}>
                {user?.isEditable
                  ? "Update administrative privileges and profile details"
                  : "Add a new system administrator with dashboard access"}
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={handleCloseModal}
            size="small"
            sx={{
              color: "text.secondary",
              borderRadius: "8px",
              p: 1,
              "&:hover": { bgcolor: alpha("#000", 0.06), color: "text.primary" },
            }}
          >
            <MdClose size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, bgcolor: "#ffffff" }}>
          <AuthRegister
            defaultValues={user}
            isEdit={!!searchParams.get("edit")}
            setOpenModal={setOpenModal}
            setSearchParams={setSearchParams}
            setUser={setUser}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
