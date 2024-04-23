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
import { Link, Redirect, Stack, useRouter, useSegments } from "expo-router";
import CartIt from "../components/CartIt";
import { COLORS } from "../constants/theme2";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";
import HeaderBar from "../components/HeaderBar";
import PaymentFooter from "../components/PaymentFooter";

function CartScreen() {
  const { items, total } = useCart();
  const router = useRouter();
  // const tabBarHeight = useBottomTabBarHeight();
  const segment = useSegments();
  function buttonPressHandler() {
    router.push("/(user)/payment");
  }

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
                  <Link
                    href={`/(user)/menu/${data.product.id}`}
                    asChild
                    key={data.id}
                  >
                    <TouchableOpacity>
                      <CartIt cartItem={data} />
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            )}
          </View>
          {/* Payment Footer */}
          {items.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={total}
              buttonPressHandler={buttonPressHandler}
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
