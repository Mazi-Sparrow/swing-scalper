import React from 'react';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Slide from 'react-reveal/Slide';
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player/youtube';
import { Modal } from 'react-responsive-modal';

import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";
import Navbar from "../Navbar/NavbarComponent";

// Assets
import Watchlist from '../../assets/images/landing-page-watchlist.png';
import Journal from '../../assets/images/landing-page-journal.png';
import Dashboard from '../../assets/images/landing-page-dashboard.png';
import PWA from '../../assets/images/landing-page-pwa.jpg';
import firstReviewLogo from '../../assets/images/landing-page-review1-logo.jpg'
import secondReviewLogo from '../../assets/images/landing-page-review2-logo.jpg'
import thirdReviewLogo from '../../assets/images/landing-page-review3-logo.jpg'
import fiveStars from '../../assets/images/stars-5.svg'

import '../../../node_modules/react-modal-video/css/modal-video.css';
import 'react-responsive-modal/styles.css';
import './style.css';

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
          classNames={{modal:"landing-page-modal responsive-modal"}}
          animationDuration={500}
          focusTrapped={false}
        >
          <Box className="homepage-bottom-info">
            Trade What's Happening… Not What You Think Is Going To Happen!
          </Box>
          <ReactPlayer
            className="youtube-player"
            url="https://www.youtube.com/watch?v=kUlffl8j3Es"
            playing
            muted={true}
            controls={true}
            loop={true}
            width="100%"
            height="70%"
            origin="swingscalp.com"
          />
          <Box className="homepage-bottom-info">
            The information contained in this site is provided for informational
            purposes only, and should not be construed as financial advice on
            any subject matter., please accept our{" "}
            <a href="terms-of-service">Terms Of Service</a> and{" "}
            <a href="privacy-policy">Privacy Policy</a>, by clicking the button
            below.
          </Box>
          <Button
            className="primary-btn-color default-btn-hover default-button entry-close-btn"
            onClick={() => setEntryModalOpen(false)}
          >
            Close and Accept
          </Button>
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
              <h1>We Do NOT Call Out Trades!</h1>
              <h2>
                The Potential For Gain and Risk Of Loss Are Basic Realities Of Every
                Trade. <b>SWINGSCALP</b> Exposes You To The Reality Of Losses Compared To Your Potential Gain On Every Trade In RealTime WITHOUT Emotional Bias. You Can Then Choose A Trade That Matches Your Desired RIsk/Reward Before You Put Your Money To Work.
              </h2>
              <article className="homepage-welcome-text">
                <Box>
                 <b>Have You Ever Wanted To Swing Trade With Minimum Losses? </b> Swing Trading Is A Speculative Trading Strategy In Financial Markets Where A Tradable Asset Is Held For One Or More Days In An Effort To Profit From Price Changes Or 'Swings'. Swing Trading Is A High-Risk Endeavor. Entry & Exit Points Are Crucial, As Well As The Amount Of Risk Taken On For Each Trade. {" "}
                </Box>
                <Box>
                  <b>Entry & Exit Are Important Aspects To Focus On When Trading, But Risk Management Can Be Difficult When Making Quick Decisions. </b> SwingScalp At The Click Of A Button Allows You To Take Advantage Of Safe Trade Opportunities In The Market Without Risking Too Much Capital At Any One Time.{" "}
                </Box>
                <Box>
                <b>How Do We Make Your Life Easier? </b> Our Tools Help You Mitigate Your Losses By Showing You A Safe Margin In Every Trade Setup. You Can Then Choose A Trade That Matches Your Desired RIsk/Reward Before You Put Your Money To Work. Our <b>Watchlist</b> Show Stocks At Stage One Breakout Price Action In Realtime For Your Daily Trade Setups. The <b>Swingscalp Analyzer</b> Analyzes Stock Prices And Points You To Trade Entries & Exits Within A SAFE MARGIN, Keeps Track Of Your Risk/Reward Before You Enter A Trade And Recommends Stop Loses And Price Targets. Our <b>Trade Streams</b> Gives You Access To <b>Smart Money Trades</b> Executed Daily With Market Data from All 19 Exchanges Including Darkpools. You Also Get Complimentary Access To Our Easy To Use Trade Journal To Log Your Trades And Assess Your Progress. {" "}
                </Box>
                <Box>
                  <strong>
                    <span className="homepage-text-accent">YOU</span>
                  </strong>{" "}
                  are just a few clicks from the easiest way to gain
                  extraordinary confidence in your trades with <b>AI</b>{" "}
                  generated analysis on <b>Entries & Exits</b> to match your desired{" "}
                  <b>Risk to Reward</b>.{" "}
                </Box>
                <Box>
                  Enjoy Free Access to our <b>Trade Journal</b> to log and keep
                  track of your trades with RealTime notifications on when to{" "}
                  <b>Close or Cut</b> a trade.
                </Box>
                <Box>
                  For a <b>Limited Time</b>, We are giving you a $52.00 (Premium) Monthly
                  access value to try for <b>14 days at $12.99 respectively</b> which you can
                  cancel anytime.
                </Box>
              </article>
              {/* <Box className="homepage-watch-app-demo-box" onClick={() => { setOpen(true) }}>
                            <div className="homepage-watch-app-demo-play-button" onClick={() => { setOpen(true) }}></div>
                        </Box> */}
              <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId="kUlffl8j3Es"
                onClose={() => setOpen(false)}
              />
              {/* <Box className="homepage-trial-btn" onClick={() => { setOpen(true) }}>WATCH DEMO</Box> */}

              <Box className="homepage-image-box homepage-dashboard-image">
                <img
                  onClick={() => {
                    setOpen(true);
                  }}
                  src={Dashboard}
                  alt="dashboard demo"
                />
                <div
                  className="homepage-watch-app-demo-play-wrapper"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div
                    className="homepage-watch-app-demo-play-button"
                    onClick={() => {
                      setOpen(true);
                    }}
                  ></div>
                </div>
              </Box>

              <Button
                className="homepage-trial-btn gradient-animation-reversed large-button"
                size="large"
                variant="contained"
                href="/signup"
              >
                14 DAYS TRIAL FOR $12.99
              </Button>
            </Box>
            <Box className="reviews-block">
              <Box className="reviews">
                <Box
                  className="review"
                  onClick={() => {
                    window.location.href =
                      "https://www.trustpilot.com/reviews/619c7bc2bd63dda48261be1f";
                  }}
                >
                  <Slide bottom>
                    <Box className="review-title-block">
                      <Box className="review-title-logo">
                        <img src={firstReviewLogo} alt="" />
                      </Box>
                      <Box className="review-title-stars">
                        <img src={fiveStars} alt="" />
                      </Box>
                    </Box>
                    <Box className="review-author-name">David Obasi</Box>
                    <Box className="review-content">
                      This platform provides users with easy-to-use tools for
                      business.
                    </Box>
                  </Slide>
                </Box>
                {/* <Box className="review">
                  <Slide bottom>
                    <Box className="review-title-block">
                      <Box className="review-title-logo">
                        <img src={secondReviewLogo} alt="" />
                      </Box>
                      <Box className="review-title-stars">
                        <img src={fiveStars} alt="" />
                      </Box>
                    </Box>
                    <Box className="review-author-name">Tyler Joseph</Box>
                    <Box className="review-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Box>
                  </Slide>
                </Box> */}
                {/* <Box className="review">
                  <Slide bottom>
                    <Box className="review-title-block">
                      <Box className="review-title-logo">
                        <img src={thirdReviewLogo} alt="" />
                      </Box>
                      <Box className="review-title-stars">
                        <img src={fiveStars} alt="" />
                      </Box>
                    </Box>
                    <Box className="review-author-name">Tyler Joseph</Box>
                    <Box className="review-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Box>
                  </Slide>
                </Box> */}
              </Box>

              {/* <div
                class="trustpilot-widget"
                data-locale="en-US"
                data-template-id="5419b6a8b0d04a076446a9ad"
                data-businessunit-id="619aa36c3c7b06e953904403"
                data-style-height="24px"
                data-style-width="100%"
                data-theme="light"
                data-stars="1,2,3,4,5"
                data-no-reviews="hide"
                data-scroll-to-list="true"
                data-allow-robots="true"
                data-min-review-count="10"
              >
                <a
                  href="https://www.trustpilot.com/review/swingscalp.com"
                  target="_blank"
                  rel="noopener"
                >
                  Trustpilot
                </a>
              </div> */}
            </Box>
            {/* <Box className="homepage-pwa-title">No Downloads Needed</Box>
                    <Box className="homepage-image-box homepage-pwa-image">
                        <img src={PWA} alt="PWA"/>
                    </Box> */}

            <ReactPlayer
              className="youtube-player"
              url="https://www.youtube.com/watch?v=qmpPHmGhKc4"
              playing
              origin="swingscalp.com"
              muted={true}
              controls={true}
              loop={true}
              width="100%"
              height="1062px"
              frameborder="0"
            />

            <Box className="homepage-faq-title">Frequently Asked Questions</Box>
            <Box className="homepage-faq-sub">
              <h7>
                At SwingScalp, our mission is to help you maximize your profits
                by simplifying technical analysis. Our app is designed to help
                you master the art of swing trading. That said, we still want to
                make sure you have all the information you need before signing
                up for our app.
              </h7>
            </Box>
            <Box className="homepage-faq-content">
              <Accordion className="homepage-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>
                    What is the app payment timing and recurrence?{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    After your trial period is over, the standard subscription
                    is $33 per month, which can easily be canceled anytime. We
                    also offer annual packages for greater savings. Click here
                    for more information.
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
                    With our Trade Journal, you're able to easily log your
                    trades and keep track of your current progress on the
                    user-friendly dashboard. You'll also receive real-time
                    notifications when your stock is approaching and hits your
                    stop loss or price targets. For premium subscribers.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="homepage-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>
                    What are the main variables the analysis is based on?{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    A successful trade starts with the right analysis. The main
                    variables we use for an effective strategy are a safely
                    calculated stop loss, price target, and risk/reward.
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
                    There are a few mainstream crypto currencies included. As
                    the world of cryptocurrency expands, more exciting options
                    will become available. Due to regulation or volatility, many
                    have been left out for now but will be added soon!
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
                    SwingScalp is a progressive web app and responds to screen
                    size changes, so it'll work well even on your mobile device.
                    For best use, we recommend using a computer. A mobile
                    version is currently in production and will be launching
                    soon.
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
                    Being secured by the best identity federation technologies
                    available ensures that our users are always protected. We
                    upgrade as industry changes occur so you can be assured your
                    information is safe.
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
                    No, but we have a 14-day trial that you can cancel any time
                    so you can experience all our features before deciding to
                    keep your access. We also offer free access until your
                    account is closed.
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
                    When you're trading stocks for short periods, it can be
                    risky at times. That's why we've created this innovative app
                    for the retail trader who wants to limit their risk.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box className="homepage-bottom-block">
              <Box className="homepage-bottom-info">
                The information contained in this site is provided for
                informational purposes only, and should not be construed as
                financial advice on any subject matter.
              </Box>
              <Box className="homepage-bottom-advice">
                PLEASE ALWAYS DO YOUR RESEARCH OR CONSULT A FINANCIAL ADVISER.
              </Box>
            </Box>
            <Box className="homepage-button-box">
              <Button
                className="homepage-terms-of-service-btn primary-btn-color logged-out-button-style"
                size="large"
                variant="contained"
                href="/terms-of-service"
              >
                Terms of Service
              </Button>
              <Button
                className="homepage-privacy-policy-btn primary-btn-color logged-out-button-style"
                size="large"
                variant="contained"
                href="/privacy-policy"
              >
                Privacy Policy
              </Button>
            </Box>
            <Box className="homepage-copyright">© TECH TELOS INC 2021</Box>
          </Box>
        </Box>
      </Box>
    );
}

export default LandingPage;