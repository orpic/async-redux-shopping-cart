import React from "react";
import { useSelector } from "react-redux";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const showCart = useSelector((state) => state.ui.cartVisible);

  // console.log("cartItems");
  // console.log(cartItems);
  return (
    <div className="container-center">
      <div className="cart-box">
        <p className="cart-heading">your Shopping cart</p>
        <ul>
          {showCart &&
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={{
                  id: item.id,
                  title: item.title,
                  quantity: item.quantity,
                  total: item.totalPrice,
                  price: item.price,
                }}
              />
            ))}
          {!showCart && (
            <p className="show-cart-items">
              click on My Cart to show cart items
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
