import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const Button = ({ title, onPress, isValid, loader, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(!isValid ? COLORS.gray : COLORS.primary)}
      disabled={disabled}
    >
      {!loader ? (
        <Text style={styles.btnTxt}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontWeight: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: backgroundColor,
    backgroundColor: "#EEDCC6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
