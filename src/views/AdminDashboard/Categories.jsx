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
  Modal,
  Pagination,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Chip,
  Fade,
  Slide,
  Avatar,
  alpha,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete, MdAdd, MdCategory, MdImage } from "react-icons/md";
import { useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSkeleton from "../../utils/TableSkeleton";
import {
  createNewCategory,
  deleteSoftCategory,
  getAllCategories,
  getAllUsers,
  updateCategory,
} from "../../Redux_app/slices/global";

const columns = [
  { id: "category_id", label: "Category ID" },
  { id: "name", label: "Category Name" },
  { id: "description", label: "Description" },
  { id: "CreatedAt", label: "Created At" },
  { id: "actions", label: "Actions" },
];

export default function Categories() {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isEditable) {
      setFormData({
        name: user.name || "",
        description: user.description || "",
        image_url: user.image_url || "",
      });
    }
  }, [user]);

  const { isLoading, error, categories_list } = useSelector(
    (state) => state.global
  );
  const totalPages = categories_list?.totalPages || 1;
  const currentPage = categories_list?.currentPage || 1;

  useEffect(() => {
    dispatch(getAllCategories({ page }));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const resultAction = await dispatch(deleteSoftCategory({ id }));
        if (resultAction) {
          toast.success("Category deleted successfully!");
          await dispatch(getAllCategories({ page }));
        } else {
          toast.error(resultAction.payload || "Failed to delete category.");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.image_url) newErrors.image_url = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let result;

        if (searchParams.get("edit") && user.isEditable) {
          const updatedData = { ...formData };
          result = await dispatch(
            updateCategory({ id: user._id, payload: updatedData })
          );

          if (result.type.includes("fulfilled")) {
            toast.success("Category updated successfully!");
            await dispatch(getAllCategories({ page }));
            setOpenModal(false);
            setFormData({ name: "", description: "", image_url: "" });
            setUser({});
            setSearchParams({});
          } else {
            toast.error(result.payload || "Update failed");
          }
        } else {
          result = await dispatch(createNewCategory({ payload: formData }));

          if (result.type.includes("fulfilled")) {
            toast.success("Category created successfully!");
            await dispatch(getAllCategories({ page }));
            setOpenModal(false);
            setFormData({ name: "", description: "", image_url: "" });
            setUser({});
            setSearchParams({});
          } else {
            toast.error(result.payload || "Failed to create category");
          }
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: "", description: "", image_url: "" });
    setUser({});
    setSearchParams({});
    setErrors({});
  };

  const renderSkeletonRows = (rows = 5, columns = 5) => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: columns }).map((__, colIndex) => (
          <TableCell key={colIndex} sx={{ py: 1 }}>
            <Box
              sx={{
                height: colIndex === 0 ? 32 : 20,
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
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdCategory size={24} color="white" />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 0.5,
                }}
              >
                Categories Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage service categories and their properties
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={() => setOpenModal(true)}
            sx={{
              borderRadius: "8px",
              px: 2.5,
              py: 1,
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Create Category
          </Button>
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
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
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
                  <TableCell key={column.id} align={column.align || "left"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading
                ? renderSkeletonRows(5, 5)
                : categories_list?.data?.map((item, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={item._id}>
                      <TableRow
                        sx={{
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.03),
                            transform: "scale(1.001)",
                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
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
                          <Chip
                            label={item.category_id}
                            size="small"
                            sx={{
                              borderRadius: 2,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {/* <Avatar 
                              sx={{ 
                                width: 40, 
                                height: 40,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                fontSize: '0.875rem',
                                fontWeight: 600
                              }}
                            >
                              {item.name?.charAt(0)?.toUpperCase()}
                            </Avatar> */}
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                }}
                              >
                                {item.name}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2, maxWidth: 200 }}>
                          <Tooltip
                            title={item.description || ""}
                            placement="top"
                            arrow
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: theme.palette.text.secondary,
                                fontSize: "0.8125rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {item.description || "No description"}
                            </Typography>
                          </Tooltip>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
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
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Edit Category" arrow>
                              <IconButton
                                onClick={() => {
                                  setUser({ ...item, isEditable: true });
                                  setOpenModal(true);
                                  setSearchParams({ edit: true });
                                }}
                                size="small"
                                sx={{
                                  p: 1,
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  color: theme.palette.primary.main,
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
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
                            <Tooltip title="Delete Category" arrow>
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
      </Paper>

      {/* Enhanced Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
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
            fontSize: '1.5rem',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            mb: 2
          }}
        >
          {searchParams.get("edit") ? "📝 Edit Category" : "➕ Create New Category"}
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
          {searchParams.get("edit")
            ? "📝 Edit Category"
            : "➕ Create New Category"}
        </Typography>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                label="Category Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                error={Boolean(errors.description)}
                helperText={errors.description}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="Image URL"
                name="image_url"
                fullWidth
                value={formData.image_url}
                onChange={handleChange}
                error={Boolean(errors.image_url)}
                helperText={errors.image_url}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <MdImage
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
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={3}
              >
                <Button
                  onClick={handleCloseModal}
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
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 3.5,
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {searchParams.get("edit")
                    ? "Update Category"
                    : " Create Category"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
