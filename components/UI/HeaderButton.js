import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.primary}
    />
  );
};
