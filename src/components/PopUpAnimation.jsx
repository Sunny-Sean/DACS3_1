import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/theme2";
import LottieView from "lottie-react-native";

function PopUpAnimation({ style, source }) {
  return (
    <View style={styles.LottieAnimationContainer}>
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
}

export default PopUpAnimation;

const styles = StyleSheet.create({
  LottieAnimationContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: "center",
    backgroundColor: COLORS.secondaryBlackRGBA,
  },
});
