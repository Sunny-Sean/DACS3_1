import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme2";
import { defaultPizzaImage } from "./ProductListItem_Admin";
import { Link, Stack, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

export default function OrderItemListItem({ item }) {
  const segment = useSegments();
  return (
    <Link href={`/${segment[0]}/menu/${item.products.id}`} asChild>
      <Pressable style={styles.ScreenContainer}>
        <View style={styles.ListContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#f5dab5", "#b39c7f"]}
            style={styles.CardLinearGradient}
          >
            <View style={styles.CardInfoContainer}>
              <View style={styles.CardImageInfoContainer}>
                {/* <Image
                  source={{
                    uri:
                      item.products.image ||
                      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
                  }}
                  style={styles.Image}
                /> */}
                <RemoteImage
                  path={item.products.image}
                  fallback={
                    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
                  }
                  style={styles.Image}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.CardTitle}>{item.products.name}</Text>
                  <Text style={styles.CardSubtitle}>
                    {item.products.special_ingredient}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.CardCurrency}></Text>
              </View>
            </View>
            <View style={styles.CardTableRow}>
              <View style={styles.CardTableRow}>
                <View style={styles.SizeBoxLeft}>
                  <Text style={[styles.SizeText, { fontSize: 12 }]}>
                    {item.size}
                  </Text>
                </View>
                <View style={styles.PriceBoxRight}>
                  <Text style={styles.PriceCurrence}>
                    $ <Text style={styles.Price}>{item.products.price}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.CardTableRow}>
                <Text style={styles.CardQuantityPriceText}>
                  X <Text style={styles.Price}>{item.quantity}</Text>
                </Text>
                <Text style={styles.CardQuantityPriceText}>
                  ${" "}
                  {(item.quantity * item.products.price).toFixed(2).toString()}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
  },
  ListContainer: {
    gap: 20,
    padding: 10,
  },
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
