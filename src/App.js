import React, { useEffect } from "react";
import "./App.css";

import { Cart, Header, Item, Notification } from "./container";
import { useSelector, useDispatch } from "react-redux";
// import { uiActions } from "./store/uiSlice";
import { sendCartData } from "./store/cartSlice";

function App() {
  const showCart = useSelector((state) => state.ui.cartVisible);

  //
  const notification = useSelector((state) => state.ui.notification);
  //
  const dispatch = useDispatch();
  // side effect logic
  // can be implemented in any component
  // and the data tranformation logic inside a reducer
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
  // }, [cart, dispatch]);
  // react-redux ensures that dispatch never changes
  // can be added for completness
  // console.log(notification);

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
