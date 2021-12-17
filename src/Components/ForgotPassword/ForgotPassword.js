import * as React from "react";
import { useHistory } from "react-router-dom";
import Slide from 'react-reveal/Slide';
import Shake from 'react-reveal/Shake';


import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Context as AuthContext } from "../../context/AuthContext";
import { CardActions } from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';

import './style.css';

export default function ForgotPassword() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const { forgotPassword, clearErrorMessage, state } = React.useContext(AuthContext);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) clearErrorMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const email = data.get("email");

    const isSuccess = await forgotPassword({ email });

    if (isSuccess) {
      goToPage("confirmForgotPassword");
      clearErrorMessage();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        className="forgot-password-form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          {state.errorMessage ? 
            <Shake>
              <Box className="enter-pages-error-message">
                {state.errorMessage}
              </Box> 
            </Shake>
            : 
          null}
        
        <Slide left>
          <Box className="enter-pages-title">
            Welcome Back!
          </Box>
          <Box className="enter-pages-subtitle">
            Forgot Password
          </Box>
          <Box className="forgot-password-form-controls" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              className="enter-pages-text-field"
              margin="normal"
              required
              fullWidth
              id="email"
              // label="Email Address"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <CardActions className="enter-pages-buttons-box">
              <Button 
                className="primary-btn-color default-btn-hover default-button" 
                type="submit"
              >
                Forgot Password
              </Button>
            </CardActions>
            <Box className="enter-pages-after-form-text forgot-password-after-form-text">
              <Link href="/" variant="body2">
                {"Sign In"}
              </Link>
              <Link href="/confirmForgotPassword" variant="body2">
                {"Confirm Forgot Password"}
              </Link>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Container>
  );
}
