import React, { useState } from "react";
import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";
import { Container, Grid, Typography, Paper, TextField, Button } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
});

export default function Index() {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    details: "",
    email: "",
    emailError: false,
    titleError: false,
    detailsError: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({ ...state, titleError: false });
    if (!state.details) setState({ ...state, detailsError: true });
    if (!state.title) setState({ ...state, titleError: true });

    if (state.title && state.details) {
    }
  };
  return (
    <div>
      <Navbar />

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
                  mozallowfullscreen="mozallowfullscreen"
                  msallowfullscreen="msallowfullscreen"
                  oallowfullscreen="oallowfullscreen"
                  webkitallowfullscreen="webkitallowfullscreen"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/P9teiP_izSw"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
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
                        Edit Me Please
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
                        Edit Me Please
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
                      error={state.titleError}
                    />

                    <TextField
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                      className={classes.field}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      label="Email"
                      required
                      error={state.emailError}
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
                      error={state.detailsError}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      color="secondary"
                      endIcon={<SendIcon />}
                    >
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
