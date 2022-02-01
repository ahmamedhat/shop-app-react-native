import { Colors } from "react-native/Libraries/NewAppScreen";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const screenOptionStyle = {
  headerTintColor: Colors.primary,
};


const Stack = createStackNavigator();

const OrdersNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerTitle: 'Orders',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                iconName="ios-menu"
                title="Menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                iconName="ios-cart"
                title="Cart"
                color={Colors.primary}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                iconName="ios-menu"
                title="Menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const UserNavigation = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Your Products"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                iconName="ios-menu"
                title="Menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                iconName="ios-create"
                title= "Edit" 
                color={Colors.primary}
                onPress={() => {
                  navigation.navigate("EditProduct");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />

      <Stack.Screen
        name= "EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          headerTitle: route.params ? "Edit Product" : "Add Product",
        })}
        
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function ShopNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Products"
        screenOptions={{ drawerActiveTintColor: Colors.primary }}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsNavigation}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name="ios-cart" size={23} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersNavigation}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name="ios-list" size={23} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Admin"
          component={UserNavigation}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name="ios-create" size={23} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
