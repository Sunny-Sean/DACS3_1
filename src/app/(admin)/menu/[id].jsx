import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import products from "../../../../assets/data/products";
import defaultPizzaImage from "../../../components/ProductListItem_Admin";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { useCart } from "../../../providers/CartProvider";
import Colors from "../../../constants/Colors";

const SIZES = ["S", "M", "L", "XL"];
const PRICES = ["1.38", "3.15", "4.29", "5.57"];

function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCart();

  const product = products.find((p) => p.id.toString() === id);

  const [selectedSize, setSelectedSize] = useState("S");
  // const [selectedNumbber, setSelectedNumber] = useState(0);

  // useEffect(() => {
  //   const numberSize = SIZES.indexOf(selectedSize);
  //   setSelectedNumber(numberSize);
  // }, [selectedSize]);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <Stack.Screen
          options={{
            title: "Menu",
            headerRight: () => (
              // Truyền id như tham số tìm kiếm
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Entypo
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen options={{ title: product?.name }} />
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.title}>{product.description}</Text>
        <Text style={styles.title}>{product.roasted}</Text>
        <Text style={styles.title}>{product.ingredients}</Text>
        <Text style={styles.title}>{product.special_ingredient}</Text>
        <Text style={styles.price}>{product.average_rating}</Text>
        <Text style={styles.title}>{product.ratings_count}</Text>
        <Text style={styles.title}>{product.type}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {/* <Button onPress={addToCart} text="Add to cart" /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default ProductDetailsScreen;
