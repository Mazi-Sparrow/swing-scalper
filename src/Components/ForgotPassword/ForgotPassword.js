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
        sx={{
          marginTop: 8,
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

        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
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

          <CardActions>
            <Button size="small" color="primary" type="submit">
              Forgot Password
            </Button>
          </CardActions>

          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Sign In"}
              </Link>
            </Grid>

            <Grid item style={{ marginLeft: 10 }}>
              <Link href="/confirmForgotPassword" variant="body2">
                {"Confirm Forgot Password"}
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
      </Box>
    </Container>
  );
}
