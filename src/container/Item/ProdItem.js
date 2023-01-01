import React from "react";
import "./ProdItem.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const ProdItem = ({ id, title, price, description }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <>
      <div className="prod-item-box">
        <div className="prod-item-row">
          <div className="prod-item-col pr-it-col-left">
            <p className="prod-item-name">{title}</p>
            <p className="prod-item-desc">{description}</p>
          </div>
          <div className="prod-item-col pr-it-col-right">
            <p className="prod-item-price">₹{price}</p>
            <p onClick={addToCartHandler} className="prod-item-add-to-cart btn">
              add to cart
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdItem;
