/* eslint-disable */
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import AuthWrapper1 from "./AuthWrapper1";
import AuthCardWrapper from "./AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";

import nexoLvrLogo from "assets/NEXO_LVR.png";

// ================================|| PARKING AI - CLASSIC LOGIN ||================================ //

export default function Login() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: (theme) => theme.palette.mode === "dark" ? "#0B1329" : "#F4F6F8",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Grid sx={{ width: "100%", maxWidth: "460px" }}>
          <AuthCardWrapper>
            <Grid
              container
              spacing={2.5}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              {/* Brand Logo & Header */}
              <Grid size={12}>
                <Stack
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    mb: 1
                  }}
                >
                  {/* NEXO LVR Logo */}
                  <Box
                    component="img"
                    src={nexoLvrLogo}
                    alt="NEXO LVR"
                    sx={{
                      width: "100%",
                      maxWidth: 200,
                      maxHeight: 52,
                      objectFit: "contain",
                      display: "block",
                      mx: "auto",
                      filter: "invert(1) hue-rotate(180deg)",
                    }}
                  />

                  <Box sx={{ pt: 1 }}>
                    <Typography
                      variant={downMD ? "h4" : "h3"}
                      sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
                    >
                      Hi, Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
                      Enter your credentials to continue
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Auth Form */}
              <Grid size={12}>
                <AuthLogin />
              </Grid>

              {/* Classic Footer */}
              <Grid size={12}>
                <Divider sx={{ my: 1, borderColor: "divider" }} />
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  © 2026 Parking AI • All rights reserved
                </Typography>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}

