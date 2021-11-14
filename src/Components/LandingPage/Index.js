import React from 'react';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";
import './style.css';
import Watchlist from '../../assets/images/landing-page-watchlist.png';
import Journal from '../../assets/images/landing-page-journal.png';
import Dashboard from '../../assets/images/landing-page-dashboard.png';
import PWA from '../../assets/images/landing-page-pwa.jpg';
import Slide from 'react-reveal/Slide';
import '../../../node_modules/react-modal-video/css/modal-video.css';
import ModalVideo from 'react-modal-video'

const LandingPage = () => {
    const [isOpen, setOpen] = React.useState(false)
    return (
        <Box className="container-fluid homepage">
            <Box className="row">

                <Box className="no-padding">
                    <Navbar />
                </Box>
                <Box className="no-padding">
                    <MobileNavbar />
                </Box>
                <Box className="homepage-content">
                    <Box className="homepage-background">
                        <h1>Entry And Exit Strategies For Swing Trading!</h1>
                        <h2>Your entry and exit levels play a crucial role in the success of a trade and SwingScalp helps you find the right Setup.</h2>
                        <article className="homepage-welcome-text">
                            <Box>At SwingScalp, we develop Algorithms based on <strong><span className="homepage-text-accent">PROVEN</span></strong> profitable TECHNICAL ANALYSIS under the hood to help you.</Box>
                            <Box>Simplifying the process of Technical Analysis takes you from identifying a setup, planning  to executing trades faster with reduced risk.</Box>
                            <Box>It’s not just enough to know what <b>stock</b> or when to buy, a lot of times, we end up with loses trading high performing stocks because we ignore the most important factor in every trade.</Box>
                            <Box><strong><span className="homepage-text-accent">MARGIN</span></strong>, when to sell and if you plan on trading this stock as opposed to investing, you need to know how much to allocate to a trade if the risk/reward is worth it. We have also added a free to use Simplified Trade Journal to log your trades and track your progress.</Box>
                            <Box>Enjoy Exclusive Access to <b>Trade Streams</b> From All 19 Exchanges in RealTime with our <b>Premium Membership</b>.</Box>
                        </article>
                        <Button className="homepage-trial-btn" size="large" variant="contained" href="/signup">14 DAYS TRIAL FOR $12.99</Button>

                        <Box className="homepage-image-box homepage-watchlist-image">
                            <img src={Watchlist} alt="watchlist demo"/>
                        </Box>

                        <Box className="homepage-image-box homepage-journal-image">
                            <img src={Journal} alt="journal demo"/>
                        </Box>

                        <Box className="homepage-image-box homepage-dashboard-image">
                            <img src={Dashboard} alt="dashboard demo"/>
                        </Box>

                        <Button className="homepage-trial-btn" size="large" variant="contained" href="/signup">14 DAYS TRIAL FOR $12.99</Button>

                    </Box>
                    <Box className="homepage-pwa-title">PROGRESSIVE WEB APPLICATION</Box>
                    <Box className="homepage-image-box homepage-pwa-image">
                        <img src={PWA} alt="PWA"/>
                    </Box>
                    <Box className="homepage-pwa-description">**No App Downloads Or Installation Needed**</Box>

                    <Box className="homepage-watch-app-demo-box" onClick={() => { setOpen(true) }}>
                        <div className="homepage-watch-app-demo-play-button" onClick={() => { setOpen(true) }}></div>
                    </Box>
                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="kUlffl8j3Es" onClose={() => setOpen(false)} />
                    <Box className="homepage-watch-app-demo-text" onClick={() => { setOpen(true) }}>WATCH APP DEMO</Box>

                    <Box className="homepage-faq-title">Frequently Asked Questions</Box>
                    
                    <Box className="homepage-faq-content">
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 4</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 5</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 6</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 7</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 8</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Question 9</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box className="homepage-bottom-block">
                        <Box className="homepage-bottom-info">The information contained in this site is provided for informational purposes only, and should not be construed as financial advice on any subject matter.</Box>
                        <Box className="homepage-bottom-advice">PLEASE ALWAYS DO YOUR RESEARCH OR CONSULT A FINANCIAL ADVISER.</Box>
                    </Box>
                    <Box className="homepage-button-box">
                        <Button className="homepage-terms-of-service-btn" size="large" variant="contained" href="/terms-of-service">Terms of Service</Button>
                        <Button className="homepage-privacy-policy-btn" size="large" variant="contained" href="/privacy-policy">Privacy Policy</Button>
                    </Box>
                    <Box className="homepage-copyright">
                        © TECH TELOS INC 2021
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LandingPage;