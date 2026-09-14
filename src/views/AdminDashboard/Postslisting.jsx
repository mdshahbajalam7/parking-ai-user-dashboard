
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Chip,
  Fade,
  Slide,
  Avatar,
  Tooltip,
  alpha,
  useTheme,
} from "@mui/material";
import {
  MdEdit,
  MdDelete,
  MdLocationOn,
  MdCalendarToday,
  MdTrendingUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsByType,
  updatePostById,
  deletePostById,
} from "../../Redux_app/slices/global";

export default function Postslisting() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, postlisting, currentPage, totalCount } = useSelector(
    (state) => state.global
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(
      fetchPostsByType({ type: "listing", page: page + 1, limit: rowsPerPage })
    );
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setSelectedPost(null);
  };

  const handleEditSubmit = async () => {
    const { _id, ...payload } = selectedPost;
    await dispatch(updatePostById({ id: _id, payload }));
    handleEditClose();
    dispatch(
      fetchPostsByType({ type: "listing", page: page + 1, limit: rowsPerPage })
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePostById(id));
      dispatch(
        fetchPostsByType({
          type: "listing",
          page: page + 1,
          limit: rowsPerPage,
        })
      );
    }
  };

  const getPromotionChipColor = (type) => {
    const colors = {
      0: { color: "default", label: "Basic" },
      1: { color: "primary", label: "Premium" },
      2: { color: "secondary", label: "Featured" },
      3: { color: "success", label: "Sponsored" },
    };
    return colors[type] || colors[0];
  };

  const renderSkeletonRows = (rows = 5, columns = 7) => {
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: columns }).map((__, colIndex) => (
          <TableCell key={colIndex} sx={{ py: 1 }}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={colIndex === 0 ? 32 : 20}
              animation="wave"
              sx={{ borderRadius: 1 }}
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
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
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
            Posts Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and edit your posts with advanced controls
          </Typography>
        </Box>

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
                  },
                }}
              >
                <TableCell sx={{ py: 2, pl: 3 }}>Post Details</TableCell>
                <TableCell sx={{ py: 2 }}>Description</TableCell>
                <TableCell sx={{ py: 2 }}>Promotion</TableCell>
                <TableCell sx={{ py: 2 }}>Location</TableCell>
                <TableCell sx={{ py: 2 }}>Category</TableCell>
                <TableCell sx={{ py: 2 }}>Date Created</TableCell>
                <TableCell align="center" sx={{ py: 2, pr: 3, width: 120 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading
                ? renderSkeletonRows(5, 7)
                : postlisting?.list?.map((post, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={post._id}>
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
                        <TableCell sx={{ py: 2, pl: 3 }}>
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
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              {(post.title || "N").charAt(0).toUpperCase()}
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
                                {post.title || "Untitled Post"}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontSize: "0.75rem",
                                }}
                              >
                                ID: {post._id.slice(-8)}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2, maxWidth: 200 }}>
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
                            {post.description || "No description available"}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            icon={<MdTrendingUp size={16} />}
                            label={
                              getPromotionChipColor(post.promotionType).label
                            }
                            color={
                              getPromotionChipColor(post.promotionType).color
                            }
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 2,
                              fontWeight: 500,
                              "& .MuiChip-icon": { fontSize: 16 },
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <MdLocationOn
                              size={14}
                              color={theme.palette.text.secondary}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.8125rem",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {post.address?.city || "N/A"}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            label={post.type || "General"}
                            size="small"
                            sx={{
                              borderRadius: 2,
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              bgcolor: alpha(theme.palette.info.main, 0.1),
                              color: theme.palette.info.main,
                              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <MdCalendarToday
                              size={14}
                              color={theme.palette.text.secondary}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.8125rem",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                }
                              )}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center" sx={{ py: 2, pr: 3 }}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="center"
                          >
                            <Tooltip title="Edit Post" arrow>
                              <IconButton
                                onClick={() => handleEditClick(post)}
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
                            <Tooltip title="Delete Post" arrow>
                              <IconButton
                                onClick={() => handleDelete(post._id)}
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
          rowsPerPageOptions={[5, 10, 20, 50]}
          labelRowsPerPage="Rows per page"
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
        open={editModalOpen}
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
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            mb: 2,
          }}
        >
          ✏️ Edit Post
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
          Edit Post
        </Typography>
        <DialogContent sx={{ pb: 3, px: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Post Title"
              value={selectedPost?.title || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }
              fullWidth
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
              value={selectedPost?.description || ""}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost,
                  description: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
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
