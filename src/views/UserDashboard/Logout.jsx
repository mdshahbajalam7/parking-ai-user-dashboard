/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, CircularProgress, Stack, Button } from "@mui/material";
import { IconLogout, IconCheck } from "@tabler/icons-react";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginTime");

    const timer = setTimeout(() => {
      navigate("/auth/sign-in", { replace: true });
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        p: 3
      }}
    >
      <Card
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "24px",
          bgcolor: "#ffffff",
          border: "1px solid #E2E8F0",
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.08)"
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563EB"
            }}
          >
            <IconLogout size={32} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Signing Out...
          </Typography>

          <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.6 }}>
            Thank you for using Parking AI. Your session has been safely closed. Redirecting to User Sign In...
          </Typography>

          <CircularProgress size={32} sx={{ color: "#2563EB" }} />

          <Button
            variant="text"
            onClick={() => navigate("/auth/sign-in", { replace: true })}
            sx={{ color: "#2563EB", fontWeight: 700, textTransform: "none", fontSize: "0.85rem" }}
          >
            Click here if you are not redirected automatically
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
