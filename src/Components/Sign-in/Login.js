import * as React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Context as AuthContext } from "../../context/AuthContext";
import { CardActions } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const { signin, state, clearErrorMessage } = React.useContext(AuthContext);

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

    signin(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
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
          {state.errorMessage ? (
            <Typography style={{ color: "red" }}>{state.errorMessage}</Typography>
          ) : null}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <CardActions>
              <Button size="small" color="primary" type="submit">
                Login
              </Button>
            </CardActions>

            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Sign Up?"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link href="/confirm" variant="body2">
                  {"Confirm Email"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
