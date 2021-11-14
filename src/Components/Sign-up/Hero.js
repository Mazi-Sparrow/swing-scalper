import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import {Skeleton } from '@progress/kendo-react-indicators';
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "../../assets/images/logo.png";
import SignUp from "./SignUp";

export default function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} mt={2} md={8} sm={8} xs={12}>
            <Card sx={{ maxWidth: 1000 }} className="card-main">
              <CardContent>
                 <Typography className="RELIABLE3">
                </Typography>
                <SignUp />
              </CardContent>
              <CardContent>
                <Typography variant="body2" className="RELIABLE3">
                The information contained in this site is provided for informational purposes only, and should not be construed as financial advice on any subject matter.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} mt={2} md={12} sm={12} xs={12}>
            <Box className="hero-reliable"></Box>
            <img src={Logo} width="100%" height="auto" alt=<Skeleton shape={"rectangle"} style={{ width: "100%", height: "auto", }} /> />
            <Box className="hero-reliable"></Box>
          </Grid>
          <Typography variant="body2" className="RELIABLE2">
              Always evaluate <span className="plan3"> RISK</span> before{" "}
              <span className="plan">REWARD.</span>
            </Typography>
        </Grid>
      </Container>
    </div>
  );
}
