import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../constants/theme2";
import ProfilePic from "./ProfilePic";
import GradientBGIcon from "./GradientBGIcon";

const HeaderBar = ({ title }) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon name="home" color="#230c02" size={FONTSIZE.size_16} />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontWeight: "bold",
  },
});
