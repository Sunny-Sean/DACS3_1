import { StyleSheet, View } from "react-native";
import LineChart from "../../../../components/LineChart";

function line() {
  return (
    <View style={styles.container}>
      <LineChart
        line_chart_data={[
          { month: "Jan", value: 300 },
          { month: "Feb", value: 400 },
          { month: "Mar", value: 300 },
          { month: "Apr", value: 620 },
          { month: "May", value: 545 },
          { month: "June", value: 545 },
        ]}
        containerHeight={350}
        circleColor="#daa520"
        axisColor="#9dd"
      />
    </View>
  );
}

export default line;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
  },
});
