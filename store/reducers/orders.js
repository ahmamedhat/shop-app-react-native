import Order from "../../models/Order";
import { ADD_ORDER, SET_ORDERES } from "../actions/orders";


const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERES:
      return {
        orders: action.orders
      }

    case ADD_ORDER:
      const newOrder = new Order(
        new Date().getUTCMilliseconds().toString(),
        action.payload.cartItems,
        action.payload.totalAmount,
        new Date()
      );

      return { ...state, orders: state.orders.concat(newOrder) };
  }

  return state;
};
