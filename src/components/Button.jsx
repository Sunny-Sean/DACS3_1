import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";
import { color } from "react-native-elements/dist/helpers";

const Button = forwardRef(({ text, disabled, ...pressableProps }, ref) => {
  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      disabled={disabled}
      style={[styles.container]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Button;
