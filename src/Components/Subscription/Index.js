import React from "react";
import Button from "@mui/material/Button";

import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";

import Checkout from "../Checkout/Index";

import "./subscription.scss";

import { Context as AuthContext } from "../../context/AuthContext";

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);

  const [plan, setPlan] = React.useState(null);

  function handleClick(id) {
    setPlan(id);
  }

  return (
    <div>
      <Navbar />

      {plan ? (
        <Checkout plan={plan} />
      ) : (
        <div className="app-wrapper">
          {cardsData.map((props) => {
            return <PricingCard {...props} key={props.id} clickMe={() => handleClick(props)} />;
          })}
        </div>
      )}

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

function CardBilling({ price, recurrency }) {
  return (
    <div className="card-billing">
      <p>
        <strong className="price">$ {price}</strong>
        <strong> / mo.</strong>
      </p>
      <p>
        <span className="recurrency">Billed Anually or $ {recurrency}/monthly</span>
      </p>
    </div>
  );
}

function CardFeatures({ data }) {
  return (
    <div className="card-features">
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

function CardAction({ clickMe }) {
  return (
    <div className="card-action">
      <Button
        style={{ backgroundColor: "#9F3D65", color: "white", width: "150px", fontSize: "1.2rem" }}
        variant="contained"
        href="#"
        onClick={clickMe}
      >
        Buy Now
      </Button>
      {/* <button onClick={clickMe}>BUY NOW</button> */}
    </div>
  );
}

function PricingCard(props) {
  const { type, title, description, price, recurrency, mostPopular, data, clickMe, id } = props;

  return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={title} description={description} />
      <CardBilling price={price} recurrency={recurrency} />
      <CardFeatures data={data} />
      <CardAction clickMe={clickMe} />
    </div>
  );
}

const cardsData = [
  {
    id: "SwingScalp-Trial",
    type: "trial",
    title: "SwingScalp Trial",
    description: "SwingScalp Trial - $12.99 for 14 Days",
    price: 12.99,
    recurrency: 12.99,
    mostPopular: false,
    data: [],
  },
  {
    id: "SwingScalper",
    type: "basic",
    title: "SwingScalper",
    description: "SwingScalper - $33.00 a Month",
    price: 33.0,
    recurrency: 33.0,
    mostPopular: true,
    data: [],
  },
];
