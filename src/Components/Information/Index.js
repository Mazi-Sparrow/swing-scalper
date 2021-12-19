import React, { useState, useContext, useEffect } from "react";
import {
  Box,
} from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as JournalContext } from "../../context/JournalContext";
import './style.css';

export default function Index() {
  
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const { listJournals } = useContext(JournalContext);
  
  const [journalNewsList, setJournalNewsList] = useState([]);

  const setNews = (res) => {
    let journalNews = [];
    res.forEach(element => {
      journalNews.push.apply(journalNews, element.news);
    });
    setJournalNewsList(journalNews);
  }

  useEffect(() => {
    listJournals({ token }).then((res) => {
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
      <Box className="information-news-block">
                    <Box className="information-news-title">
                        NEWS
                    </Box>
                        {journalNewsList?.map((item, index) => {
                              return (
                                      <Box key={index} className="information-news-item-wrapper">
                                          <a href={item.url} target="_blank" className="information-news-item">
                                              <Box className="information-news-item-image">
                                                  <img src={item.image} alt="news"/>
                                              </Box>
                                              <Box className="information-news-item-info">
                                                  <Box className="information-news-item-title">{item.title}</Box>
                                                  <Box className="information-news-item-description">{item.description?.length > 300 ? (item.description?.substring(0, 300) + '...') : item.description}</Box>
                                              </Box>
                                          </a>
                                      </Box>
                                  )
                            })
                        }
                </Box>
      </Box>
      <Footer />
    </div>
  );
}
