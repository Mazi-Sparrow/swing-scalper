import React from "react";
import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";
import { Container, Grid, Typography, Paper } from "@mui/material";

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 40,
  skip: 0,
};

export default function Index() {
  const [dataState, setDataState] = React.useState(initialDataState);

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
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={8} sx={{ height: "45vh", backgroundColor: "grey" }}>
              <Paper
                elevation={7}
                variant="elevation"
                square
                sx={{ height: "100%", backgroundColor: "grey" }}
              />
              <Grid item xs={12}>
                <Grid container spacing={1} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={7}
                      variant="elevation"
                      square
                      sx={{ height: "100%", backgroundColor: "grey" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={7}
                      variant="elevation"
                      square
                      sx={{ height: "20vh", backgroundColor: "grey" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Paper variant="elevation" elevation={7} square sx={{ height: "70vh" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
