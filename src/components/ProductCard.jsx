import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTFAMILY } from "../constants/theme2";
import { AntDesign } from "@expo/vector-icons";
import BGIcon from "./BGIcon";
import { Link, useSegments } from "expo-router";
import { useCart } from "../providers/CartProvider";
import products from "../../assets/data/products";
import { defaultPizzaImage } from "./ProductListItem_Admin";
import { useProduct } from "../api/products";
import RemoteImage from "./RemoteImage";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

function ProductCard({
  id,
  type,
  roasted,
  image,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) {
  const { addItem } = useCart();
  const segment = useSegments();
  const { data: product } = useProduct(id);

  const addToCart = () => {
    addItem(product, "S");
    // router.push("/cart");
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  // console.log(segment);

  return (
    <Link href={`/${segment[0]}/menu/${id}`}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.CardLinearGradientContainer}
        colors={["#f5dab5", "#b39c7f"]}
      >
        <RemoteImage
          path={image}
          fallback={
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
          }
          style={styles.CardImageBG}
          resizeMode="contain"
        >
          <View style={styles.CardRatingContainer}>
            <AntDesign name="star" size={16} color={"#230C02"} />
            <Text style={styles.CardRatingText}>{average_rating}</Text>
          </View>
        </RemoteImage>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
        <View style={styles.CardFooterRow}>
          <Text style={styles.CardPriceCurrency}>
            $<Text style={styles.CartPrice}>{price}</Text>
          </Text>
          <TouchableOpacity onPress={addToCart}>
            <BGIcon
              color={COLORS.primaryWhiteHex}
              name="add"
              // BGColor={COLORS.primaryOrangeHex}
              BGColor="#693a27"
              size={10}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Link>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: 15,
    borderRadius: 25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  CardRatingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 15,
    position: "absolute",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontWeight: "600",
    color: COLORS.primaryWhiteHex,
    // color: "#230C02",
    lineHeight: 22,
    fontSize: 14,
  },
  CardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  CardTitle: {
    fontWeight: "600",
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontSize: 16,
  },
  CardSubtitle: {
    fontWeight: "500",
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontSize: 10,
  },
  CardPriceCurrency: {
    fontWeight: "bold",
    color: COLORS.primaryOrangeHex,
    color: "#693a27",
    fontSize: 18,
  },
  CartPrice: {
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
});
