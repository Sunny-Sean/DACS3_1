import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import React from "react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatCurrency } from "../utils/helpers";

export default function LineChart2({ orders, numDays }) {
  // Trả về 1 chuỗi ngày liên tiếp từ numDays-1 tới hôm nay
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  if (!orders) {
    return <ActivityIndicator />;
  }

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      // Tính tổng totalSales của tất cả booking trong 1 ngày
      totalSales: orders
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        ?.reduce((acc, cur) => acc + cur.total, 0),
    };
  });

  const labels = data.map((item) => item.label);
  const totalSales = data.map((item) => item.totalSales);
  // console.log(data);

  // const sodon = orders ? orders.length : 0;
  // const tongTien = orders ? orders.reduce((acc, cur) => acc + cur.total, 0) : 0;
  // console.log(orders.length);
  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={{ marginLeft: 10 }}>so don: {orders.length}</Text>
      <Text style={{ marginLeft: 10 }}>
        Tong Tien:{" "}
        {formatCurrency(orders.reduce((acc, cur) => acc + cur.total, 0))}
      </Text> */}

      <Text style={{ marginLeft: 10 }}>
        {" "}
        Sales from {format(allDates.at(0), "MMMM dd yyyy ")} &mdash;{" "}
        {format(allDates.at(-1), "MMMM dd yyyy ")}
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: totalSales,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        onDataPointClick={({ value, getColor }) => {
          ToastAndroid.showWithGravity(
            `Value is ${value}$`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // Lất số thập phân
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginLeft: 10,
          marginRight: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
