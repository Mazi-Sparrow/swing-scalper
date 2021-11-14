import React from 'react';
import './style.css';
import { Box } from '@mui/system';
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

const PrivacyPolicy = () => {
    return (
        <div>
            <Box>
                <Navbar />
            </Box>
            <Box>
                <MobileNavbar />
            </Box>

            <Box className="privacy-policy-content">
                <Box className="privacy-policy-text">
                    Insert Privacy Policy text here 
                </Box>
            </Box>
        </div>
    )
};

export default PrivacyPolicy;