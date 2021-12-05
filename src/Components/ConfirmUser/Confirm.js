import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
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

export default function Confirm() {
  const location = useLocation();

  const history = useHistory();

  const [email, setEmail] = React.useState(location.state.email);

  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const { confirmEmail, state, clearErrorMessage } = React.useContext(AuthContext);

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

    const code = data.get("code");

    const isConfirmed = await confirmEmail({ email, code });
    const isCheckoutUrl = localStorage.getItem('checkoutUrl');
    if (isConfirmed) {
      if (isCheckoutUrl) {
        localStorage.removeItem('checkoutUrl');
        window.location.replace(isCheckoutUrl);
      } else {
        localStorage.setItem('freePlan', 'true');
        goToPage("profile");
      }
    }
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
        {state.errorMessage ? (
          <Typography style={{ color: "red" }}>{state.errorMessage}</Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="body2" className="RELIABLE2">
          Confirm Email
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="code"
            label="Code"
            type="text"
            id="code"
            autoComplete="confirm-code"
          />

          <CardActions>
            <Button size="small" color="primary" type="submit">
              Confirm Email
            </Button>
          </CardActions>

          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Sign In"}
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
