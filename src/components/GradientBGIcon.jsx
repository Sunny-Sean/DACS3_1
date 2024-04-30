import { Pressable, StyleSheet, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme2";
import CustomIcon from "./CustomIcon";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

function GradientBGIcon({ name, color, size }) {
  const router = useRouter();
  return (
    // <Link href={"/(user)/menu/home"} asChild>
    <Pressable style={styles.Container} onPress={() => router.back()}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        colors={["#f5dab5", "#d1c0ad"]}
        style={styles.LinearGradient}
      >
        <CustomIcon name={name} color={color} size={size} />
      </LinearGradient>
    </Pressable>
    // </Link>
  );
}

export default GradientBGIcon;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    // borderColor: COLORS.secondaryDarkGreyHex,
    borderColor: "#afa08e",
    borderRadius: SPACING.space_12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: "hidden",
  },
  LinearGradient: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: "center",
    justifyContent: "center",
  },
});
