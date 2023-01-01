import React from "react";
import { useDispatch } from "react-redux";
import "./CartItem.css";

import { cartActions } from "../../store/cartSlice";

const CartItem = ({ item }) => {
  const { title, quantity, total, price, id } = item || {
    title: "Fallback Title",
    quantity: 0,
    total: 0,
    price: 0,
  };

  const dispatch = useDispatch();
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className="cart-item-box">
      <div className="item-name-price-quant-btn-row">
        <p className="item-name">{title}</p>
        <p className="item-total-price">
          ₹{total.toFixed(2)}
          <span className="item-price">(₹{price.toFixed(2)}/item)</span>
        </p>
      </div>
      <div className="item-name-price-quant-btn-row">
        <p className="item-quant">
          x<span>{quantity}</span>
        </p>
        <p className="item-quant-add-remove-btn">
          <button onClick={removeItemHandler} className="btn cart-btn">
            -
          </button>
          <button onClick={addItemHandler} className="btn cart-btn">
            +
          </button>
        </p>
      </div>
    </li>
  );
};

export default CartItem;
