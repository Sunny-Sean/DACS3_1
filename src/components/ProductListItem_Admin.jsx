import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }) => {
  // Lấy thông tin tuyến đường
  const segment = useSegments();
  // console.log(product);
  // console.log(segment);

  return (
    <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
          }
          style={styles.image}
          resizeMode="contain"
        />
        {/* <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cbd5e1",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: "#22d3ee",
    fontWeight: "bold",
  },
});
