import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getListOrder, useAdminOrderList } from "../../../../api/orders";
import { formatCurrency, getToday } from "../../../../utils/helpers";
import LineChart2 from "../../../../components/LineChart2";
import Button from "../../../../components/Button";
import { subDays } from "date-fns";
import { supabase } from "../../../../lib/supabase";

const statistical = () => {
  const [numDays, setNumDays] = useState("7");
  const [days, setDays] = useState(7);
  const [soDon, setSodon] = useState(0);
  const [tongTien, setTongTien] = useState(0);
  const [thongke2, setThongKe2] = useState(null);
  // const { data: thongke, isLoading, error } = getListOrder(7);

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: orders,
    isLoading2,
    error2,
  } = useAdminOrderList({ archived: true });

  const fetchData = async (date) => {
    const queryDate2 = subDays(new Date(), date).toISOString();
    try {
      const { data: thongke, error } = await supabase
        .from("orders")
        .select("created_at, status, total")
        .gte("created_at", queryDate2)
        .lte("created_at", getToday({ end: true }));
      setThongKe2(thongke);
      setSodon(thongke.length);
      setTongTien(thongke.reduce((acc, cur) => acc + cur.total, 0));
      setError(error);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(days);
  }, [days]);

  if (isLoading || isLoading2) return <ActivityIndicator />;

  if (error || error2) {
    return <Text>Faild to fetch data</Text>;
  }

  const handleThongKe = () => {
    setDays(Number(numDays) || 7);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginLeft: 10 }}>
        <Text>Statistical data from {days} days ago</Text>
        <Text>Total order : {soDon}</Text>
        <Text>Total amount: {formatCurrency(tongTien)}</Text>
      </View>

      <LineChart2 orders={thongke2} numDays={days} />
      <Text style={[styles.label]}>Number of days to be counted: </Text>
      <TextInput
        value={numDays}
        onChangeText={setNumDays}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button text={"Statistical"} onPress={handleThongKe} />
    </View>
  );
};

export default statistical;

const styles = StyleSheet.create({
  label: {
    color: "gray",
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
