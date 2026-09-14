/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { IconLogout } from '@tabler/icons-react';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    navigate("/auth/sign-in"); // Redirect to the login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        width: "100%",
      }}
    >
      <Button
        variant="outlined"
        color="error"
        startIcon={<IconLogout size={20} />}
        onClick={handleLogout}
        sx={{
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 500,
          px: 3,
          py: 1.5,
          borderRadius: "12px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
