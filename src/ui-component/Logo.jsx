/* eslint-disable */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import nexoLvrLogo from "assets/NEXO_LVR.png";

export default function Logo({ size = "medium" }) {
  const isSmall = size === "small";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      <Box
        component="img"
        src={nexoLvrLogo}
        alt="NEXO LVR"
        sx={{
          height: isSmall ? 26 : 32,
          width: "auto",
          objectFit: "contain",
          display: "block",
          filter: "invert(1) hue-rotate(180deg)",
        }}
      />
    </Box>
  );
}
