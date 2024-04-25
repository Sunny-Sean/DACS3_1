import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/theme2";
import HeaderBar from "../../components/HeaderBar";
import EmptyListAnimation from "../../components/EmptyListAnimation";
import PopUpAnimation from "../../components/PopUpAnimation";
import { useState } from "react";
import OrderHistoryCard from "../../components/OrderHistoryCard";
import orders from "../../../assets/data/orders";

function order() {
  const [showAnimation, setShowAnimation] = useState(false);

  function navigationHandler() {}

  function buttonPressHandler() {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../../lottie/download.json")}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: 20 }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />

            {orders.length === 0 ? (
              <EmptyListAnimation title="No Order History" />
            ) : (
              <View style={styles.ListItemContainer}>
                {orders?.map((data, index) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.order_items}
                    CartListPrice={data.total}
                    OrderDate={data.created_at}
                    id={data.id}
                    status={data.status}
                  />
                ))}
              </View>
            )}
          </View>
          {orders.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={buttonPressHandler}
            >
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default order;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
  },
  LottieAnimation: {
    height: 250,
    // flex: 1,
    // height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 30,
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
