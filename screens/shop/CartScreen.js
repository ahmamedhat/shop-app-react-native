import React from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => {

    const productsList = [];
    for (const key in state.cart.products) {
      const product = state.cart.products[key];
      productsList.push({
        id: key,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        sum: product.sum,
      });
    }
    return productsList;
  });

  const cartTotal = useSelector((state) => state.cart.totalAmount);

  return (
    <View style={styles.cart}>
      <View style={styles.summary}>
        <Text style={styles.total}>
          Total: <Text style={styles.totalPrice}>${cartTotal.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.primary}
          title="Place Order"
          disabled={products.length === 0}
          onPress = {() => dispatch(orderActions.addOrder(products , cartTotal))}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(products) => products.id}
        renderItem={({ item }) => {
          return (
            <CartItem
              title={item.title}
              quantity={item.quantity}
              sum={item.sum}
              deletable
              onDelete={() => {
                dispatch(cartActions.removeFromCart(item.id));
              }}
            />
          );
        }}
      />
    </View>
  );
};


CartScreen.defaultNavigationOptions = {
  headerTitle: 'Cart'
}


const styles = StyleSheet.create({
  cart: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  total: {
    fontSize: 18,
  },
  totalPrice: {
    color: Colors.primary,
    fontSize: 16,
  },
});

export default CartScreen;
