import React, { useState } from "react";
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
import { CardActions, FormControlLabel, Checkbox } from "@mui/material";

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
    if (e.target.name == "password" && !passwordPattern.test(e.target.value)) {
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
        {errorMessage ? <Typography style={{ color: "red" }}>{errorMessage}</Typography> : null}

        {state.formError ? (
          <Typography style={{ color: "red" }}>{state.formError}</Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                onChange={onChange}
                value={state.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={onChange}
                value={state.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={onChange}
                value={state.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={onChange}
                value={state.password}
                name="password"
                label="Password"
                type={state.passwordShown ? "text" : "password"}
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={onChange}
                value={state.confirmPassword}
                name="confirmPassword"
                label="confirmPassword"
                type={state.passwordShown ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                value={state.passwordShown}
                color="primary"
                onChange={(e) => {
                  setState({ ...state, passwordShown: !state.passwordShown });
                }}
              />
            }
            label="Show Password"
          />

          <CardActions>
            <Button
              size="small"
              color="primary"
              type="submit"
              disabled={state.password !== state.confirmPassword}
            >
              Sign up
            </Button>
          </CardActions>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
