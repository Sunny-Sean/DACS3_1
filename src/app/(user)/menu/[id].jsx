import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../../../constants/theme2";
import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import ImageBackgroundInfo from "../../../components/ImageBackgroundInfo";
import PaymentFooter from "../../../components/PaymentFooter";
import { useCart } from "../../../providers/CartProvider";
import Button from "../../../components/Button";

const SIZES = ["S", "M", "L"];

function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);
  // console.log(product);
  const [fullDesc, setFullDesc] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");

  const { addItem } = useCart();

  function ToggleFavourite() {}

  function BackHandler() {
    router.back();
  }

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ title: product?.name, headerShown: false }} />
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={product.imagelink_portrait}
          type={product.type}
          id={product.id}
          favourite={product.favourite}
          name={product.name}
          special_ingredient={product.special_ingredient}
          ingredients={product.ingredients}
          average_rating={product.average_rating}
          ratings_count={product.ratings_count}
          roasted={product.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText}>{product.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText} numberOfLines={3}>
                {product.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {SIZES.map((size) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedSize(size);
                }}
                key={size}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      size === selectedSize
                        ? COLORS.primaryOrangeHex
                        : // : COLORS.primaryDarkGreyHex,
                          "#fbd09c99",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: product.type === "Bread" ? 14 : 16,
                      color:
                        size === selectedSize
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={product.price}
          buttonTitle="Add to Cart"
          buttonPressHandler={addToCart}
        />
        {/* <Button onPress={addToCart} text="Add to cart" /> */}
      </ScrollView>
    </View>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea: {
    padding: 20,
  },
  InfoTitle: {
    fontWeight: "bold",
    letterSpacing: 3,
    fontSize: 16,
    // color: COLORS.primaryLightGreyHex,
    color: "#230C02",
    marginBottom: 10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontWeight: "800",
    fontSize: 14,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
    marginBottom: 30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    // backgroundColor: COLORS.primaryDarkGreyHex,
    backgroundColor: "#f8dcb9",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
  },
  SizeText: {
    fontWeight: "600",
  },
});
