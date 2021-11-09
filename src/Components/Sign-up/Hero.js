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
                <Typography variant="body1" className="RELIABLE">
                  SWINGSCALP
                </Typography>

                <Typography variant="body1" className="RELIABLE2">
                </Typography>
                <div style={{ display: "flex", marginTop: "1.5rem", wordWrap: "break-word" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography className="RELIABLE3" sx={{ wordWrap: "break-word" }}>
                    Log & Track Trades in A Responsive Trading Journal.
                  </Typography>
                </div>

                <div style={{ display: "flex" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body4" className="RELIABLE3">
                  Simplify Stage 1 Technical Analysis.                  </Typography>
                </div>

                <div style={{ display: "flex", marginBottom: "1.2rem" }}>
                  <CheckCircleIcon
                    style={{ marginRight: "1.1rem", color: "#9c1265", fontSize: "1.2rem" }}
                  />
                  <Typography variant="body4" className="RELIABLE3">
                     Catch Stocks At Undervalued Prices With Our Scanner.
                  </Typography>
                </div>
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
            <Typography variant="body2" className="RELIABLE2">
              Always evaluate <span className="plan3"> RISK</span> before{" "}
              <span className="plan">REWARD.</span>
            </Typography>
            <Typography className="RELIABLE3">PLAN YOUR TRADE AND TRADE YOUR PLAN</Typography>
          </Grid>
          <Typography variant="body2" className="RELIABLE3">
          For A Limited Time, you are welcome to try SwingScalp For 14 Days @ $12.99. You will be billed the full monthly rate of $33.00 at expiration of Trial. You can choose to cancel at anytime with no obligations.
                </Typography>
        </Grid>
      </Container>
    </div>
  );
}
