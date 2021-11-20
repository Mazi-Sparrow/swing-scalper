import React from "react";
import { Box } from '@mui/material';
import Hero from "./Hero";
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

export default function Index() {
  return (
    <Box className="container-fluid homepage">
      <Box className="row">
        <Box className="no-padding">
            <Navbar />
        </Box>
        <Box className="no-padding">
            <MobileNavbar />
        </Box>
        
        <Hero />
      </Box>
    </Box>
  );
}
