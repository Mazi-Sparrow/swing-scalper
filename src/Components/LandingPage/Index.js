import React from 'react';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";
import './style.css';
import Slide from 'react-reveal/Slide';
import '../../../node_modules/react-modal-video/css/modal-video.css';
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player/youtube';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import Watchlist from '../../assets/images/landing-page-watchlist.png';
import Journal from '../../assets/images/landing-page-journal.png';
import Dashboard from '../../assets/images/landing-page-dashboard.png';
import PWA from '../../assets/images/landing-page-pwa.jpg';
import firstReviewLogo from '../../assets/images/landing-page-review1-logo.jpg'
import secondReviewLogo from '../../assets/images/landing-page-review2-logo.jpg'
import thirdReviewLogo from '../../assets/images/landing-page-review3-logo.jpg'
import fiveStars from '../../assets/images/stars-5.svg'
    
    const LandingPage = () => {
        const [isOpen, setOpen] = React.useState(false)
        const [entryModalOpen, setEntryModalOpen] = React.useState(false);
        const onOpenModal = () => setEntryModalOpen(true);
        const onCloseModal = () => setEntryModalOpen(false);

        React.useEffect(() => {
            setTimeout(() => {
                setEntryModalOpen(true);
            }, 1500)
        }, [])

        return (
        <Box className="container-fluid homepage">
            <Modal 
                open={entryModalOpen} 
                onClose={onCloseModal} 
                center
                animationDuration={500}
            >
                    <Box className="entry-modal-top-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </Box>
                    <ReactPlayer
                        className="youtube-player"
                        url='https://www.youtube.com/watch?v=kUlffl8j3Es'
                        playing
                        muted={true}
                        controls={true}
                        loop={true}
                        width='100%'
                        height='70%'
                    />
                    <Box className="entry-modal-bottom-text">
                        To view a few pages before you start your trial, please accept our <a href="terms-of-service">terms</a> and <a href="privacy-policy">conditions</a> and privacy policy, by clicking the button below.
                    </Box>
                    <Button className="primary-btn-color default-btn-hover default-button">Close and Accept</Button>
            </Modal>
            <Box className="row">

                <Box className="no-padding">
                    <Navbar />
                </Box>
                <Box className="no-padding">
                    <MobileNavbar />
                </Box>
                <Box className="homepage-content">
                    {/* <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="kUlffl8j3Es" onClose={() => setIntryModalOpen(false)} /> */}
                    <Box className="homepage-background">
                        <h1>Helping You Mitigate The Risks Of Short Term Trading!</h1>
                        <h2>Your entry and exit levels play a crucial role in the success of a trade.</h2>
                        <article className="homepage-welcome-text">
                            <Box>We give you the tools to mitigate the risks of short/long term swing trading as you navigate these <b>Volatile Markets</b>. </Box>
                            <Box>Simplifying Chart Reading / Technical Analysis with easy to read components gives you a <b>Guided Edge</b> before you put your money to work. </Box>
                            <Box><strong><span className="homepage-text-accent">YOU</span></strong> are just a few clicks from the easiest way to gain extraordinary confidence in your trades with <b>AI</b> generated <b>Entries & Exits</b> to match your desired <b>Risk to Reward</b>. </Box>
                            <Box>Enjoy Free Access to our <b>Trade Journal</b> to log and keep track of your trades with RealTime notifications on when to <b>Close or Cut</b> a trade with our <b>Premium Membership</b>.</Box>
                            <Box>For a <b>Limited Time</b>, We are giving you a $52.00/Monthly access value to try for <b>14 days at $12.99</b> which you can cancel anytime.</Box>
                        </article>
                        {/* <Box className="homepage-watch-app-demo-box" onClick={() => { setOpen(true) }}>
                            <div className="homepage-watch-app-demo-play-button" onClick={() => { setOpen(true) }}></div>
                        </Box> */}
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="kUlffl8j3Es" onClose={() => setOpen(false)} />
                        {/* <Box className="homepage-trial-btn" onClick={() => { setOpen(true) }}>WATCH DEMO</Box> */}
                    
                        <Box className="homepage-image-box homepage-dashboard-image">
                            <img onClick={() => { setOpen(true) }} src={Dashboard} alt="dashboard demo"/>
                            <div className="homepage-watch-app-demo-play-wrapper" onClick={() => { setOpen(true) }}>
                                <div className="homepage-watch-app-demo-play-button" onClick={() => { setOpen(true) }}></div>
                            </div>
                        </Box>

                        <Button className="homepage-trial-btn gradient-animation-reversed large-button" size="large" variant="contained" href="/signup">14 DAYS TRIAL FOR $12.99</Button>

                    </Box>
                    <Box className="reviews-block">
                        <Box className="reviews">
                            <Box className="review">
                                <Box className="review-title-block">
                                    <Box className="review-title-logo">
                                        <img src={firstReviewLogo} alt=""/>
                                    </Box>
                                    <Box className="review-title-stars">
                                        <img src={fiveStars} alt=""/>
                                    </Box>
                                </Box>
                                <Box className="review-author-name">Tyler Joseph</Box>
                                <Box className="review-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Box>
                            </Box>
                            <Box className="review">
                                <Box className="review-title-block">
                                    <Box className="review-title-logo">
                                        <img src={secondReviewLogo} alt=""/>
                                    </Box>
                                    <Box className="review-title-stars">
                                        <img src={fiveStars} alt=""/>
                                    </Box>
                                </Box>
                                <Box className="review-author-name">Tyler Joseph</Box>
                                <Box className="review-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Box>
                            </Box>
                            <Box className="review">
                                <Box className="review-title-block">
                                    <Box className="review-title-logo">
                                        <img src={thirdReviewLogo} alt=""/>
                                    </Box>
                                    <Box className="review-title-stars">
                                        <img src={fiveStars} alt=""/>
                                    </Box>
                                </Box>
                                <Box className="review-author-name">Tyler Joseph</Box>
                                <Box className="review-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box className="homepage-pwa-title">No Downloads Needed</Box>
                    <Box className="homepage-image-box homepage-pwa-image">
                        <img src={PWA} alt="PWA"/>
                    </Box> */}
                    
                    <ReactPlayer
                        className="youtube-player"
                        url='https://www.youtube.com/watch?v=qmpPHmGhKc4'
                        playing
                        muted={true}
                        controls={true}
                        loop={true}
                        width='100%'
                        height='700px'
                    />

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
                                <Typography>What is the app payment timing and recurrence? </Typography>
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
                                <Typography>What do I get with the Trade Journal?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                With our Trade Journal, you're able to easily log your trades and keep track of your current progress on the user-friendly dashboard. You'll also receive real-time notifications when your stock is approaching and hits your stop loss or price targets. For premium subscribers.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="homepage-accordion">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>What are the main variables the analysis is based on? </Typography>
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
                                <Typography>Is crypto currency trading included?</Typography>
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
                                <Typography>Are penny stocks included?</Typography>
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
                        <Button className="homepage-terms-of-service-btn default-button" size="large" variant="contained" href="/terms-of-service">Terms of Service</Button>
                        <Button className="homepage-privacy-policy-btn default-button" size="large" variant="contained" href="/privacy-policy">Privacy Policy</Button>
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