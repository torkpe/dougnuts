import React from "react";

function NavBar(props) {
  const {
    doughnutPhoto,
    doughnutName,
    doughnutPrice,
    key: doughnutId,
  } = props.doughnut;

  return (
    <div className={`doughnut-card ${props.styleCard ? props.styleCard : ''}`} key={doughnutId}>
      <img className={`${props.styleImage ? props.styleImage : ''}`}
        src={doughnutPhoto}
        alt={doughnutPhoto}
      />
      <div className="doughnuts-card-body">
        <div className="doughnut-name">
          {doughnutName}
        </div>
        <div className="doughnut-price">
          {props.formatCostForDisplay(doughnutPrice)}
        </div>
        <div className="doughnuts-add-to-cart">
          {
            props.doughnutInCart ?
            <button className="btn btn__add-to-cart" onClick={(e) => props.cartTransactions(e, doughnutId)}>
              Remove from cart
            </button>
              :
            <button className="btn btn__add-to-cart" onClick={(e) => props.cartTransactions(e, doughnutId)}>
            Add to cart
          </button>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
