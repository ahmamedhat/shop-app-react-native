import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const CartItem = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.description}>
        <Text style = {styles.mainText}>{props.title}</Text>
        <Text style = {styles.quantitiy}>x{props.quantity}</Text>
      </View>
      <View style = {styles.action}>
        <Text style = {styles.mainText}>{props.sum}</Text>
        {props.deletable && <TouchableOpacity style = {styles.delete} onPress = {props.onDelete}>
          <Ionicons name="ios-trash" color="red" size={23} />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 7
    },

    description: {
        flexDirection: "row",
        alignItems: "center",
    },
    
    mainText: {
        fontSize: 16
    },

    quantitiy: {
        color: '#888',
        fontSize: 16,
        marginLeft: 10
    },

    action: {
        flexDirection: "row",
        alignItems: "center"
    },

    delete: {
        marginLeft: 20
    }
});

export default CartItem;
