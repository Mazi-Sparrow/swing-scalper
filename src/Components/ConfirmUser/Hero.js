import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Skeleton } from '@progress/kendo-react-indicators';
import Logo from "../../assets/images/logo.png";
import Confirm from "./Confirm";

export default function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} mt={2} md={8} sm={8} xs={12}>
            <Card sx={{ maxWidth: 1000 }} className="card-main">
              <CardContent>
                <Confirm />
              </CardContent>
              <CardContent>
                <Typography variant="body2" className="RELIABLE3">
                  For A Limited Time, Get 14 Days of Unlimited Access to SwingScalp For Only 12.99!
                </Typography>
                <Typography variant="body2" className="RELIABLE3">
                  An Incredible Value With Proven Results
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
