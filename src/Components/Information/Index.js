import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ContactUsContext } from "../../context/ContactUsContext";

const useStyles = makeStyles({
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
});

const initialState = {
  title: "",
  details: "",
  email: "",
  emailError: false,
  titleError: false,
  detailsError: false,
};

export default function Index() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { errorMessage, isLoading },
    clearErrorMessage,
    contactUs,
  } = useContext(ContactUsContext);

  const classes = useStyles();

  const [state, setState] = useState(initialState);

  useEffect(() => {
    clearErrorMessage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({ ...state, titleError: false });
    if (!state.details) setState({ ...state, detailsError: true });
    if (!state.title) setState({ ...state, titleError: true });

    if (state.title && state.details) {
      contactUs({ title: state.title, message: state.details, token }).then((res) => {
        setState({ ...state, ...initialState });
      });
    }
  };
  return (
    <div>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

      <Grid
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        sx={{ flexGrow: 1 }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6} sx={{ height: "45vh", backgroundColor: "grey" }}>
              <Paper
                elevation={7}
                variant="elevation"
                square
                sx={{ height: "100%", backgroundColor: "grey" }}
              >
                <iframe
                  allowFullScreen="allowfullscreen"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/kUlffl8j3Es?rel=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </Paper>
              <Grid item xs={12}>
                <Grid container spacing={1} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={7}
                      variant="elevation"
                      square
                      sx={{ height: "100%", backgroundColor: "grey" }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                        gutterBottom
                        padding={2}
                      >
                        BuyZone Watchlist
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={7}
                      variant="elevation"
                      square
                      sx={{ height: "20vh", backgroundColor: "grey" }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                        gutterBottom
                        padding={2}
                      >
                        BuyTrigger Watchlist
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Paper variant="elevation" elevation={7} square sx={{ height: "70vh" }}>
                <Container>
                  <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                    Contact us
                  </Typography>
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                      onChange={(e) => setState({ ...state, title: e.target.value })}
                      className={classes.field}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      label="Title"
                      required
                      value={state.title}
                      error={state.titleError}
                    />

                    <TextField
                      onChange={(e) => setState({ ...state, details: e.target.value })}
                      className={classes.field}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      required
                      value={state.details}
                      error={state.detailsError}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      endIcon={<SendIcon />}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} style={{ marginRight: "5px" }} />
                      ) : null}
                      Send
                    </Button>
                  </form>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
