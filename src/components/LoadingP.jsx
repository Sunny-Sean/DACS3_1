import { View } from "react-native";
import { MotiView } from "@motify/components";

function LoadingIndicator({ size }) {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        elevation: 5,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        elevation: 1,
      }}
      transition={{ type: "timing", duration: 1000, repeat: 3 }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#fff",
        shadowColor: "#fff",
        elevation: 10,
      }}
    />
  );
}

function LoadingP() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#101010",
      }}
    >
      <LoadingIndicator size={100} />
    </View>
  );
}

export default LoadingP;
