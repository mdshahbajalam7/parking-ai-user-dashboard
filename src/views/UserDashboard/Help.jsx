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
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  useTheme
} from "@mui/material";
import {
  IconHeadset,
  IconPhoneCall,
  IconMessageCircle,
  IconUserCheck,
  IconChevronDown,
  IconSend,
  IconClock,
  IconAlertTriangle,
  IconCheck,
  IconHelpCircle
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Help() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F8FAFC";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("ANPR Camera Issue");
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");

  const [tickets, setTickets] = useState([
    {
      id: "TICK-4921",
      subject: "South Gate Camera lens flare during afternoon sunset",
      category: "Camera Hardware",
      priority: "Normal",
      status: "In Progress",
      date: "Sep 12, 2026",
      statusColor: "#D97706",
      statusBg: "#FEF3C7"
    },
    {
      id: "TICK-4819",
      subject: "Requesting additional 500 visitor passes quota for corporate event",
      category: "Quota & Plans",
      priority: "High",
      status: "Resolved",
      date: "Sep 05, 2026",
      statusColor: "#16A34A",
      statusBg: "#DCFCE7"
    },
    {
      id: "TICK-4650",
      subject: "Inquiry regarding automated RFID reader webhook sync",
      category: "API & Webhooks",
      priority: "Low",
      status: "Resolved",
      date: "Aug 22, 2026",
      statusColor: "#16A34A",
      statusBg: "#DCFCE7"
    }
  ]);

  const faqs = [
    {
      q: "What happens if a vehicle plate is obscured or muddy?",
      a: "Our Vision AI system automatically performs edge-contrast enhancement and character confidence matching. If confidence is below 85%, the system captures an ultra-high-res snapshot and signals the manual override queue or prompts the driver to scan a visitor QR ticket."
    },
    {
      q: "Can the barrier still open if our internet goes offline?",
      a: "Yes! Your local Edge Gateway maintains a synchronized local whitelist database of registered vehicles and staff passes. It continues to process plates locally with zero downtime and uploads queued logs once the broadband link is restored."
    },
    {
      q: "How do I upgrade my license plate scan quotas?",
      a: "Go to the 'My plans' page in this dashboard. You can switch to the Enterprise tier with unlimited scans or purchase standalone quota add-on packs directly with your saved payment card."
    },
    {
      q: "How fast is the barrier trigger response time?",
      a: "The standard end-to-end latency from camera plate capture to relay trigger activation is approximately 120ms to 240ms, providing near-instant frictionless drive-through entry for whitelisted vehicles."
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Please enter both ticket subject and message description.");
      return;
    }

    const newTicket = {
      id: "TICK-" + Math.floor(1000 + Math.random() * 9000),
      subject,
      category,
      priority,
      status: "Open",
      date: "Just now",
      statusColor: "#2563EB",
      statusBg: "#DBEAFE"
    };

    setTickets([newTicket, ...tickets]);
    toast.success("Support ticket submitted! A specialist will review it shortly.");
    setSubject("");
    setMessage("");
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: textMain, fontSize: "1.8rem" }}>
          Help &amp; Customer Support
        </Typography>
        <Typography variant="body2" sx={{ color: textSub, mt: 0.5 }}>
          Get 24/7 technical assistance, submit support tickets, or contact your facility parking specialists.
        </Typography>
      </Box>

      {/* Emergency & Direct Contact Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDark ? "rgba(220, 38, 38, 0.2)" : "#FEE2E2", color: "#EF4444" }}>
                  <IconPhoneCall size={22} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: textMain }}>
                  Gate Emergency Line
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: textSub, fontSize: "0.85rem", mb: 2 }}>
                Critical barrier failure or vehicle blockage? Connect immediately to field dispatch.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={() => toast.info("Dispatching emergency support call: +1 (800) 555-PARK")}
              sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}
            >
              Call +1 (800) 555-PARK
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDark ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF", color: "#38BDF8" }}>
                  <IconMessageCircle size={22} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: textMain }}>
                  Live AI Support Chat
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: textSub, fontSize: "0.85rem", mb: 2 }}>
                Instant answers for camera troubleshooting, visitor ticketing, and tariff setups.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => toast.info("Connecting to AI Parking Support Assistant...")}
              sx={{ bgcolor: "#2563EB", borderRadius: "10px", fontWeight: 700, textTransform: "none" }}
            >
              Start Live Chat
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "18px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: "10px", bgcolor: isDark ? "rgba(124, 58, 237, 0.2)" : "#F5F3FF", color: "#A78BFA" }}>
                  <IconUserCheck size={22} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: textMain }}>
                  Account Manager
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: textSub, fontSize: "0.85rem", mb: 2 }}>
                Direct contact for custom multi-lot configurations and enterprise SLA requests.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => toast.info("Emailing Sarah Jenkins (Account Executive)")}
              sx={{
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                color: isDark ? "#C4B5FD" : "#7C3AED",
                borderColor: isDark ? "rgba(167, 139, 250, 0.3)" : "#DDD6FE"
              }}
            >
              Email Account Manager
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Ticket Creation & List Layout */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Create Ticket Form */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <IconSend size={22} color="#38BDF8" />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                Submit a Support Ticket
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: textSub, mb: 3 }}>
              Our certified engineering support team investigates and responds within 2 hours.
            </Typography>

            <Box component="form" onSubmit={handleSubmitTicket}>
              <Stack spacing={2.2}>
                <TextField
                  label="Subject"
                  placeholder="e.g. North Gate barrier sensor not resetting"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="ANPR Camera Issue">ANPR Camera Issue</MenuItem>
                      <MenuItem value="Barrier Gate Relay">Barrier Gate Relay</MenuItem>
                      <MenuItem value="Billing & Invoicing">Billing &amp; Invoicing</MenuItem>
                      <MenuItem value="Passes & Tickets">Passes &amp; Tickets</MenuItem>
                      <MenuItem value="API & Webhooks">API &amp; Webhooks</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Low">Low (General Inquiry)</MenuItem>
                      <MenuItem value="Normal">Normal (Standard)</MenuItem>
                      <MenuItem value="High">High (Impacting Traffic)</MenuItem>
                      <MenuItem value="Urgent">Urgent (Gate Locked)</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <TextField
                  label="Detailed Description"
                  placeholder="Describe what occurred, camera location, vehicle plate if applicable..."
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.3,
                    bgcolor: "#2563EB",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "12px",
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                    "&:hover": { bgcolor: "#1D4ED8" }
                  }}
                >
                  Send Support Request →
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Recent Tickets List */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: cardBg,
              border: cardBorder,
              height: "100%"
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <IconClock size={22} color={textSub} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
                My Recent Tickets
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: textSub, mb: 2.5 }}>
              Track progress, responses, and resolution status for your inquiries.
            </Typography>

            <Stack spacing={2}>
              {tickets.map((t) => (
                <Box
                  key={t.id}
                  sx={{
                    p: 2,
                    borderRadius: "14px",
                    bgcolor: innerBg,
                    border: innerBorder,
                    transition: "all 0.2s ease",
                    "&:hover": { borderColor: isDark ? "rgba(255,255,255,0.2)" : "#CBD5E1" }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" sx={{ fontWeight: 800, color: "#38BDF8" }}>
                        {t.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: textSub }}>• {t.date}</Typography>
                    </Stack>
                    <Chip
                      label={t.status}
                      size="small"
                      sx={{
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.1)" : t.statusBg,
                        color: t.statusColor,
                        fontWeight: 700,
                        fontSize: "0.72rem"
                      }}
                    />
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: textMain, mb: 0.8 }}>
                    {t.subject}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={t.category} size="small" sx={{ bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0", color: textMain, fontSize: "0.68rem" }} />
                    <Chip label={`Priority: ${t.priority}`} size="small" sx={{ bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "#F1F5F9", color: textSub, fontSize: "0.68rem" }} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Frequently Asked Questions */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "20px",
          bgcolor: cardBg,
          border: cardBorder
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
          <IconHelpCircle size={22} color="#38BDF8" />
          <Typography variant="h5" sx={{ fontWeight: 800, color: textMain }}>
            Frequently Asked Questions
          </Typography>
        </Stack>

        <Box>
          {faqs.map((f, i) => (
            <Accordion
              key={i}
              elevation={0}
              sx={{
                mb: 1,
                bgcolor: innerBg,
                border: innerBorder,
                borderRadius: "12px !important",
                "&:before": { display: "none" }
              }}
            >
              <AccordionSummary expandIcon={<IconChevronDown size={20} color={textSub} />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: textMain }}>
                  {f.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, color: textSub, fontSize: "0.88rem", lineHeight: 1.6 }}>
                {f.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
