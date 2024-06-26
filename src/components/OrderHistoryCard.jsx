import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/theme2";
import OrderItemCard from "./OrderItemCard";
import { Link, useSegments } from "expo-router";
import { useMyOrderList, useOrderDetails } from "../api/orders";

function OrderHistoryCard({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
  id,
  status,
}) {
  const segment = useSegments();
  // const { data: order, isLoading, error } = (id);
  // console.log(order);
  // const { data: orders, isLoading, error } = useMyOrderList();
  // console.log(orders);

  // console.log(CartList);
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  // if (error) {
  //   return <Text>Faild to fetch data</Text>;
  // }
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
          <Text style={styles.HeaderTitle}>Order #{id}</Text>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
        </View>
        <View style={styles.PriceContainer}>
          <Text style={styles.HeaderTitle}>Status: {status}</Text>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderPrice}>${CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList?.map((data, index) => (
          <Link
            href={`/${segment[0]}/menu/${data.products.id}`}
            asChild
            key={index.toString() + data.id}
          >
            <TouchableOpacity onPress={() => {}}>
              <OrderItemCard
                type={data.products.type}
                name={data.products.name}
                image={data.products.image}
                special_ingredient={data.products.special_ingredient}
                size={data.size}
                price={data.products.price}
                quantity={data.quantity}
                //   ItemPrice={data.ItemPrice}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

export default OrderHistoryCard;

const styles = StyleSheet.create({
  CardContainer: {
    gap: 10,
  },
  CardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  HeaderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    color: "#693a27",
  },
  HeaderSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: COLORS.primaryOrangeHex,
  },
  HeaderPrice: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.primaryOrangeHex,
  },
  PriceContainer: {
    alignItems: "flex-end",
  },
  ListContainer: {
    gap: 20,
  },
});
