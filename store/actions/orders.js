import Order from '../../models/Order'

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERES = "SET_ORDERS"



export const fetchOrders = () => {
  return async dispatch => {
    const response = await fetch(
      `https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json`,
      {
        method: "GET",
      }
    );
    
    const resData = await response.json()
    const ordersArray = []
    for (const key in resData) {
      ordersArray.push(new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)))
    }

    dispatch({type: SET_ORDERES , orders: ordersArray})

  }


}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date()
    const response = await fetch(
      `https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        }),
      }
    );
    const responseData = await response.json()
    dispatch({
      type: ADD_ORDER,
      payload: {id: responseData.name, cartItems, totalAmount , date},
    });
  }
};
