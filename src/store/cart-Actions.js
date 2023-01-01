import { uiActions } from "./uiSlice";

import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const databaseUrl =
        process.env.REACT_APP_realtimeDatabaseUrl + "/cart.json";
      const response = await fetch(databaseUrl);

      if (!response.ok) {
        throw new Error("Data not recieved");
      }
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching failed",
        })
      );
    }
  };
};

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
        //to avoid sending changed
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
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
          title: "Error",
          message: "Something went wrong",
        })
      );
    }

    // dispatch();
  };

  //redux creates this kind of action creator for each of the reducer function
  // return {type: " ", payload: ...}
};
