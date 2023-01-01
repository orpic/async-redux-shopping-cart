import React from "react";
import "./App.css";

import { Cart, Header, Item, Notification } from "./container";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.cartVisible);
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
