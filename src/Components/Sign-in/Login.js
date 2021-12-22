import * as React from "react";
import { useHistory } from "react-router-dom";
import Shake from 'react-reveal/Shake';
import Slide from 'react-reveal/Slide';

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

import { Context as AuthContext } from "../../context/AuthContext";
import { CardActions } from "@mui/material";

import './style.css';



export default function SignIn() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const { signin, state, clearErrorMessage } = React.useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) clearErrorMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const email = data.get("email");
    const password = data.get("password");

    const result = signin(email, password)
    if (result) (
      goToPage("profile")
    )
  };

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
            Enter your Login ID
          </Box>
          <Box className="sign-in-form-controls" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <TextField
              className="enter-pages-text-field"
              // margin="normal"
              required
              fullWidth
              name="password"
              // label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
            <Box className="remember-me-forgot-pass-box">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Box>
            <CardActions className="enter-pages-buttons-box">
              <Button 
                className="primary-btn-color default-btn-hover default-button" 
                type="submit"
              >
                Login
              </Button>
            </CardActions>
            <Box className="enter-pages-after-form-text">
              Not register yet? 
              <Link href="/signin" variant="body2">
                Create Account
              </Link>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Container>
  );
}
