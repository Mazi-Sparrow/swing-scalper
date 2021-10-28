import React from "react";

import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";

import Checkout from "../Checkout/Index";

import "./subscription.scss";

import { Context as AuthContext } from "../../context/AuthContext";

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);

  const [planId, setPlanId] = React.useState(null);

  function handleClick(id) {
    setPlanId(id);
  }

  return (
    <div>
      <Navbar />

      {planId ? (
        <Checkout planId={plan} />
      ) : (
        <div className="app-wrapper">
          {cardsData.map((props) => {
            return <PricingCard {...props} key={props.id} clickMe={() => handleClick(props.id)} />;
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
      <button onClick={clickMe}>BUY NOW</button>
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
    id: 1,
    type: "trial",
    title: "Trial Plan",
    description: "Lorem ipsum",
    price: 0.0,
    recurrency: 0.0,
    mostPopular: false,
    data: ["2TB Storage", "100 E-mails"],
  },
  {
    id: 2,
    type: "basic",
    title: "Basic Plan",
    description: "Lorem ipsum",
    price: 29.99,
    recurrency: 24.99,
    mostPopular: false,
    data: ["2TB Storage", "200 E-mails", "10 Accounts"],
  },
];
