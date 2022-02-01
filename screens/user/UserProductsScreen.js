import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const deleteHandler = (id) => {
    Alert.alert(
      "Are you sure?",
      "This product will be deleted permanently.",[
      { text: "No", style: "cancel" },
      { text: "Yes", style: "destructive", onPress: () => {dispatch(productsActions.deleteProduct(id))} }]
    );
  };

  const products = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id) => {
    return props.navigation.navigate("EditProduct", { id, test2: "test" });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            onSelect={() => {
              selectItemHandler(item.id);
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                selectItemHandler(item.id);
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                deleteHandler(item.id)
              }}
            />
          </ProductItem>
        );
      }}
    />
  );
};

export default UserProductsScreen;
