import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../constants/theme2";
import ProfilePic from "./ProfilePic";
import GradientBGIcon from "./GradientBGIcon";
import { useSegments } from "expo-router";

const HeaderBar = ({ title, id }) => {
  const segment = useSegments();
  // console.log(segment);
  const disNone = segment[2] === "home" && segment[1] === "menu";
  const disNone2 = segment[1] === "profile2";
  return (
    <View style={styles.HeaderContainer}>
      {disNone ? (
        <GradientBGIcon name="home" color="#230c02" size={FONTSIZE.size_16} />
      ) : (
        <GradientBGIcon
          name="arrow-back"
          color="#230c02"
          size={FONTSIZE.size_16}
        />
      )}

      <Text style={styles.HeaderText}>{id ? `Order #${id}` : title}</Text>
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
    textAlign: "center",
    // flex: 1,
  },
});
