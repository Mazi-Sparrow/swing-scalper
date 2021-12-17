import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Shake from 'react-reveal/Shake';
import Slide from 'react-reveal/Slide';

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import { Context as AuthContext } from "../../context/AuthContext";
import { CardActions, FormControlLabel, Checkbox } from "@mui/material";
import './style.css';

const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");


export default function SignUp() {
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    formError: "",
    passwordShown: false,
  });
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const history = useHistory();
  const goToPage = React.useCallback(
    (page, email) => history.push({ pathname: `/${page}`, state: { email } }),
    [history]
  );
  const {
    signup,
    state: { errorMessage },
    clearErrorMessage,
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) clearErrorMessage();

    return () => {
      isMounted = false;
    };
  }, [password]);

  const onChange = (e) => {
    if (e.target.name === "password" && !passwordPattern.test(e.target.value)) {
      setState({
        ...state,
        password: e.target.value,
        formError:
          "Your Password must contain at least 1 Capital letter, 1 small letter, 1 special char, 1 number",
      });
    } else {
      setState({ ...state, formError: "", [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    setState({ ...state, formError: "" });
    clearErrorMessage();

    event.preventDefault();

    if (!passwordPattern.test(state.password)) {
      setState({
        ...state,
        formError:
          "Your Password must contain at least 1 Capital letter, 1 small letter, 1 special char, 1 number",
      });
      return;
    }

    const isSignedIn = await signup({
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      firstName: state.firstName,
      lastName: state.lastName,
    });

    if (isSignedIn) goToPage("confirm", state.email);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "1.5em" }}></div>
        {errorMessage ? 
        <Shake>
          <Box className="enter-pages-error-message">
            {errorMessage}
          </Box> 
        </Shake>
          : 
        null}

        {state.formError ? (
          <Shake>
            <Box className="enter-pages-error-message">
              {state.formError}
            </Box>
          </Shake>
        ) : null}

        <Slide left>
          <Box className="enter-pages-title">
            Welcome!
          </Box>
          <Box className="enter-pages-subtitle">
            Create Your Account
          </Box>
          
          <Box className="sign-up-form-controls" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="enter-pages-text-field"
                  autoComplete="given-name"
                  name="firstName"
                  onChange={onChange}
                  value={state.firstName}
                  required
                  fullWidth
                  id="firstName"
                  // label="First Name"
                  placeholder="First Name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
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
                  onChange={onChange}
                  value={state.lastName}
                  id="lastName"
                  // label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
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
                  onChange={onChange}
                  value={state.email}
                  id="email"
                  // label="Email Address"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
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
                  required
                  fullWidth
                  onChange={onChange}
                  value={state.password}
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
                  onChange={onChange}
                  value={state.confirmPassword}
                  name="confirmPassword"
                  // label="confirmPassword"
                  placeholder="Confirm Password"
                  type={showPasswordConfirm ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{ // <-- This is where the toggle button is added.
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
                disabled={state.password !== state.confirmPassword}
              >
                Create Account
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
