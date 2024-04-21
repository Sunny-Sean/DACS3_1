import { Image, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, SPACING } from "../constants/theme2";
import CustomIcon from "./CustomIcon";

function ProfilePic({ name, color, size }) {
  return (
    <Pressable style={styles.ImageContainer}>
      <Image
        style={styles.Image}
        // source={{ uri: "../assets/app_images/avatar.png" }}
        source={require("../assets/app_images/chibi2.jpg")}
      />
    </Pressable>
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
