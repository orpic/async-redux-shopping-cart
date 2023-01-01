import React from "react";
import "./Header.css";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const Header = () => {
  const dispatch = useDispatch();

  const cardQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <div className="header">
      <p className="logo">Redux Shopping Cart</p>
      <button onClick={toggleCartHandler} className="btn">
        My Cart <span className="cart-quantity">{cardQuantity}</span>
      </button>
    </div>
  );
};

export default Header;
