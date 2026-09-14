/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  MdEdit,
  MdDelete,
  MdPerson,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdPeople,
} from "react-icons/md";
import { useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSkeleton from "../../utils/TableSkeleton";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../Redux_app/slices/global";

const columns = [
  { id: "fullname", label: "Customer Details" },
  { id: "email", label: "Contact Information" },
  { id: "phonenumber", label: "Phone Number" },
  { id: "CreatedAt", label: "Joined Date" },
  { id: "actions", label: "Actions" },
];

export default function CustomerList() {
  const theme = useTheme();
  const [editUser, setEditUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [page, setPage] = useState(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { isLoading, All_users_data } = useSelector((state) => state.global);
  const totalCount = All_users_data?.totalCount || 0;

  useEffect(() => {
    dispatch(getAllUsers({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditUser(null);
    setEditOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      if (!editUser) return;

      const res = await dispatch(
        updateUser({ id: editUser._id, payload: editUser })
      );

      if (res.meta.requestStatus === "rejected") {
        const errorMessage =
          res.payload?.error || res.payload || "Failed to update user";
        toast.error(errorMessage);
      } else {
        toast.success("Customer updated successfully!");
        handleEditClose();
        dispatch(getAllUsers({ page: page + 1, limit: rowsPerPage }));
      }
    } catch (err) {
      toast.error("Network error: Unable to reach the server.");
      console.error("Error in handleEditSubmit:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      const res = await dispatch(deleteUser(id));

      if (res.meta.requestStatus === "rejected") {
        const errorMessage =
          res.payload?.error || res.payload || "Failed to delete customer.";
        toast.error(errorMessage);
      } else {
        toast.success("Customer deleted successfully!");
        dispatch(getAllUsers({ page: page + 1, limit: rowsPerPage }));
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error: Could not delete customer.");
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const renderSkeletonRows = (rows = 5, columns = 5) => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: columns }).map((__, colIndex) => (
          <TableCell key={colIndex} sx={{ py: 1 }}>
            <Box
              sx={{
                height: colIndex === 0 ? 40 : 20,
                bgcolor: alpha(theme.palette.grey[300], 0.3),
                borderRadius: 1,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box
      p={2}
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.02)} 0%, ${alpha(theme.palette.info.main, 0.02)} 100%)`,
        minHeight: "100vh",
      }}
    >
      <ToastContainer autoClose={3000} />

      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          overflow: "hidden",
          mb: 3,
          p: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdPeople size={24} color="white" />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 0.5,
              }}
            >
              Customer Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage registered customers
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Table Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          overflow: "hidden",
          boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
        }}
      >
        <TableContainer>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  background: `linear-gradient(90deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
                  "& th": {
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                    color: theme.palette.text.primary,
                    border: "none",
                    py: 2,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading
                ? renderSkeletonRows(rowsPerPage, columns.length)
                : All_users_data?.list?.map((item, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={item._id}>
                      <TableRow
                        sx={{
                          "&:hover": {
                            bgcolor: alpha(theme.palette.success.main, 0.03),
                            transform: "scale(1.001)",
                            boxShadow: `0 4px 20px ${alpha(theme.palette.success.main, 0.1)}`,
                          },
                          "& td": {
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                            transition: "all 0.2s ease",
                          },
                          cursor: "pointer",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {/* <Avatar 
                              sx={{ 
                                width: 45, 
                                height: 45,
                                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
                                fontSize: '0.875rem',
                                fontWeight: 600
                              }}
                            >
                              {getInitials(item.first_name, item.last_name)}
                            </Avatar> */}
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  mb: 0.25,
                                }}
                              >
                                {`${item.first_name} ${item.last_name}`}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontSize: "0.75rem",
                                }}
                              >
                                ID: {item._id.slice(-8)}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <MdEmail
                              size={16}
                              color={theme.palette.text.secondary}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.8125rem",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {item.email}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <MdPhone
                              size={16}
                              color={theme.palette.text.secondary}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.8125rem",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {item.phone_number}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <MdCalendarToday
                              size={16}
                              color={theme.palette.text.secondary}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.8125rem",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {new Date(item.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Edit Customer" arrow>
                              <IconButton
                                onClick={() => handleEditOpen(item)}
                                size="small"
                                sx={{
                                  p: 1,
                                  bgcolor: alpha(
                                    theme.palette.success.main,
                                    0.1
                                  ),
                                  color: theme.palette.success.main,
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.success.main,
                                      0.2
                                    ),
                                    transform: "scale(1.1)",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <MdEdit size={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Customer" arrow>
                              <IconButton
                                onClick={() => handleDelete(item._id)}
                                size="small"
                                sx={{
                                  p: 1,
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  color: theme.palette.error.main,
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.error.main,
                                      0.2
                                    ),
                                    transform: "scale(1.1)",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <MdDelete size={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          labelRowsPerPage="Rows per page:"
          sx={{
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            bgcolor: alpha(theme.palette.grey[50], 0.5),
            "& .MuiTablePagination-toolbar": {
              minHeight: 60,
              px: 3,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
          }}
        />
      </Paper>

      {/* Enhanced Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: `0 25px 50px ${alpha(theme.palette.common.black, 0.15)}`,
          },
        }}
      >
        {/* <DialogTitle
          sx={{
            pb: 1,
            fontSize: "1.5rem",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            mb: 2,
            border:11px o
          }}
        >
         
        </DialogTitle> */}
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 800,
            fontSize: "1.625rem",
            background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.info.main}, ${theme.palette.primary.main})`,
            backgroundSize: "200% 200%",
            animation: "gradient 3s ease infinite",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            letterSpacing: "0.5px",
            textShadow: `0 2px 10px ${alpha(theme.palette.success.main, 0.2)}`,
            "@keyframes gradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          👤 Edit Customer Details
        </Typography>
        <DialogContent sx={{ pb: 5, px: 3 }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name"
                value={editUser?.first_name || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, first_name: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: theme.palette.success.main,
                    },
                  },
                }}
              />
              <TextField
                label="Last Name"
                value={editUser?.last_name || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, last_name: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: theme.palette.success.main,
                    },
                  },
                }}
              />
            </Stack>

            <TextField
              label="Email Address"
              value={editUser?.email || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <MdEmail
                    style={{
                      marginRight: 8,
                      color: theme.palette.text.secondary,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: theme.palette.success.main,
                  },
                },
              }}
            />

            <TextField
              label="Phone Number"
              value={editUser?.phone_number || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, phone_number: e.target.value })
              }
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <MdPhone
                    style={{
                      marginRight: 8,
                      color: theme.palette.text.secondary,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: theme.palette.success.main,
                  },
                },
              }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleEditClose}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.25,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.9375rem",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                variant="contained"
                sx={{
                  px: 3.5,
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.9375rem",
                  bgcolor: "primary.main",
                  color: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
