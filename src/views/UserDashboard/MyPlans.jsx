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
  LinearProgress,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  IconCheck,
  IconSparkles,
  IconShieldCheck,
  IconCpu,
  IconCamera,
  IconScan,
  IconCloudUpload,
  IconHelpCircle,
  IconBolt,
  IconArrowRight
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyPlans() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const cardBg = isDark ? "#1E293B" : "#FFFFFF";
  const cardBorder = isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid #E2E8F0";
  const textMain = isDark ? "#F8FAFC" : "#0F172A";
  const textSub = isDark ? "#94A3B8" : "#64748B";
  const innerBg = isDark ? "#0F172A" : "#F1F5F9";
  const innerBorder = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #E2E8F0";

  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro Facility");
  const [openModal, setOpenModal] = useState(false);
  const [targetPlan, setTargetPlan] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Facility",
      price: yearly ? 24 : 29,
      period: "/month",
      billingNote: yearly ? "Billed $288 annually (Save 18%)" : "Billed monthly",
      description: "Ideal for small independent lots and single-gate parking areas.",
      isCurrent: selectedPlan === "Starter Facility",
      popular: false,
      color: "#0284C7",
      features: [
        "Up to 3 ANPR Camera Feeds",
        "1,000 License Plate Scans / day",
        "Single Entrance / Exit Barrier Control",
        "Basic Entry/Exit Vehicle Logs (7 days)",
        "Standard Email Support (24-48h SLA)"
      ],
      disabledFeatures: [
        "AI Vehicle Make/Color Recognition",
        "Automated VIP Whitelist Whitelist",
        "Real-time Gate Sensor Telemetry",
        "Dedicated Account Specialist"
      ]
    },
    {
      id: "pro",
      name: "Pro Facility",
      price: yearly ? 64 : 79,
      period: "/month",
      billingNote: yearly ? "Billed $768 annually (Save 20%)" : "Billed monthly",
      description: "Complete AI computer vision & automated barrier control for active parking venues.",
      isCurrent: selectedPlan === "Pro Facility",
      popular: true,
      color: "#2563EB",
      features: [
        "Up to 10 High-Speed ANPR Cameras",
        "10,000 License Plate Scans / day",
        "Multi-Barrier Smart Gate Automation",
        "AI Vehicle Classifier (Cars, SUVs, Trucks)",
        "Full 90-Day Cloud Audit Logs & Video Clips",
        "Automated VIP Whitelisting & Blacklisting",
        "Priority Support with 2-Hour Response Time"
      ],
      disabledFeatures: [
        "Dedicated Account Specialist & Custom API Hooks"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Ultra",
      price: yearly ? 159 : 199,
      period: "/month",
      billingNote: yearly ? "Billed $1,908 annually (Save 20%)" : "Billed monthly",
      description: "High-throughput smart parking hubs, airports, malls & multi-location franchises.",
      isCurrent: selectedPlan === "Enterprise Ultra",
      popular: false,
      color: "#7C3AED",
      features: [
        "Unlimited ANPR Cameras & Multi-Lot Linking",
        "Unlimited Plate Scans & Edge Compute Sync",
        "Zero-Latency ANPR (<80ms plate recognition)",
        "Automated Payment Terminal & RFID Integrations",
        "Custom Webhooks & REST API Access",
        "Dedicated 24/7 Priority Emergency Hotline",
        "Designated Customer Success Manager",
        "99.99% Uptime Enterprise SLA Guarantee"
      ],
      disabledFeatures: []
    }
  ];

  const handleOpenUpgrade = (plan) => {
    setTargetPlan(plan);
    setOpenModal(true);
  };

  const handleConfirmPlanChange = () => {
    if (targetPlan) {
      setSelectedPlan(targetPlan.name);
      toast.success(`Successfully switched to ${targetPlan.name} plan!`);
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Banner */}
      <Card
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          mb: 3.5,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(37, 99, 235, 0) 70%)",
            pointerEvents: "none"
          }}
        />

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                icon={<IconShieldCheck size={16} color="#38BDF8" />}
                label="ACTIVE SUBSCRIPTION"
                size="small"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.15)",
                  color: "#38BDF8",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.5px"
                }}
              />
              <Chip
                label="Auto-renews on Oct 14, 2026"
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                  color: "#94A3B8",
                  fontSize: "0.72rem"
                }}
              />
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "1.9rem" }, mb: 1 }}>
              {selectedPlan} Tier
            </Typography>
            <Typography variant="body2" sx={{ color: "#94A3B8", maxWidth: 540, lineHeight: 1.6 }}>
              Your smart parking facility is operating with high-speed ANPR computer vision and multi-gate automation enabled.
            </Typography>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                p: 2.2
              }}
            >
              <Typography variant="caption" sx={{ color: "#94A3B8", textTransform: "uppercase", fontWeight: 700 }}>
                Active Quota Utilization
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#E2E8F0" }}>ANPR Camera Feeds</Typography>
                    <Typography variant="caption" sx={{ color: "#38BDF8", fontWeight: 700 }}>8 / 10 Active</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={80} sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#38BDF8" } }} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#E2E8F0" }}>Daily Plate Scans</Typography>
                    <Typography variant="caption" sx={{ color: "#60A5FA", fontWeight: 700 }}>3,420 / 10,000</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={34.2} sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#60A5FA" } }} />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Plan Switching Header & Toggle */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: textMain, fontSize: "1.4rem" }}>
            Available Subscription Tiers
          </Typography>
          <Typography variant="body2" sx={{ color: textSub, mt: 0.5 }}>
            Upgrade or scale your plan dynamically as your parking footprint grows.
          </Typography>
        </Box>

        {/* Toggle Billing Term */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: innerBg,
            px: 2,
            py: 0.7,
            borderRadius: "12px",
            border: innerBorder
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: !yearly ? 700 : 500, color: !yearly ? textMain : textSub }}>
            Monthly
          </Typography>
          <Switch
            checked={yearly}
            onChange={(e) => setYearly(e.target.checked)}
            color="primary"
            sx={{ mx: 1 }}
          />
          <Typography variant="body2" sx={{ fontWeight: yearly ? 700 : 500, color: yearly ? textMain : textSub }}>
            Yearly
          </Typography>
          <Chip
            label="Save 20%"
            size="small"
            sx={{
              ml: 1,
              bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "#DCFCE7",
              color: isDark ? "#4ADE80" : "#166534",
              fontWeight: 800,
              fontSize: "0.68rem"
            }}
          />
        </Box>
      </Stack>

      {/* Pricing Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {plans.map((plan) => {
          const isCurrent = plan.isCurrent;
          return (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: cardBg,
                  border: isCurrent
                    ? "2px solid #2563EB"
                    : cardBorder,
                  boxShadow: isCurrent
                    ? "0 20px 30px -10px rgba(37, 99, 235, 0.25)"
                    : isDark ? "none" : "0 4px 12px rgba(15, 23, 42, 0.04)",
                  position: "relative",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: isDark ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)" : "0 20px 25px -5px rgba(15, 23, 42, 0.1)"
                  }
                }}
              >
                {/* Popular / Active Badge */}
                {isCurrent && (
                  <Chip
                    label="CURRENT ACTIVE PLAN"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "#2563EB",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.68rem"
                    }}
                  />
                )}
                {!isCurrent && plan.popular && (
                  <Chip
                    icon={<IconSparkles size={14} color="#fff" />}
                    label="MOST POPULAR"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "#7C3AED",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.68rem"
                    }}
                  />
                )}

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: textMain, mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSub, minHeight: 40, fontSize: "0.85rem", mb: 2 }}>
                    {plan.description}
                  </Typography>

                  {/* Price */}
                  <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 0.5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: textMain, fontSize: "2.3rem" }}>
                      ${plan.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textSub, fontWeight: 600 }}>
                      {plan.period}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: textSub, display: "block", mb: 3 }}>
                    {plan.billingNote}
                  </Typography>

                  <Divider sx={{ mb: 2.5, borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "#F1F5F9" }} />

                  {/* Feature Checklist */}
                  <Typography variant="caption" sx={{ color: textSub, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Included Features:
                  </Typography>
                  <List dense sx={{ py: 1 }}>
                    {plan.features.map((feat, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 26, color: "#16A34A" }}>
                          <IconCheck size={18} stroke={2.5} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feat}
                          primaryTypographyProps={{ fontSize: "0.82rem", color: isDark ? "#E2E8F0" : "#334155", fontWeight: 500 }}
                        />
                      </ListItem>
                    ))}
                    {plan.disabledFeatures.map((feat, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 0.5, opacity: 0.45 }}>
                        <ListItemIcon sx={{ minWidth: 26, color: textSub }}>
                          <IconCheck size={18} stroke={1.5} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feat}
                          primaryTypographyProps={{ fontSize: "0.82rem", color: textSub, textDecoration: "line-through" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Action CTA */}
                <Box sx={{ mt: 3 }}>
                  {isCurrent ? (
                    <Button
                      fullWidth
                      variant="outlined"
                      disabled
                      sx={{
                        py: 1.2,
                        borderRadius: "12px",
                        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#CBD5E1",
                        color: textSub,
                        fontWeight: 700,
                        textTransform: "none"
                      }}
                    >
                      Currently Active
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenUpgrade(plan)}
                      sx={{
                        py: 1.2,
                        borderRadius: "12px",
                        bgcolor: plan.popular ? "#7C3AED" : "#2563EB",
                        color: "#fff",
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                        "&:hover": {
                          bgcolor: plan.popular ? "#6D28D9" : "#1D4ED8"
                        }
                      }}
                    >
                      Switch to {plan.name} →
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Confirmation Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px", p: 1, bgcolor: cardBg, color: textMain, border: cardBorder } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.2rem", color: textMain }}>
          Confirm Subscription Change
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: textSub, mb: 2 }}>
            Are you sure you want to change your parking plan to <strong>{targetPlan?.name}</strong> at <strong>${targetPlan?.price}/month</strong>?
          </Typography>
          <Box sx={{ p: 2, bgcolor: innerBg, borderRadius: "12px", border: innerBorder }}>
            <Typography variant="caption" sx={{ color: isDark ? "#CBD5E1" : "#334155", display: "block" }}>
              • Immediate access to updated camera slots &amp; scan quotas.
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#CBD5E1" : "#334155", display: "block", mt: 0.5 }}>
              • Prorated difference will be calculated on your next billing statement.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: textSub, fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPlanChange}
            variant="contained"
            sx={{ bgcolor: "#2563EB", fontWeight: 700, borderRadius: "10px", px: 2.5 }}
          >
            Confirm &amp; Update Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
