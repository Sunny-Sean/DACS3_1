import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/theme2";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { defaultPizzaImage } from "./ProductListItem_Admin";
import RemoteImage from "./RemoteImage";

export default function CartIt({ cartItem }) {
  const { updateQuantity } = useCart();
  // console.log(cartItem);
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        colors={["#f5dab5", "#b39c7f"]}
        style={styles.CartItemSingleLinearGradient}
      >
        <View>
          {/* <Image
            source={{ uri: cartItem.product.image || defaultPizzaImage }}
            style={styles.CartItemSingleImage}
          /> */}
          <RemoteImage
            path={cartItem.product.image}
            fallback={
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
            }
            style={styles.CartItemSingleImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.CartItemSingleInfoContainer}>
          <View>
            <Text style={styles.CartItemTitle}>{cartItem.product.name}</Text>
            <Text style={styles.CartItemSubtitle}>
              {cartItem.product.special_ingredient}
            </Text>
          </View>
          <View style={styles.CartItemSingleSizeValueContainer}>
            <View style={styles.SizeBox}>
              <Text
                style={[
                  styles.SizeText,
                  // { fontSize: type === "Pizza" ? 12 : 16 },
                  { fontSize: 14 },
                ]}
              >
                {cartItem.size}
              </Text>
            </View>
            <Text style={styles.SizeCurrency}>
              $<Text style={styles.SizePrice}>{cartItem.product.price}</Text>
            </Text>
          </View>
          <View style={styles.CartItemSingleQuantityContainer}>
            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => updateQuantity(cartItem.id, -1)}
            >
              <Entypo name="minus" size={10} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
            <View style={styles.CartItemQuantityContainer}>
              <Text style={styles.CartItemQuantityText}>
                {cartItem.quantity}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.CartItemIcon}
              onPress={() => updateQuantity(cartItem.id, 1)}
            >
              <Entypo name="plus" size={10} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 25,
  },
  CartItemRow: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  CartItemTitle: {
    fontWeight: "600",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CartItemSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.primaryDarkGreyHex,
    backgroundColor: "#693a27",
  },
  CartItemRoastedText: {
    fontWeight: "800",
    fontSize: 10,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBox: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#693a27",
    height: 40,
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeText: {
    fontWeight: "600",
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryOrangeHex,
    color: "#693a27",
  },
  SizePrice: {
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CartItemIcon: {
    // backgroundColor: COLORS.primaryOrangeHex,
    backgroundColor: "#693a27",
    padding: 12,
    borderRadius: 10,
  },
  CartItemQuantityContainer: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#693a27",
    width: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    // color: "#230C02",
  },
  CartItemSingleLinearGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  CartItemSingleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
