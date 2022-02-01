import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";


const ProductItem = (props) => {
  return (
    <TouchableOpacity onPress = {props.onSelect}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
        </View>
        <View style={styles.naming}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    height: 300,
    margin: 20,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowOpacity: 0.26,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },

  naming: {
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    marginVertical: 4,
  },

  price: {
    fontSize: 14,
    color: "#888",
  },

  actions: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProductItem;
