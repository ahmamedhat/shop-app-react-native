import React, { useEffect, useState , useCallback} from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "../../store/actions/orders";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true)
    await dispatch(ordersActions.fetchOrders());
    setIsRefreshing(false)
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true)
    loadOrders();
    setIsLoading(false)
  }, [dispatch, loadOrders]);

  const orders = useSelector((state) => state.orders.orders);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      onRefresh={loadOrders}
      refreshing = {isRefreshing}
      renderItem={({ item }) => {
        return (
          <OrderItem
            total={item.totalAmount}
            date={item.structuredDate}
            items={item.items}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
