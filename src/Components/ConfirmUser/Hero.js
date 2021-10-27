import React from "react";
import { Grid, Container, Box, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Logo from "../../assets/images/logo.png";
import Card1 from "../../assets/images/card1.png";
import Confirm from "./Confirm";

export default function Hero() {
  return (
    <div className="hero-section">
       <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} md={6} sm={8} xs={10}>
          <Card sx={{ maxWidth: 720 }} className="card-main">
              <CardContent>
              <img src={Card1} width="100%" height="auto" />
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
          <Grid item lg={6} md={6} sm={8} xs={10}>
            <Box className="hero-reliable">
            
            </Box>
            <img src={Logo} width="100%" height="auto" />
            <Box className="hero-reliable"></Box>
              <Typography variant="body2" className="RELIABLE2">
                Always evaluate <span className="plan3"> RISK</span> before{" "}
                <span className="plan">REWARD.</span>
              </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
