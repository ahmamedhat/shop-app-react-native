import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setShowDetails((prevState) => !prevState);
      }}
    >
      <View style={styles.item}>
        <Text style={styles.total}>Total: ${props.total}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      {showDetails && (
        <View style = {styles.cartStyle}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              sum={cartItem.sum}
              title={cartItem.title}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    margin: 20,
  },

  total: {
    fontWeight: "bold",
    fontSize: 16,
  },

  date: {
    color: "#888",
    fontSize: 14,
  },

  cartStyle: {
    paddingHorizontal: 20
  }
});

export default OrderItem;
