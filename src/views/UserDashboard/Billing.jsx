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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  useTheme
} from "@mui/material";
import {
  IconCreditCard,
  IconReceipt,
  IconDownload,
  IconPlus,
  IconCheck,
  IconClock,
  IconBuildingBank,
  IconShieldLock,
  IconDotsVertical,
  IconCircleCheck
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Billing() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [openCardModal, setOpenCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const [cards, setCards] = useState([
    {
      id: "card-1",
      type: "Visa",
      last4: "4242",
      expiry: "08/29",
      holder: "ALEX MORGAN",
      isDefault: true,
      color: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
    },
    {
      id: "card-2",
      type: "Mastercard",
      last4: "8891",
      expiry: "11/27",
      holder: "ALEX MORGAN",
      isDefault: false,
      color: "linear-gradient(135deg, #0F172A 0%, #334155 100%)"
    }
  ]);

  const [invoices, setInvoices] = useState([
    { id: "INV-2026-0914", date: "Sep 14, 2026", description: "Pro Facility Plan - Monthly", amount: "$79.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-0814", date: "Aug 14, 2026", description: "Pro Facility Plan - Monthly", amount: "$79.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-0714", date: "Jul 14, 2026", description: "Pro Facility Plan - Monthly", amount: "$79.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-0614", date: "Jun 14, 2026", description: "Pro Facility Plan - Monthly", amount: "$79.00", status: "Paid", method: "Visa •••• 4242" },
    { id: "INV-2026-0514", date: "May 14, 2026", description: "Pro Facility Plan - Monthly", amount: "$79.00", status: "Paid", method: "Mastercard •••• 8891" },
    { id: "INV-2026-0414", date: "Apr 14, 2026", description: "Starter Facility Plan", amount: "$29.00", status: "Paid", method: "Mastercard •••• 8891" }
  ]);

  const handleDownloadInvoice = (inv) => {
    toast.info(`Downloading PDF receipt for invoice #${inv.id}...`);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvc || !cardholderName) {
      toast.error("Please fill in all card details.");
      return;
    }

    const lastDigits = cardNumber.slice(-4) || "9012";
    const newCard = {
      id: "card-" + Date.now(),
      type: "Visa",
      last4: lastDigits,
      expiry: cardExpiry,
      holder: cardholderName.toUpperCase(),
      isDefault: false,
      color: "linear-gradient(135deg, #047857 0%, #10B981 100%)"
    };

    setCards([...cards, newCard]);
    toast.success(`Payment method •••• ${lastDigits} added successfully!`);
    setOpenCardModal(false);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardholderName("");
  };

  const handleSetDefault = (cardId) => {
    setCards(cards.map(c => ({ ...c, isDefault: c.id === cardId })));
    toast.success("Default payment method updated!");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: textMain, fontSize: "1.8rem" }}>
          Billing &amp; Invoices
        </Typography>
        <Typography variant="body2" sx={{ color: textSub, mt: 0.5 }}>
          Manage your payment methods, recurring charges, and download official tax receipts.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Typography variant="caption" sx={{ color: textSub, fontWeight: 700, textTransform: "uppercase" }}>
              Current Balance Due
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#4ADE80" : "#16A34A", my: 1, fontSize: "1.8rem" }}>
              $0.00
            </Typography>
            <Chip
              icon={<IconCircleCheck size={14} color={isDark ? "#4ADE80" : "#166534"} />}
              label="Account in Good Standing"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
                color: isDark ? "#4ADE80" : "#166534",
                fontWeight: 700,
                fontSize: "0.72rem"
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Typography variant="caption" sx={{ color: textSub, fontWeight: 700, textTransform: "uppercase" }}>
              Next Scheduled Invoice
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: textMain, my: 1, fontSize: "1.8rem" }}>
              $79.00
            </Typography>
            <Typography variant="caption" sx={{ color: textSub }}>
              Due on Oct 14, 2026 via Auto-pay
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Typography variant="caption" sx={{ color: textSub, fontWeight: 700, textTransform: "uppercase" }}>
              Total YTD Spend
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#38BDF8", my: 1, fontSize: "1.8rem" }}>
              $424.00
            </Typography>
            <Typography variant="caption" sx={{ color: textSub }}>
              6 invoices processed successfully
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Typography variant="caption" sx={{ color: textSub, fontWeight: 700, textTransform: "uppercase" }}>
              Tax ID / VAT
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: textMain, my: 1, fontSize: "1.1rem" }}>
              US-EIN-94821034
            </Typography>
            <Chip
              label="Verified Corporate Entity"
              size="small"
              sx={{
                bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF",
                color: isDark ? "#60A5FA" : "#1D4ED8",
                fontWeight: 700,
                fontSize: "0.72rem"
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Payment Methods Section */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: cardBg,
          border: cardBorder,
          mb: 4
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
              Saved Payment Methods
            </Typography>
            <Typography variant="body2" sx={{ color: textSub, mt: 0.3 }}>
              Cards charged automatically for monthly license and ANPR vision services.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={() => setOpenCardModal(true)}
            sx={{
              bgcolor: "#2563EB",
              fontWeight: 700,
              borderRadius: "10px",
              textTransform: "none",
              px: 2
            }}
          >
            Add New Card
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background: card.color,
                  color: "#ffffff",
                  position: "relative",
                  boxShadow: "0 10px 20px -5px rgba(15, 23, 42, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 180
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: "1px" }}>
                    {card.type.toUpperCase()}
                  </Typography>
                  {card.isDefault ? (
                    <Chip
                      label="DEFAULT"
                      size="small"
                      sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 800, fontSize: "0.68rem" }}
                    />
                  ) : (
                    <Button
                      size="small"
                      onClick={() => handleSetDefault(card.id)}
                      sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.72rem", textTransform: "none", p: 0 }}
                    >
                      Make Default
                    </Button>
                  )}
                </Stack>

                <Typography variant="h5" sx={{ letterSpacing: "3px", fontWeight: 700, my: 2 }}>
                  •••• •••• •••• {card.last4}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, fontSize: "0.65rem", display: "block" }}>
                      CARD HOLDER
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                      {card.holder}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ opacity: 0.7, fontSize: "0.65rem", display: "block" }}>
                      EXPIRES
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                      {card.expiry}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Invoice History Table */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "20px",
          bgcolor: cardBg,
          border: cardBorder,
          overflow: "hidden"
        }}
      >
        <Box sx={{ p: 3, borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0" }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
            Invoices &amp; Payment History
          </Typography>
          <Typography variant="body2" sx={{ color: textSub, mt: 0.3 }}>
            Download signed PDF tax receipts and inspect automated charge records.
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: innerBg }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Invoice ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: textSub, borderColor: innerBorder }}>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id} hover sx={{ "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.03)" : undefined } }}>
                  <TableCell sx={{ fontWeight: 700, color: textMain, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{inv.id}</TableCell>
                  <TableCell sx={{ color: textSub, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{inv.date}</TableCell>
                  <TableCell sx={{ color: isDark ? "#E2E8F0" : "#334155", fontWeight: 500, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{inv.description}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: textMain, borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{inv.amount}</TableCell>
                  <TableCell sx={{ color: textSub, fontSize: "0.82rem", borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>{inv.method}</TableCell>
                  <TableCell sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>
                    <Chip
                      label={inv.status}
                      size="small"
                      sx={{
                        bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
                        color: isDark ? "#4ADE80" : "#166534",
                        fontWeight: 700,
                        fontSize: "0.72rem"
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9" }}>
                    <Button
                      size="small"
                      startIcon={<IconDownload size={14} />}
                      onClick={() => handleDownloadInvoice(inv)}
                      sx={{
                        color: "#38BDF8",
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "0.8rem"
                      }}
                    >
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add Card Modal */}
      <Dialog
        open={openCardModal}
        onClose={() => setOpenCardModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px", p: 1, bgcolor: cardBg, color: textMain, border: cardBorder } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.2rem", color: textMain }}>
          Add Payment Card
        </DialogTitle>
        <Box component="form" onSubmit={handleAddCard}>
          <DialogContent>
            <Stack spacing={2.2}>
              <TextField
                label="Cardholder Full Name"
                placeholder="Alex Morgan"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                fullWidth
                size="small"
                required
              />
              <TextField
                label="Card Number"
                placeholder="4242 •••• •••• 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
                size="small"
                required
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Expires (MM/YY)"
                  placeholder="08/29"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />
                <TextField
                  label="CVC / CVV"
                  placeholder="123"
                  type="password"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenCardModal(false)} sx={{ color: textSub, fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#2563EB", fontWeight: 700, borderRadius: "10px", px: 2.5 }}
            >
              Save Payment Method
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
