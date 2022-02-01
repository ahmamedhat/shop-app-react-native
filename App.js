import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import {createStore ,combineReducers , applyMiddleware} from 'redux';
import ProductsNavigation from './navigation/productsNavigation';
import cart from './store/reducers/cart';
import orders from './store/reducers/orders';
import products from './store/reducers/products';
import ReduxThunk from 'redux-thunk'


const rootReducer = combineReducers({
  products: products,
  cart: cart,
  orders: orders
})

const store = createStore(rootReducer , applyMiddleware(ReduxThunk))



export default () => {

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return ( 
    <Provider store = {store}>
      <ProductsNavigation />
    </Provider>
  );
}
