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
                    <Box className="homepage-faq-sub">
                        <h7>At SwingScalp, our mission is to help you maximize your profits by simplifying technical analysis. Our app is designed to help you master the art of swing trading. That said, we still want to make sure you have all the information you need before signing up for our app.</h7>
                        </Box>
                    <Box className="homepage-faq-content">
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>1.	What is the app payment timing and recurrence? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                After your trial period is over, the standard subscription is $33 per month, which can easily be canceled anytime. We also offer annual packages for greater savings. Click here for more information.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>2.	What do I get with the Simplified Trade Journal?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                With our Simplified Trade Journal, you're able to easily log your trades and keep track of your current progress on the user-friendly dashboard. You'll also receive real-time notifications when your stock is approaching and hits your stop loss or price targets. For premium subscribers.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>3.	What are the main variables the analysis is based on? </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                A successful trade starts with the right analysis. The main variables we use for an effective strategy are a safely calculated stop loss, price target, and risk/reward.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>4.	Is crypto currency trading included?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                There are a few mainstream crypto currencies included. As the world of cryptocurrency expands, more exciting options will become available. Due to regulation or volatility, many have been left out for now but will be added soon!
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>5.	Are penny stocks included?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Yes, penny stocks are included in analysis on our app.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>What platforms does your app run on?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                SwingScalp is a progressive web app and responds to screen size changes, so it'll work well even on your mobile device. For best use, we recommend using a computer. A mobile version is currently in production and will be launching soon.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>How secure is SwingScalp?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                Being secured by the best identity federation technologies available ensures that our users are always protected. We upgrade as industry changes occur so you can be assured your information is safe.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Do you offer refunds?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                No, but we have a 14-day trial that you can cancel any time so you can experience all our features before deciding to keep your access. We also offer free access until your account is closed.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Who is SwingScalp best for?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                When you're trading stocks for short periods, it can be risky at times. That's why we've created this innovative app for the retail trader who wants to limit their risk.
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