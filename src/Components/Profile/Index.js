import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as SubscriptionContext } from "../../context/SubscriptionContext";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import { Modal } from 'react-responsive-modal';

import Footer from "../Dashboard/Footer";
import { Container, Grid, TextField } from "@mui/material";

import './style.css';

export default function Profile() {
  const {
    state: { token },
    getUser,
  } = useContext(AuthContext);
  const { cancelSubscription } = useContext(SubscriptionContext);

  const [user, setUser] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

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
  };

  const handleDeleteUserClick = async () => {
    setDeleteUserModalOpen(true);
  };
  const onCloseModal = () => setDeleteUserModalOpen(false);

  const deleteUserHandler = async () => {
    console.log("Deleting user")
  };

  // const modalRef=React.createRef();
  // useEffect(() => {
  //   if (document.getElementsByClassName('react-responsive-modal-modal')) {
  //     console.log(document.getElementsByClassName('react-responsive-modal-modal'))
  //   }
  //   if (modalRef.current) {
  //     console.log("HELLO")
  //   }
  // }, [modalRef, deleteUserModalOpen])

  return (
    <div className="profile-page">
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>
      
      <Modal
          open={deleteUserModalOpen}
          onClose={onCloseModal}
          center
          animationDuration={500}
          classNames={{modal:"delete-user-modal"}}
          data-testid="2"
          // ref={modalRef}
        >
          <Box className="delete-user-modal-container">
            <Box className="delete-user-text propt-deletion-box">
              Are you sure you want to delete your Profile?
            </Box>
            <Box className="reason-deletion-box">
              <Box className="delete-user-text reason-deletion-box">
                Please type in the reason
              </Box>
              <input className="delete-user-text reason-deletion-input"></input>
            </Box>
            <Box className="delete-user-button-box-wrapper">
              <Box className="delete-user-button-box">
                <Button 
                  className="primary-btn-color default-btn-hover default-button delete-user-button-cancel "
                  onClick={() => setDeleteUserModalOpen(false)}
                >
                  CANCEL
                </Button>
                <Button 
                  className="alert-btn-color alert-btn-hover default-button delete-user-button-delete"
                  onClick={() => deleteUserHandler()}
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Box>
      </Modal>

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
              <h1 className="profile-page-title" style={{ textAlign: "center" }}>Profile</h1>
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
          <div className="cancel-subscription-button-box">
            <Button className="navbar-button alert-btn-color alert-btn-hover" onClick={handleCancelSubscriptionClick}>
            {/* <Button className="navbar-button" onClick={() => {cancelSubscription(subscriptionId)}}> */}
                Cancel subscription
            </Button>
            <Button className="navbar-button alert-btn-color alert-btn-hover" onClick={handleDeleteUserClick}>
                Delete user
            </Button>
          </div>
        </Container>
      ) : null}
      <Footer />
    </div>
  );
}
