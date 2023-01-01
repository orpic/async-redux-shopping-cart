import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

//after the slice
//this sendCartData immediately without doing anything returns another function
// async one
//
// we dispatch notification
// another nested function for sending http request
// called insisde a try catch
// notification with succeess and error

//where do we call it
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const databaseUrl =
        process.env.REACT_APP_realtimeDatabaseUrl + "/cart.json";
      const response = await fetch(databaseUrl, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Something went wrong, cart data not sent");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Added to cart",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Something went wrong",
          message: "Card data not sent",
        })
      );
    }

    // dispatch();
  };

  //redux creates this kind of action creator for each of the reducer function
  // return {type: " ", payload: ...}
};

export const cartActions = cartSlice.actions;

export default cartSlice;
