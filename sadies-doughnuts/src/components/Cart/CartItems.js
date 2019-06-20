import React from "react";
import Item from "./Item";
import "./cart.css";

function CartItems(props) {
  const { doughnutsInCart, doughnuts } = props;

  const getDoughnut = (doughnutId) => {
    return doughnuts.find(doughnut => doughnut.key === doughnutId)
  }

  return (
    <div className="cart-items">
      {doughnutsInCart.map(doughnut =>
        <Item key={doughnut.doughnutId}
          doughnut={getDoughnut(doughnut.doughnutId)}
          doughnutsInCart={doughnut.doughnutsInCart}
          doughnutInCart={props.getDoughnutInCart(doughnut.doughnutId)}
          cartTransactions={props.cartTransactions}
          increaseOrDecreaseDoughnutQuantity={props.increaseOrDecreaseDoughnutQuantity}
          formatCostForDisplay={props.formatCostForDisplay}
        />
      )}
    </div>
  );
}

export default CartItems;
