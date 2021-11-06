import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";

import "./subscription.scss";

import { Context as AuthContext } from "../../context/AuthContext";

import { Context as SubscriptionContext } from "../../context/SubscriptionContext";

export default function Index() {
  const [availablePlans, setAvailablePlans] = useState([]);

  const {
    state: { token },
  } = React.useContext(AuthContext);

  const { createCheckout, getPlans } = React.useContext(SubscriptionContext);

  useEffect(() => {
    FetchPlans();
  }, [])

  async function FetchPlans() {
    const plans = await getPlans();
    if (plans) {
      setAvailablePlans(plans);
    }
  }

  async function handleClick(plan) {
    // make request to the checkout

    const checkoutUrl = await createCheckout({ token, planId: plan.id });
    if (checkoutUrl) {
      window.location.replace(checkoutUrl);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="app-wrapper">
        {availablePlans.map((props) => {
          return <PricingCard {...props} key={props.id} clickMe={() => handleClick(props)} />;
        })}
      </div>

      <Footer />
    </div>
  );
}

function CardDescription({ title, description }) {
  return (
    <div className="card-description">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function CardBilling({ price, recurrency, duration }) {
  return (
    <div className="card-billing">
      <p>
        <strong className="price">{price}</strong>
        <strong> / {duration}.</strong>
      </p>
    </div>
  );
}

function CardAction({ clickMe }) {
  return (
    <div className="card-action">
      <Button
        style={{
          
          color: "white",
          width: "150px",
          fontSize: "1.2rem",
        }}
        variant="contained"
        href="#"
        onClick={clickMe}
      >
        Buy Now
      </Button>
    </div>
  );
}

function PricingCard(props) {
  const { type, name, description, price, recurrency, period_unit, mostPopular, data, clickMe, id } =
    props;

  return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={name} description={description} />
      <CardBilling price={price} recurrency={recurrency} duration={period_unit} />
      <CardAction clickMe={clickMe} />
    </div>
  );
}

const cardsData = [
  {
    id: "cbdemo_premium-USD-monthly",
    type: "basic",
    title: "SwingScalper",
    description: "SwingScalper - $33.00 a Month",
    price: 33.0,
    recurrency: 33.0,
    mostPopular: false,
    duration: "month",
    data: [],
  },
  {
    id: "cbdemo_premium-USD-yearly",
    type: "basic",
    title: "SwingScalper",
    description: "SwingScalper $360 Yearly",
    price: 360.0,
    recurrency: 360.0,
    mostPopular: true,
    duration: "year",
    data: [],
  },
];
