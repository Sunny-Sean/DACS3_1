import { Image, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, SPACING } from "../constants/theme2";
import CustomIcon from "./CustomIcon";
import { Link } from "expo-router";

function ProfilePic({ name, color, size }) {
  return (
    <Link href={"/cart"} asChild>
      <Pressable style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={require("../assets/app_images/cart.png")}
        />
      </Pressable>
    </Link>
  );
}

export default ProfilePic;

const styles = StyleSheet.create({
  ImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 2,
    // borderColor: COLORS.secondaryDarkGreyHex,
    borderColor: "#afa08e",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  Image: {
    height: 36,
    width: 36,
  },
});
