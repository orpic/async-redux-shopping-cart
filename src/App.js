import React, { useEffect } from "react";
import "./App.css";

import { Cart, Header, Item, Notification } from "./container";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/uiSlice";

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
  const databaseUrl = process.env.REACT_APP_realtimeDatabaseUrl + "/cart.json";
  useEffect(() => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );
    const sendCartData = async () => {
      const response = await fetch(databaseUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Something went wrong, cart data not sent");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Added to cart",
        })
      );

      // const responseData = await response.json();
    };
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Something went wrong",
          message: "Card data not sent",
        })
      );
    });
  }, [cart, databaseUrl, dispatch]);
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
