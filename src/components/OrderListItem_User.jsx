import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/theme2";
import HeaderBar from "./HeaderBar";
import EmptyListAnimation from "./EmptyListAnimation";
import PopUpAnimation from "./PopUpAnimation";
import { useState } from "react";
import OrderHistoryCard from "./OrderHistoryCard";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";

function OrderListItem({ order }) {
  const segments = useSegments();

  const [showAnimation, setShowAnimation] = useState(false);

  function navigationHandler() {}

  function buttonPressHandler() {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  }
  return (
    <Link href={`/${segments[0]}/order/${order.id}`} asChild>
      <Pressable style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
        {showAnimation ? (
          <PopUpAnimation
            style={styles.LottieAnimation}
            source={require("../lottie/download.json")}
          />
        ) : null}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}
        >
          <View style={[styles.ScrollViewInnerView, { marginBottom: 20 }]}>
            <View style={styles.ItemContainer}>
              {/* <HeaderBar title="Order History" /> */}
              {order.length === 0 ? (
                <EmptyListAnimation title="No Order History" />
              ) : (
                <View style={styles.ListItemContainer}>
                  <View style={styles.CardContainer}>
                    <View style={styles.CardHeader}>
                      <View>
                        <Text style={styles.HeaderTitle}>
                          Order #{order.id}
                        </Text>
                        <Text style={styles.HeaderTitle}>Order Time</Text>
                        <Text style={styles.HeaderSubtitle}>
                          {dayjs(order.created_at).fromNow()}
                        </Text>
                      </View>
                      <View style={styles.PriceContainer}>
                        <Text style={styles.HeaderTitle}>
                          Status: {order.status}
                        </Text>
                        <Text style={styles.HeaderTitle}>Total Amount</Text>
                        <Text style={styles.HeaderPrice}>${order.total}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </Link>
  );
}

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
});

export default OrderListItem;
