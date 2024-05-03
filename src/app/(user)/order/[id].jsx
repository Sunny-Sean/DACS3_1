import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import OrderListItem from "../../../components/OrderListItem_User";
import OrderItemListItem from "../../../components/OrderItemListItem_User";
import { useOrderDetails } from "../../../api/orders";
import HeaderBar from "../../../components/HeaderBar";
import { useUpdateOrderSubscription } from "../../../api/orders/subscriptions";
import { COLORS } from "../../../constants/theme2";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const router = useRouter();

  const { data: order, error, isLoading } = useOrderDetails(id);
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch data</Text>;
  }

  //   console.log(order);
  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Order History" />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
      <TouchableOpacity
        style={styles.DownloadButton}
        onPress={() => router.push("/(user)/delivery")}
      >
        <Text style={styles.ButtonText}>Delivery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#EEDCC6",
  },
  DownloadButton: {
    margin: 20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    borderRadius: 20,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
  },
});
