import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme2";
import { defaultPizzaImage } from "./ProductListItem_Admin";

function OrderItemCard({
  type,
  name,
  image,
  special_ingredient,
  size,
  price,
  quantity,
  ItemPrice,
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#f5dab5", "#b39c7f"]}
      style={styles.CardLinearGradient}
    >
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.Image}
          />
          <View>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.CardCurrency}></Text>
        </View>
      </View>
      <View style={styles.CardTableRow}>
        <View style={styles.CardTableRow}>
          <View style={styles.SizeBoxLeft}>
            <Text style={[styles.SizeText, { fontSize: 12 }]}>{size}</Text>
          </View>
          <View style={styles.PriceBoxRight}>
            <Text style={styles.PriceCurrence}>
              $ <Text style={styles.Price}>{price}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.CardTableRow}>
          <Text style={styles.CardQuantityPriceText}>
            X <Text style={styles.Price}>{quantity}</Text>
          </Text>
          <Text style={styles.CardQuantityPriceText}>
            $ {(quantity * price).toFixed(2).toString()}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default OrderItemCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: 20,
    padding: 20,
    borderRadius: 25,
  },
  CardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CardImageInfoContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  CardTitle: {
    fontWeight: "600",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CardSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.secondaryLightGreyHex,
    color: "#693a27",
  },
  CardCurrency: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#693a27",
  },
  CardPrice: {
    color: "#693a27",
    // color: "#230C02",
  },
  CardTableRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBoxLeft: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#98634e",
    height: 45,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderRightWidth: 1,
    borderRightColor: COLORS.primaryGreyHex,
  },
  SizeText: {
    fontWeight: "600",
    color: "#230C02",
  },
  PriceBoxRight: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#f6ddd3",
    height: 45,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: COLORS.primaryGreyHex,
  },
  PriceCurrence: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#693a27",
  },
  Price: {
    color: "#88310c",
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#693a27",
  },
});
