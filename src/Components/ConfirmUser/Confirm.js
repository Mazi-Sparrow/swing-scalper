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

import Shake from 'react-reveal/Shake';
import Slide from 'react-reveal/Slide';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

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
            Welcome!
          </Box>
          <Box className="enter-pages-subtitle">
            Confirm Email
          </Box>
          <Box className="confirm-email-form-controls" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="enter-pages-text-field"
              margin="normal"
              required
              fullWidth
              name="code"
              // label="Code"
              placeholder="Code"
              type="text"
              id="code"
              autoComplete="confirm-code"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />

            <CardActions className="enter-pages-buttons-box">
              <Button
                    className="primary-btn-color default-btn-hover default-button"
                    type="submit"
                  >
                    Confirm Email
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
