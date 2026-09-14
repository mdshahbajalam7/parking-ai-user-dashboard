/* eslint-disable */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";

// assets & icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useDispatch, useSelector } from "react-redux";
import { adminlogin } from "../../../Redux_app/slices/global";

// ===============================|| CLASSIC USER LOGIN FORM ||=============================== //

export default function AuthLogin() {
  const theme = useTheme();
  const [email, setEmail] = useState("user@parkingai.com");
  const [password, setPassword] = useState("user123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Quick fill user demo credentials
  const handleFillDemo = () => {
    setEmail("user@parkingai.com");
    setPassword("user123");
    toast.info("User demo filled: user@parkingai.com / user123");
  };

  // Handle sign in submission
  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both username/email and password");
      return;
    }

    const payload = { email, password, role: "user" };

    try {
      const resultAction = await dispatch(adminlogin({ payload }));

      if (adminlogin.fulfilled.match(resultAction)) {
        const formattedEmail = email.includes("@") ? email : `${email}@parkingai.com`;
        const formattedName =
          email === "user" || email === "user@parkingai.com"
            ? "Alex Morgan"
            : email.split("@")[0].toUpperCase();

        localStorage.setItem("userEmail", formattedEmail);
        localStorage.setItem("userName", formattedName);
        localStorage.setItem("userRole", "user");
        localStorage.setItem("loginTime", new Date().toLocaleString());

        toast.success(`Welcome back, ${formattedName}!`);
        navigate("/user/dashboard");
      } else {
        toast.error(resultAction.payload || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong during sign in!");
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Username / Email Input */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor="outlined-adornment-email-login">
          Email Address / Username
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email Address / Username"
          placeholder="user@parkingai.com"
          startAdornment={
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Password Input */}
      <FormControl fullWidth sx={{ mb: 2.5 }}>
        <InputLabel htmlFor="outlined-adornment-password-login">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          placeholder="••••••••"
          startAdornment={
            <InputAdornment position="start">
              <LockOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
                sx={{ color: "text.secondary" }}
              >
                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Classic Sign In Button */}
      <Box sx={{ mt: 0.5 }}>
        <AnimateButton>
          <Button
            disableElevation
            disabled={isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              py: 1.3,
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 700,
              textTransform: "none",
              letterSpacing: "0.3px",
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>
        </AnimateButton>
      </Box>

      {/* Classic Subtle Demo Hint */}
      <Box
        sx={{
          mt: 2.5,
          py: 1,
          px: 1.5,
          borderRadius: "8px",
          bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#F8FAFC",
          border: "1px solid",
          borderColor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "#E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.76rem" }}>
          Demo: <strong>user@parkingai.com</strong> / <strong>user123</strong>
        </Typography>
        <Button
          size="small"
          onClick={handleFillDemo}
          sx={{
            textTransform: "none",
            fontSize: "0.72rem",
            fontWeight: 700,
            p: 0,
            minWidth: "auto",
            color: "primary.main"
          }}
        >
          Auto Fill
        </Button>
      </Box>
    </Box>
  );
}
