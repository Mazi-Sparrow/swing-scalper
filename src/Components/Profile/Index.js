import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as SubscriptionContext } from "../../context/SubscriptionContext";
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
  const { cancelSubscription } = useContext(SubscriptionContext);

  const [user, setUser] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState('');

  useEffect(() => {
    if (token) {
      getUser({ token }).then((res) => setUser(res));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // console.log(user);
      // console.log(user.subscriptions[0].id);
      setSubscriptionId(user.subscriptions[0].id)
    }
  }, [user])

  const handleCancelSubscriptionClick = async () => {
    const isSuccess = await cancelSubscription({
      id: subscriptionId,
      token,
    })
    if (isSuccess) {
      getUser({ token }).then((res) => setUser(res));
    }
    console.log(isSuccess);
  }

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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button className="navbar-button primary-btn-color default-btn-hover default-button" href="/subscription">
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
          <div className="cancel-subction-button-box">
            <Button className="navbar-button primary-btn-color default-btn-hover" onClick={handleCancelSubscriptionClick}>
            {/* <Button className="navbar-button" onClick={() => {cancelSubscription(subscriptionId)}}> */}
                Cancel subscription
            </Button>
          </div>
        </Container>
      ) : null}
      <Footer />
    </div>
  );
}
