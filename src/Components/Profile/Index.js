import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import Navbar from "../Dashboard/navbar";
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
      <Navbar />
      {user ? (
        <Container
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            border: "grey 1px solid",
            borderRadius: "3px",
          }}
        >
          <div style={{ height: "70vh" }}>
            <h1 style={{ textAlign: "center" }}>Profile</h1>
            <TextField
              style={{ marginTop: "10px", marginBottom: "10px" }}
              value={user.firstname || ""}
              variant="outlined"
              color="secondary"
              fullWidth
            />
            <TextField
              value={user.lastname || ""}
              variant="outlined"
              color="secondary"
              fullWidth
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <TextField
              value={user.email || ""}
              variant="outlined"
              color="secondary"
              fullWidth
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
          </div>
        </Container>
      ) : null}
      <Footer />
    </div>
  );
}
