import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context as SubscriptionContext } from "../../context/SubscriptionContext";
import { Context as AuthContext } from "../../context/AuthContext";

import Navbar from "../Dashboard/navbar";
import Footer from "../Dashboard/Footer";

export default function CheckoutRedirect() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const {
    state: { token },
  } = useContext(AuthContext);
  const { confirmCheckout } = useContext(SubscriptionContext);

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
      confirmCheckout({ token, id }).then((res) => {
        if (res && isMounted) {
          setConfirm(res);
          goToPage("dashboard");
        }
      });
    }

    return () => {
      isMounted = false;
    };
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
