import React, { useEffect } from "react";
import "./App.css";

import { Cart, Header, Item, Notification } from "./container";
import { useSelector, useDispatch } from "react-redux";
// import { uiActions } from "./store/uiSlice";
import { sendCartData, fetchCartData } from "./store/cart-Actions";

let isInitial = true;

function App() {
  //
  //
  // side effect logic
  // can be implemented in any component
  // and the data tranformation logic inside a reducer
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header />
      {showCart && <Cart />}
      <Item />
    </>
  );
}

export default App;
