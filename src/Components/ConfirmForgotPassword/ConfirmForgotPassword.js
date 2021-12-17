import * as React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
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

import Shake from 'react-reveal/Shake';
import Slide from 'react-reveal/Slide';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


export default function ConfirmForgotPassword() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const { confirmForgotPassword, clearErrorMessage, state } = React.useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const email = data.get("email");
    const code = data.get("code");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    const isSuccess = await confirmForgotPassword({
      email,
      code,
      password,
      confirmPassword,
    });
    if (isSuccess) {
      goToPage("");
      clearErrorMessage();
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
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
            Set New Password
          </Box>
          <Box className="confirm-forgot-password-form-controls" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="enter-pages-text-field"
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  // label="Code"
                  placeholder="Code"
                  name="code"
                  autoComplete="code"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="enter-pages-text-field"
                  required
                  fullWidth
                  name="password"
                  // label="Password"
                  placeholder="Create Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="enter-pages-text-field"
                  required
                  fullWidth
                  name="confirmPassword"
                  // label="confirmPassword"
                  placeholder="Confirm Password"
                  type={showPasswordConfirm ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                        >
                          {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <CardActions className="enter-pages-buttons-box">
              <Button
                    className="primary-btn-color default-btn-hover default-button"
                    type="submit"
                  >
                    Confirm Forgot Password
              </Button>
            </CardActions>

            <Box className="enter-pages-after-form-text">
                Already registered? 
                <Link href="/signin" variant="body2">
                  Login
                </Link>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Container>
  );
}
