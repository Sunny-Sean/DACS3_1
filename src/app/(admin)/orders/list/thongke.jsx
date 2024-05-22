import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getListOrder, useAdminOrderList } from "../../../../api/orders";
import { formatCurrency } from "../../../../utils/helpers";

const thongke = () => {
  const { data: thongke, isLoading, error } = getListOrder();

  const {
    data: orders,
    isLoading2,
    error2,
  } = useAdminOrderList({ archived: true });

  if (isLoading || isLoading2) return <ActivityIndicator />;

  if (error || error2) {
    return <Text>Faild to fetch data</Text>;
  }

  console.log("thong ke: ", thongke);
  console.log("So don da giao: ", orders.length);
  const sodon = thongke.length;
  const tong_tien = thongke.reduce((acc, cur) => acc + cur.total, 0);
  return (
    <View>
      <Text>so don: {sodon}</Text>
      <Text>Tong Tien: {formatCurrency(tong_tien)}</Text>

      <Text>So don da giao: {orders.length}</Text>
      <Text>So don dang co: {thongke.length - orders.length}</Text>
    </View>
  );
};

export default thongke;

const styles = StyleSheet.create({});
