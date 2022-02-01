import Cart from "../../models/Cart";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  products: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let firstOrNewItem;
      const product = state.products[action.product.id];
      const addedProduct = action.product
      if (product) {
        firstOrNewItem = new Cart(
          product.quantity + 1,
          product.price,
          product.title,
          product.sum + product.price
        );
      } else {
        firstOrNewItem = new Cart(
          1,
          action.product.price,
          action.product.title,
          action.product.price
        );
      }

      return {
        ...state,
        products: { ...state.products, [addedProduct.id]: firstOrNewItem },
        totalAmount: state.totalAmount + firstOrNewItem.price,
      };

    case REMOVE_FROM_CART:
      const selectedProduct = state.products[action.id]
      let updatedCartItems
      
      if(selectedProduct.quantity > 1) {
        const updated = new Cart(selectedProduct.quantity - 1 , selectedProduct.price , selectedProduct.title , selectedProduct.sum - selectedProduct.price.toFixed(2)) 
        updatedCartItems = {...state.products , [action.id]: updated}
      }
      else {
        updatedCartItems = {...state.products}
        delete updatedCartItems[action.id]
      }
      return {...state , products: updatedCartItems , totalAmount: state.totalAmount - selectedProduct.price.toFixed(2)}

      case ADD_ORDER:
        return initialState

      case DELETE_PRODUCT:
        if (!state.products[action.id]) {
          return state
        }
      else {
          const updatedCart = state.products
          const sum = state.products[action.id].sum.toFixed(2)
          delete updatedCart[action.id]
          return {...state , products: updatedCart , totalAmount: state.totalAmount - sum}
        }
      
    default:
        return state
  }
};
