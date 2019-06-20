import React from "react";
import { Link } from "react-router-dom";
import doughnut from "../assets/img/doughnuts.png";
import { steps } from "../helpers/constants";

function NavBar(props) {
  return (
    <div className="nav-bar">
      <div className="nav-bar-img">
        <img src={doughnut} alt="dougnuts" />
      </div>
      <ul className="nav-tabs">
        <li><Link to='' onClick={() => props.toggleModal(steps[0])}>Cart {
          props.numberOfItemsInCart
        ? props.numberOfItemsInCart : ''}</Link></li>
        <li><Link to=''>Contact</Link></li>
      </ul>
    </div>
  );
}

export default NavBar;
