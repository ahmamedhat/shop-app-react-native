import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.data,
        userProducts: action.data.filter((prod) => prod.ownerId === "u1")
      }

    case ADD_PRODUCT:
      const newProduct = new Product(
        action.product.id,
        "u1",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );

      return {
        ...state ,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }
    case EDIT_PRODUCT:
      const productIndex1 = state.userProducts.findIndex(prod => prod.id === action.product.id)
      const productIndex2 = state.availableProducts.findIndex(prod => prod.id === action.product.id)
      const oldProduct1 = state.userProducts[productIndex1]
      const updatedUserProds = [...state.userProducts]
      const updatedAvailableProds = [...state.availableProducts]

      const updatedProduct = new Product(
        action.product.id,
        oldProduct1.ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        oldProduct1.price
      );

      updatedUserProds[productIndex1] = updatedProduct
      updatedAvailableProds[productIndex2] = updatedProduct

      return {
        ...state ,
        availableProducts: updatedAvailableProds,
        userProducts: updatedUserProds
      }



    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id
        ),
      };
  }

  return state;
};
