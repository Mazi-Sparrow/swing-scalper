import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "../Dashboard/Footer";
import { Container, Grid, TextField } from "@mui/material";

export default function Profile() {
  const {
    state: { token },
    getUser,
  } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      getUser({ token }).then((res) => setUser(res));
    }
  }, []);

  return (
    <div>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

      {user ? (
        <Container
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            // border: "grey 1px solid",
            borderRadius: "3px",
          }}
        >
          <div style={{ height: "70vh" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button className="navbar-button" href="/subscription">
                Subscription
              </Button>
              <h1 style={{ textAlign: "center" }}>Profile</h1>
              <div></div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "5px",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              <label style={{ width: "20%" }}>First Name:</label>
              <TextField
                style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
                value={user.firstname || ""}
                variant="outlined"
                color="secondary"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "5px",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              <label style={{ width: "20%" }}>Last Name:</label>
              <TextField
                value={user.lastname || ""}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "5px",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              <label style={{ width: "20%" }}>Email: </label>
              <TextField
                value={user.email || ""}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
              />
            </div>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "5px",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              <label style={{ width: "20%" }}>Subscription plan: </label>
              <TextField
                value={user.subscriptions.length !== 0 ? user.subscriptions[0].name : ""}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
              />
            </div>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "5px",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              <label style={{ width: "20%" }}>Subscription plan description: </label>
              <TextField
                value={user.subscriptions.length !== 0 ? user.subscriptions[0].description : ""}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
              />
            </div>
          </div>
        </Container>
      ) : null}
      <Footer />
    </div>
  );
}
