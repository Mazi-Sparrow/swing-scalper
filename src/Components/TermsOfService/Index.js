import React from 'react';
import './style.css';
import { Box } from '@mui/system';
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

const TermsOfService = () => {
    return (
        <div>
            <Box>
                <Navbar />
            </Box>
            <Box>
                <MobileNavbar />
            </Box>

            <Box className="terms-of-service-content">
                <Box className="terms-of-service-text">
                    Insert Terms of Service text here 
                </Box>
            </Box>
        </div>
    )
};

export default TermsOfService;