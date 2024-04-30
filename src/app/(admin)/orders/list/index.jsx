import { ActivityIndicator, FlatList, Text } from "react-native";
// import orders from "../../../../../assets/data/orders";
import OrderListItem from "../../../../components/OrderListItem_Admin";
import { useAdminOrderList } from "../../../../api/orders";
import { useInsertOrderSubscription } from "../../../../api/orders/subscriptions";

export default function OrderScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch data</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
