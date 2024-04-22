import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../providers/CartProvider";
// import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import { Link, Redirect, Stack } from "expo-router";
import CartIt from "../components/CartIt";
import { COLORS } from "../constants/theme2";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";
import HeaderBar from "../components/HeaderBar";
import PaymentFooter from "../components/PaymentFooter";

function CartScreen() {
  const { items, total } = useCart();
  // const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ title: "Cart", headerShown: false }} />
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: 20 }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {items.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {items.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.push("Details", {
                      //   index: data.index,
                      //   id: data.id,
                      //   type: data.type,
                      // });
                    }}
                    key={data.id}
                  >
                    <CartIt cartItem={data} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* Payment Footer */}
          {items.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={total}
              // buttonPressHandler={buttonPressHandler}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
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
    gap: 20,
  },
});
