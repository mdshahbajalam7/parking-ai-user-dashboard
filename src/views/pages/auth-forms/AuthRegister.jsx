/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdAdminPanelSettings,
  MdCheckCircle,
  MdCancel,
  MdSecurity,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  adminregister,
  getAllAdminUsers,
  updateAdminUser,
} from "../../../Redux_app/slices/global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthRegister({
  defaultValues = {},
  isEdit = false,
  setOpenModal,
  setSearchParams,
  setUser,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Admin",
    status: "active",
    ...defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      role: "Admin",
      status: "active",
      ...defaultValues,
    });
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setOpenModal(false);
    setUser && setUser({});
    setSearchParams && setSearchParams({});
  };

  const handleRegister = async (e) => {
    e && e.preventDefault();

    if (!formData.fullname?.trim()) {
      toast.error("Please enter the user's full name");
      return;
    }

    if (!formData.email?.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isEdit && (!formData.password || formData.password.length < 6)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);

    if (isEdit && formData._id) {
      try {
        const response = await dispatch(
          updateAdminUser({ id: formData._id, data: formData, toast })
        );

        if (response?.meta?.requestStatus === "fulfilled" || response) {
          toast.success("Admin user updated successfully!");
          await dispatch(getAllAdminUsers());
          handleCancel();
        } else {
          toast.success("Admin user updated successfully!");
          await dispatch(getAllAdminUsers());
          handleCancel();
        }
      } catch (err) {
        toast.error("Something went wrong while updating");
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    } else {
      const payloadUsers = {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      try {
        const resultAction = await dispatch(
          adminregister({ payload: payloadUsers, toast })
        );

        if (resultAction?.meta?.requestStatus === "fulfilled" || resultAction) {
          toast.success("Admin user registered successfully!");
          await dispatch(getAllAdminUsers());
          handleCancel();
        } else {
          toast.success("Admin user registered successfully!");
          await dispatch(getAllAdminUsers());
          handleCancel();
        }
      } catch (err) {
        toast.error("Something went wrong with registration!");
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ width: "100%", pt: 1 }}>
      <ToastContainer autoClose={3000} position="top-right" />

      <Stack spacing={2.5}>
        {/* Full Name field */}
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.secondary", mb: 0.8, display: "block" }}
          >
            FULL NAME <span style={{ color: "#DC2626" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            required
            name="fullname"
            placeholder="e.g. Alexander Mitchell"
            value={formData.fullname || ""}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: alpha("#2563EB", 0.08),
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdPerson size={18} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#f8fafc",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#ffffff",
                  borderColor: "#2563EB",
                },
                "&.Mui-focused": {
                  bgcolor: "#ffffff",
                  boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)",
                },
              },
            }}
          />
        </Box>

        {/* Email Address field */}
        <Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.secondary", mb: 0.8, display: "block" }}
          >
            EMAIL ADDRESS <span style={{ color: "#DC2626" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            required
            type="email"
            name="email"
            placeholder="e.g. alex.mitchell@parkingai.com"
            value={formData.email || ""}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: alpha("#2563EB", 0.08),
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdEmail size={18} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#f8fafc",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#ffffff",
                  borderColor: "#2563EB",
                },
                "&.Mui-focused": {
                  bgcolor: "#ffffff",
                  boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)",
                },
              },
            }}
          />
        </Box>

        {/* Password field (shown for create, or optional for edit) */}
        {!isEdit ? (
          <Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary", mb: 0.8, display: "block" }}
            >
              SECURITY PASSWORD <span style={{ color: "#DC2626" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              required
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter secure password (min. 6 chars)"
              value={formData.password || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        bgcolor: alpha("#2563EB", 0.08),
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MdLock size={18} />
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  bgcolor: "#f8fafc",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#ffffff",
                    borderColor: "#2563EB",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#ffffff",
                    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)",
                  },
                },
              }}
            />
          </Box>
        ) : (
          /* Status & Role row for edit */
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "text.secondary", mb: 0.8, display: "block" }}
              >
                ACCOUNT STATUS
              </Typography>
              <FormControl fullWidth size="medium">
                <Select
                  name="status"
                  value={formData.status || "active"}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                >
                  <MenuItem value="active">
                    <Chip
                      icon={<MdCheckCircle size={14} />}
                      label="Active"
                      size="small"
                      sx={{
                        bgcolor: alpha("#10B981", 0.12),
                        color: "#059669",
                        fontWeight: 700,
                      }}
                    />
                  </MenuItem>
                  <MenuItem value="inactive">
                    <Chip
                      icon={<MdCancel size={14} />}
                      label="Inactive"
                      size="small"
                      sx={{
                        bgcolor: alpha("#EF4444", 0.12),
                        color: "#DC2626",
                        fontWeight: 700,
                      }}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "text.secondary", mb: 0.8, display: "block" }}
              >
                ROLE PERMISSIONS
              </Typography>
              <FormControl fullWidth size="medium">
                <Select
                  name="role"
                  value={formData.role || "Admin"}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                  }}
                >
                  <MenuItem value="Admin">Administrator</MenuItem>
                  <MenuItem value="Manager">Facility Manager</MenuItem>
                  <MenuItem value="Viewer">Auditor / Viewer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {/* Security / Info Banner */}
        <Box
          sx={{
            p: 1.8,
            borderRadius: "12px",
            bgcolor: alpha("#A855F7", 0.05),
            border: "1px dashed",
            borderColor: alpha("#A855F7", 0.25),
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: alpha("#2563EB", 0.1),
              color: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <MdSecurity size={18} />
          </Box>
          <Typography variant="caption" color="text.secondary" lineHeight={1.4}>
            {isEdit
              ? "Modifying this profile grants access to parking telemetry, reports, and administrative lot operations."
              : "New admin accounts will receive secure dashboard permissions to manage parking lots, clients, and analytics."}
          </Typography>
        </Box>

        {/* Actions Button Row */}
        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ pt: 1.5 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            disabled={submitting}
            sx={{
              borderRadius: "8px",
              color: "text.secondary",
              borderColor: "divider",
              px: 3,
              py: 0.9,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#cbd5e1",
                bgcolor: "#f1f5f9",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={
              submitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <MdAdminPanelSettings size={18} />
              )
            }
            sx={{
              bgcolor: "#2563EB",
              color: "#ffffff",
              borderRadius: "8px",
              px: 3.5,
              py: 0.9,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 1px 3px rgba(37, 99, 235, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#1D4ED8",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
              },
            }}
          >
            {submitting
              ? "Processing..."
              : isEdit
              ? "Update Administrator"
              : "Create Admin User"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
