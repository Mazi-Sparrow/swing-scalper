import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "../../assets/images/logo.png";
import ForgotPassword from "./ForgotPassword";
import {Skeleton } from '@progress/kendo-react-indicators';
import RightSideImage from '../../../src/assets/images/entry-page-right-side-image.png'
import Slide from 'react-reveal/Slide';

export default function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} mt={2} md={8} sm={8} xs={12}>
            <Card sx={{ maxWidth: 1000 }} className="card-main">
              <CardContent>
                <ForgotPassword />
              </CardContent>
              <CardContent>
              <Box className="enter-pages-buttom-text">
                <Slide bottom cascade>
                  The information contained in this site is provided for informational purposes only, and should not be construed as financial advice on any subject matter.
                </Slide>
              </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid className="entry-page-right-side-grid" item lg={6} mt={2} md={6} sm={7} xs={12}>
            <Slide right>
              <Box className="entry-page-right-side-image-box" style={{backgroundImage:`url(${RightSideImage})`}}>
                  <Box></Box>
                  <Box className="entry-page-right-side-image-text">
                    Smart Entry and Exit Setups for your swing trade
                  </Box>
                  <Typography variant="body2" className="entry-page-evaluate-risk-text">
                      Always evaluate <span className="plan3"> RISK</span> before{" "}
                      <span className="plan">REWARD.</span>
                  </Typography>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
