import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
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
import { useProduct } from "../../../api/products";

const SIZES = ["S", "M", "L", "XL"];
const PRICES = ["1.38", "3.15", "4.29", "5.57"];

function ProductDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const router = useRouter();
  const { addItem } = useCart();

  // const product = products.find((p) => p.id.toString() === id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch data</Text>;
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
          source={{
            uri:
              product.image ||
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Name: {product.name}</Text>
        <Text style={styles.title}>Description: {product.description}</Text>
        <Text style={styles.title}>Roasted: {product.roasted}</Text>
        <Text style={styles.title}>Ingredients: {product.ingredients}</Text>
        <Text style={styles.title}>
          Special_ingredient: {product.special_ingredient}
        </Text>
        <Text style={styles.price}>
          Average_rating: {product.average_rating}
        </Text>
        <Text style={styles.title}>Ratings_count: {product.ratings_count}</Text>
        <Text style={styles.title}>Type: {product.type}</Text>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default ProductDetailsScreen;
