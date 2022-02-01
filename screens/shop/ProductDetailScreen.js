import React from "react";
import {
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector , useDispatch} from "react-redux";
import * as actions from "../../store/actions/cart"


const ProductDetailScreen = (props) => {

  const dispatch = useDispatch()

  const id = props.route.params.productId
  const selectedProduct = useSelector((state) => {
    return state.products.availableProducts.find((prod) => prod.id === id);
  });

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <View style = {styles.actions}>
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => {dispatch(actions.addToCart(selectedProduct))}}
        />
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  console.log(navData)
  return {
    headerTitle: navData.route.params.productTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },

  price: {
    color: "#888",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
  },

  description: {
    marginHorizontal: 18,
    fontSize: 20,
    textAlign: "center",
  },

  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
