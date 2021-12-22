import React, { useState, useContext, useEffect } from "react";
import {
  Box,
} from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import GL from "./GL";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as JournalContext } from "../../context/JournalContext";
import './style.css';

export default function Index() {
  
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const { getNews } = useContext(JournalContext);
  
  const [newsList, setNewsList] = useState([]);
  const [ticker, setTicker] = useState('');
  const [limit, setLimit] = useState('');

  const setNews = (res) => {
    setNewsList(res.filter(element => element.image !== null));
  }

  useEffect(() => {
    getNews({ token, ticker, limit }).then((res) => {
      setNews(res);
    })
  }, [])

  return (
    <div>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>
      <Box className="information-page-content">    
      {Object.keys(newsList).length === 0 ? (
              <Box my={5} mb={5} textAlign='center'>
                <Box className="grid-loading-panel">
                  <Box className="spinner-loader"></Box>
                </Box>
              </Box>
      ) : (
        <>
        <Box className="separator-30p"></Box>
      <Box className="information-news-block">
                    <Box className="information-news-title">
                        NEWS
                    </Box>
                        {newsList?.map((item, index) => {
                              return (
                                      <Box key={index} className="information-news-item-wrapper">
                                          <a href={item.url} target="_blank" className="information-news-item">
                                              <Box className="information-news-item-image">
                                                  <img src={item.image} alt="news"/>
                                              </Box>
                                              <Box className="information-news-item-info">
                                                  <Box className="information-news-item-title">{item.title}</Box>
                                                  <Box className="information-news-item-description">{item.description?.length > 150 ? (item.description?.substring(0, 150) + '...') : item.description}</Box>
                                              </Box>
                                          </a>
                                      </Box>
                                  )
                            })
                        }
                </Box>
      <Box className="gainers-losers">
        <Box my={3} mb={3}>
          <GL name="Gainer"/>
        </Box>
        <Box my={3} mb={3}>
          <GL name="Loser"/>
        </Box>
        
      </Box>
                </>
        )}
      </Box>
      <Footer />
    </div>
  );
}
