import React from "react";
import "./cart.css";
import DoughnutCard from "../DoughnutCard";

function Item (props) {
  const { doughnut, doughnutInCart } = props;
  return (
    <div className="cart-item">
      <div className="cart-card">
        <DoughnutCard
          doughnut={doughnut}
          cartTransactions={props.cartTransactions}
          doughnutsInCart={props.doughnutsInCart}
          doughnutInCart={doughnutInCart}
          styleImage="dougnut-image__cart"
          styleCard="doughnut-card__cart"
          formatCostForDisplay={props.formatCostForDisplay}
        />
      </div>
      <div className="cart-transaction">
        <div className="cart-transaction-btn">
          <button className="cart-transaction-button" onClick={() => props.increaseOrDecreaseDoughnutQuantity(doughnutInCart, true)}>
            +
          </button>
          <button className="cart-transaction-button" onClick={() => props.increaseOrDecreaseDoughnutQuantity(doughnutInCart, false)}>
            -
          </button>
        </div>
        <span className="cart-item__quantity">Quantity: {doughnutInCart.doughnutQuantity}</span>
      </div>
    </div>
  );
}

export default Item;
