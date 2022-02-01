import Product from "../../models/Product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = () => {
  return async (dispatch) => {
    const restData = await fetch(
      "https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    const transformedData = await restData.json();

    const dataArray = [];
    for (const key in transformedData) {
      dataArray.push(
        new Product(
          key,
          "u1",
          transformedData[key].title,
          transformedData[key].imageUrl,
          transformedData[key].description,
          transformedData[key].price
        )
      );
    }

    dispatch({ type: SET_PRODUCTS, data: dataArray });
  };
};

export const addProduct = (title, price, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const data = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      product: {
        id: data.name,
        title,
        price,
        description,
        imageUrl,
      },
    });
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(
      `https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: EDIT_PRODUCT,
      product: {
        id,
        title,
        description,
        imageUrl,
      },
    });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await fetch(
      `https://mobileshop-4e0a9-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_PRODUCT, id });
  };
};
