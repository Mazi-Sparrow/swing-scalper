import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { makeStyles } from "@mui/styles";
import ModalVideo from 'react-modal-video'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ContactUsContext } from "../../context/ContactUsContext";
import '../../../node_modules/react-modal-video/css/modal-video.css';
import './style.css';

import firstVideoImage from '../../assets/images/FirstVideoBackground.png'
import secondVideoImage from '../../assets/images/SecondVideoBackground.png'
import thirdVideoImage from '../../assets/images/ThirdVideoBackground.png'


const initialState = {
  title: "",
  details: "",
  email: "",
  emailError: false,
  titleError: false,
  detailsError: false,
};

export default function Index() {

  const [isFirstVideoOpen, setFirstVideoOpen] = React.useState(false)
  const [isSecondVideoOpen, setSecondVideoOpen] = React.useState(false)
  const [isThirdVideoOpen, setThirdVideoOpen] = React.useState(false)

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { errorMessage, isLoading },
    clearErrorMessage,
    contactUs,
  } = useContext(ContactUsContext);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    clearErrorMessage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({ ...state, titleError: false });
    if (!state.details) setState({ ...state, detailsError: true });
    if (!state.title) setState({ ...state, titleError: true });

    if (state.title && state.details) {
      contactUs({ title: state.title, message: state.details, token }).then((res) => {
        setState({ ...state, ...initialState });
      });
    }
  };
  return (
    <div>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

<Box className="information-page-content">
      <Box className="information-page-main-content">
        <Box className="information-background">
        <Box className="information-page-leftside information-page-video-list">
          <Box className="video-list-title">SwingScalp Videos</Box>
          <Box className="first-video-popup video-popup">
            <Box className="information-page-video first-video" style={{ backgroundImage: `url(${firstVideoImage})`, backgroundSize: 'contain' }} onClick={() => { setFirstVideoOpen(true) }}>
                <div className="information-watch-app-demo-play-button" onClick={() => { setFirstVideoOpen(true) }}></div>
            </Box>
            <ModalVideo channel='youtube' autoplay isOpen={isFirstVideoOpen} videoId="kUlffl8j3Es" onClose={() => setFirstVideoOpen(false)} />
          </Box>
          <Box className="second-video-popup video-popup">
          <Box className="information-page-video second-video" style={{ backgroundImage: `url(${secondVideoImage})`, backgroundSize: 'contain' }} onClick={() => { setSecondVideoOpen(true) }}>
                <div className="information-watch-app-demo-play-button" onClick={() => { setSecondVideoOpen(true) }}></div>
            </Box>
            <ModalVideo channel='youtube' autoplay isOpen={isSecondVideoOpen} videoId="kUlffl8j3Es" onClose={() => setSecondVideoOpen(false)} />
          </Box>
          <Box className="third-video-popup video-popup">
          <Box className="information-page-video third-video" style={{ backgroundImage: `url(${thirdVideoImage})`, backgroundSize: 'contain' }} onClick={() => { setThirdVideoOpen(true) }}>
                <div className="information-watch-app-demo-play-button" onClick={() => { setThirdVideoOpen(true) }}></div>
            </Box>
            <ModalVideo channel='youtube' autoplay isOpen={isThirdVideoOpen} videoId="kUlffl8j3Es" onClose={() => setThirdVideoOpen(false)} />
          </Box>
        </Box>
        <Box className="information-page-separator"></Box>
        <Box className="information-page-rightside information-page-contact-form">
        <Box className="contact-us-form-title">Contact us</Box>
          <form className="information-page-form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              onChange={(e) => setState({ ...state, title: e.target.value })}
              className="form-field information-page-form-field"
              variant="outlined"
              fullWidth
              label="Title"
              required
              value={state.title}
              error={state.titleError}
            />

            <TextField
              onChange={(e) => setState({ ...state, details: e.target.value })}
              className="form-field information-page-form-field"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              label="Message"
              required
              value={state.details}
              error={state.detailsError}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              className="primary-btn-color default-btn-hover"
              endIcon={<SendIcon />}
            >
              {isLoading ? (
                <CircularProgress size={20} style={{ marginRight: "5px" }} />
              ) : null}
              Send
            </Button>
          </form>
        </Box>
        </Box>
      </Box>
      <Box className="information-faq-title">Frequently Asked Questions</Box>
      <Box className="information-faq-content">
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
        <Accordion className="information-accordion">
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
    </Box>
    <Footer />
    </div>
  );
}
