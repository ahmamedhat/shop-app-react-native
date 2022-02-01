import React, {useEffect , useState , useCallback} from "react";
import { FlatList , Button, ActivityIndicator , View, StyleSheet} from "react-native";
import { useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from '../../constants/colors'



const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.availableProducts);

  const [isLoading , setIsLoading] = useState(false)
  
  
  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    await dispatch(productsActions.setProducts())
    setIsLoading(false)
  }, [dispatch , setIsLoading])
  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts)
    return unsubscribe
  })
  
  useEffect( () => {
    loadProducts()
  } , [useDispatch , loadProducts])

  const onSelectHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };


  if (isLoading) {
    return <View style = {styles.centered}>
      <ActivityIndicator size = {30}/>
    </View>
  }

  return (
    <FlatList
      data={productsList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onSelect={() => {
              onSelectHandler(item.id , item.title)
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                onSelectHandler(item.id , item.title)
              }}
            />
            <Button
              color={Colors.primary}
              title="Add To Cart"
              onPress={() => {dispatch(cartActions.addToCart(item))}}
            />
          </ProductItem>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})


export default ProductsOverviewScreen;
