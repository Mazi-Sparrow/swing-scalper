import React from "react";
import { Grid, Container, Box, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Logo from "../../assets/images/logo.png";
import ConfirmForgotPassword from "./ConfirmForgotPassword";

export default function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} md={8} sm={8} xs={12}>
            <Card sx={{ maxWidth: 720, minWidth: 550 }} className="card-main">
              <CardContent>
                <Typography variant="body1" className="RELIABLE">
                  SWINGSCALP
                </Typography>

                <Typography variant="body1" className="RELIABLE2">
                  GUIDANCE FOR MORE PROFITABLE TRADING
                </Typography>
                <div style={{ display: "flex", marginTop: "3rem", wordWrap: "break-word" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography className="RELIABLE3" sx={{ wordWrap: "break-word" }}>
                    Log & Track Trades in A Responsive Trading Journl with Real-Time Price Updates.
                  </Typography>
                </div>

                <div style={{ display: "flex" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body4" className="RELIABLE3">
                    Get Precise Knowledge of The Risk vs. Reward on Each trade
                    <span style={{ textDecoration: "underline" }}> Before </span>
                    You Buy.
                  </Typography>
                </div>

                <div style={{ display: "flex", marginBottom: "1.2rem" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body4" className="RELIABLE3">
                    Utilize Our Complimentary Breakout Scanner to Discover Undervalued Stocks.
                  </Typography>
                </div>

                <Typography className="RELIABLE3">PLAN YOUR TRADE AND TRADE YOUR PLAN</Typography>

                <Typography className="RELIABLE3">
                  Become A More Disciplined Trader & Watch Your Profits Grow!
                </Typography>
                <ConfirmForgotPassword />
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
            <Box className="hero-reliable"></Box>
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
