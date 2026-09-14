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
} from "@mui/material";
import {
  MdAdd,
  MdCreditCard,
  MdAttachMoney,
  MdAutorenew,
  MdCheckCircle,
  MdWarning,
  MdReceipt,
  MdClose,
  MdEdit,
  MdDelete,
  MdStar,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const planTiers = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    features: "Up to 2 Lots • Standard AI Vision • 99% Uptime",
    color: "#3B82F6",
  },
  {
    name: "Professional",
    price: "$799",
    period: "/month",
    features: "Up to 8 Lots • Real-time Telemetry • Smart Barrier API",
    color: "#FF007A",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$2,499",
    period: "/month",
    features: "Unlimited Lots • Dedicated SLA • Custom AI Models",
    color: "#A855F7",
  },
];

const initialSubscriptions = [
  {
    id: "SUB-801",
    client: "Apex Real Estate Group",
    plan: "Enterprise",
    billingCycle: "Annual",
    amount: "$29,988/yr",
    renewalDate: "15 Jan 2027",
    paymentMethod: "Bank Wire (ACH)",
    status: "Active",
  },
  {
    id: "SUB-802",
    client: "Metropolitan Airport Authority",
    plan: "Enterprise",
    billingCycle: "Annual",
    amount: "$54,000/yr",
    renewalDate: "02 Feb 2027",
    paymentMethod: "Corporate Billing",
    status: "Active",
  },
  {
    id: "SUB-803",
    client: "Westfield Retail Center",
    plan: "Professional",
    billingCycle: "Monthly",
    amount: "$799/mo",
    renewalDate: "18 Sep 2026",
    paymentMethod: "Mastercard •••• 5541",
    status: "Active",
  },
  {
    id: "SUB-804",
    client: "Silicon Valley Tech Hub",
    plan: "Starter",
    billingCycle: "Monthly",
    amount: "$299/mo",
    renewalDate: "05 Oct 2026",
    paymentMethod: "Visa •••• 4242",
    status: "Trial",
  },
  {
    id: "SUB-805",
    client: "Harbor View Hospital Complex",
    plan: "Professional",
    billingCycle: "Monthly",
    amount: "$799/mo",
    renewalDate: "20 Sep 2026",
    paymentMethod: "Visa •••• 8890",
    status: "Active",
  },
];

export default function Subscriptions() {
  const theme = useTheme();
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [openModal, setOpenModal] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  const [formData, setFormData] = useState({
    client: "",
    plan: "Professional",
    billingCycle: "Monthly",
    amount: "$799/mo",
    paymentMethod: "Visa •••• 4242",
    status: "Active",
  });

  const handleOpenAdd = () => {
    setEditingSub(null);
    setFormData({
      client: "",
      plan: "Professional",
      billingCycle: "Monthly",
      amount: "$799/mo",
      paymentMethod: "Credit Card",
      status: "Active",
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (sub) => {
    setEditingSub(sub);
    setFormData({ ...sub });
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Cancel this client subscription?")) {
      setSubscriptions(
        subscriptions.map((s) => (s.id === id ? { ...s, status: "Canceled" } : s))
      );
      toast.info("Subscription marked as canceled");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.client) {
      toast.error("Please enter client name");
      return;
    }

    if (editingSub) {
      setSubscriptions(
        subscriptions.map((s) => (s.id === editingSub.id ? { ...formData, id: s.id } : s))
      );
      toast.success("Subscription updated!");
    } else {
      const newId = `SUB-${Math.floor(800 + Math.random() * 90)}`;
      setSubscriptions([
        {
          ...formData,
          id: newId,
          renewalDate: "30 Days from now",
        },
        ...subscriptions,
      ]);
      toast.success("New subscription added!");
    }
    setOpenModal(false);
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
            Subscriptions & Billing
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            SaaS subscription packages, recurring revenue management, and plan tiers
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
          Add Subscription
        </Button>
      </Stack>

      {/* Pricing Tier Highlights */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {planTiers.map((tier, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: "16px",
                position: "relative",
                border: tier.popular ? "2px solid #2563EB" : "1px solid",
                borderColor: tier.popular ? "#2563EB" : alpha(tier.color, 0.2),
                boxShadow: tier.popular ? "0 8px 24px rgba(37, 99, 235, 0.12)" : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {tier.popular && (
                <Chip
                  label="MOST POPULAR"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "#2563EB",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.65rem",
                  }}
                />
              )}
              <Typography variant="h6" fontWeight={700} color={tier.color}>
                {tier.name}
              </Typography>
              <Stack direction="row" alignItems="baseline" sx={{ my: 1 }}>
                <Typography variant="h3" fontWeight={800}>
                  {tier.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tier.period}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary" display="block">
                {tier.features}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Subscriptions Table */}
      <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" fontWeight={700}>
            Active Client Subscriptions
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage renewals, automated billing, and plan tiers
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Client Account</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tier</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Cycle</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Next Renewal</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "8px",
                          bgcolor: alpha("#2563EB", 0.1),
                          color: "#2563EB",
                          fontWeight: 700,
                        }}
                      >
                        <MdCreditCard size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>
                          {sub.client}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sub.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sub.plan}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor:
                          sub.plan === "Enterprise"
                            ? alpha("#6366F1", 0.12)
                            : sub.plan === "Professional"
                            ? alpha("#2563EB", 0.12)
                            : alpha("#059669", 0.12),
                        color:
                          sub.plan === "Enterprise"
                            ? "#4F46E5"
                            : sub.plan === "Professional"
                            ? "#2563EB"
                            : "#059669",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{sub.billingCycle}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700}>
                      {sub.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{sub.renewalDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      {sub.paymentMethod}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sub.status}
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        fontWeight: 700,
                        bgcolor:
                          sub.status === "Active"
                            ? alpha("#10B981", 0.12)
                            : sub.status === "Trial"
                            ? alpha("#F59E0B", 0.12)
                            : alpha("#EF4444", 0.12),
                        color:
                          sub.status === "Active"
                            ? "#059669"
                            : sub.status === "Trial"
                            ? "#D97706"
                            : "#DC2626",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Edit Subscription">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEdit(sub)}
                          sx={{ color: "#3B82F6", "&:hover": { bgcolor: alpha("#3B82F6", 0.1) } }}
                        >
                          <MdEdit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel Subscription">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(sub.id)}
                          sx={{ color: "#EF4444", "&:hover": { bgcolor: alpha("#EF4444", 0.1) } }}
                        >
                          <MdDelete size={18} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add / Edit Subscription Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight={700}>
            {editingSub ? "Modify Subscription" : "Add Client Subscription"}
          </Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <MdClose size={20} />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Client Account"
                fullWidth
                required
                placeholder="e.g. Apex Real Estate Group"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sub-plan-label">Plan Tier</InputLabel>
                    <Select
                      labelId="sub-plan-label"
                      value={formData.plan}
                      label="Plan Tier"
                      onChange={(e) => {
                        const newPlan = e.target.value;
                        const defaultAmt =
                          newPlan === "Enterprise"
                            ? "$2,499/mo"
                            : newPlan === "Professional"
                            ? "$799/mo"
                            : "$299/mo";
                        setFormData({ ...formData, plan: newPlan, amount: defaultAmt });
                      }}
                    >
                      <MenuItem value="Starter">Starter ($299/mo)</MenuItem>
                      <MenuItem value="Professional">Professional ($799/mo)</MenuItem>
                      <MenuItem value="Enterprise">Enterprise ($2,499/mo)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sub-cycle-label">Billing Cycle</InputLabel>
                    <Select
                      labelId="sub-cycle-label"
                      value={formData.billingCycle}
                      label="Billing Cycle"
                      onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                    >
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Annual">Annual (15% Discount)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Rate / Fee"
                    fullWidth
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sub-status-label">Status</InputLabel>
                    <Select
                      labelId="sub-status-label"
                      value={formData.status}
                      label="Status"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Trial">Trial</MenuItem>
                      <MenuItem value="Past Due">Past Due</MenuItem>
                      <MenuItem value="Canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                label="Payment Method"
                fullWidth
                placeholder="e.g. Visa ending 4242 or Corporate Invoicing"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
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
              Save Subscription
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
