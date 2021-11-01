import React, { useState, useEffect, useContext } from "react";

import { Context as SubscriptionContext } from "../../context/SubscriptionContext";
import { Context as AuthContext } from "../../context/AuthContext";

import Navbar from "../Dashboard/navbar";
import Footer from "../Dashboard/Footer";

export default function CheckoutRedirect() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { confirmCheckout } = useContext(SubscriptionContext);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
      confirmCheckout({ token, id }).then((res) => setConfirm(res));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ height: "70vh" }}>
        {!confirm ? <h1 style={{ textAlign: "center" }}>Loading ...</h1> : <h1>Success</h1>}
      </div>
      <Footer />
    </div>
  );
}
