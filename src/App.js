import React, { useEffect } from "react";
import "./App.css";

import { Cart, Header, Item, Notification } from "./container";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.cartVisible);

  //can be done in any component
  // having side effect logic in a component
  //and the data tranformation logic inside a reducer
  const cart = useSelector((state) => state.cart);
  const databaseUrl = process.env.REACT_APP_realtimeDatabaseUrl + "/cart.json";
  useEffect(() => {
    fetch(databaseUrl, {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <>
      <Notification />
      <Header />
      {showCart && <Cart />}
      <Item />
    </>
  );
}

export default App;
