import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientBGIcon from "./GradientBGIcon";
import { COLORS } from "../constants/theme2";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

function ImageBackgroundInfo({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  // favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) {
  const router = useRouter();
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ItemBackgroundImage}
      >
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <Pressable
              onPress={() => router.back()}
              style={{ flexDirection: "row" }}
            >
              <GradientBGIcon
                name="arrow-back"
                color={COLORS.primaryLightGreyHex}
                size={16}
                style={{ width: 100, height: 100 }}
              />
              <Text
                style={{
                  marginLeft: -30,
                  marginTop: 12,
                  opacity: 0,
                }}
              >
                AAA
              </Text>
            </Pressable>
            <TouchableOpacity
            // onPress={() => {
            //   ToggleFavourite(favourite, type, id);
            // }}
            >
              <GradientBGIcon
                name="heart"
                color={
                  // favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  COLORS.primaryLightGreyHex
                }
                size={16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBarContainerWithoutBack}>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite();
                // ToggleFavourite(favourite, type, id);
              }}
            >
              <GradientBGIcon
                name="heart"
                color={
                  // favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  COLORS.primaryLightGreyHex
                }
                size={16}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text
                  style={[
                    styles.ItemTitleText,
                    // { color: type === "Bread" ? "#d25018" : "#230C02" },
                    { color: "#d25018" },
                  ]}
                >
                  {name}
                </Text>
                <Text
                  style={[
                    styles.ItemSubtitleText,
                    // { color: type === "Bread" ? "#d25018" : "#230C02" },
                    { color: "#d25018" },
                  ]}
                >
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.ItemPropertiesContainer}>
                <View style={styles.ProperFirst}>
                  <MaterialCommunityIcons
                    name={type === "Bread" ? "cake" : "pizza"}
                    size={type === "Bread" ? 18 : 24}
                    // color={COLORS.primaryOrangeHex}
                    color="#230C02"
                  />
                  <Text
                    style={[
                      styles.PropertyTextFirst,
                      { marginTop: type === "Bread" ? 6 : 0 },
                    ]}
                  >
                    {type}
                  </Text>
                </View>
                <View style={styles.ProperFirst}>
                  <FontAwesome5
                    name={type === "Bread" ? "utensil-spoon" : "hand-paper"}
                    size={16}
                    // color={COLORS.primaryOrangeHex}
                    color="#230C02"
                  />
                  <Text style={styles.PropertyTextLast}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <AntDesign
                  name="star"
                  size={20}
                  color={COLORS.primaryOrangeHex}
                  // color="#693a27"
                />
                <Text
                  style={[
                    styles.RatingText,
                    // { color: type === "Bread" ? "#d25018" : "#230C02" },
                    { color: "#d25018" },
                  ]}
                >
                  {average_rating}
                </Text>
                <Text
                  style={[
                    styles.RatingCountText,
                    // { color: type === "Bread" ? "#d25018" : "#230C02" },
                    { color: "#d25018" },
                  ]}
                >
                  ({ratings_count})
                </Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText} onPress={() => router.back()}>
                  {roasted}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
    zIndex: 0,
  },
  ImageHeaderBarContainerWithBack: {
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ImageInfoOuterContainer: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  ImageInfoInnerContainer: {
    justifyContent: "space-between",
    gap: 15,
  },
  InfoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ItemTitleText: {
    fontWeight: "bold",
    fontSize: 24,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  ItemSubtitleText: {
    fontWeight: "600",
    fontSize: 12,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  ItemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  ProperFirst: {
    height: 55,
    width: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#FFF5E9",
  },
  PropertyTextFirst: {
    fontWeight: "600",
    fontSize: 10,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  PropertyTextLast: {
    fontWeight: "600",
    fontSize: 10,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
    marginTop: 8,
  },
  RatingContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  RatingText: {
    fontWeight: "bold",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  RatingCountText: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  RoastedContainer: {
    height: 55,
    width: 130,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#FFF5E9",
  },
  RoastedText: {
    fontWeight: "800",
    fontSize: 10,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
});
