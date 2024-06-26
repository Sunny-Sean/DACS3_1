import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/theme2";
import { useState } from "react";
import GradientBGIcon from "../../components/GradientBGIcon";
import PaymentMethod from "../../components/PaymentMethod";
import PaymentFooter from "../../components/PaymentFooter";
import PopUpAnimation from "../../components/PopUpAnimation";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { useCart } from "../../providers/CartProvider";
import { Stack, useRouter } from "expo-router";

const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Momo Pay",
    icon: require("../../assets/app_images/momo.png"),
    isIcon: false,
  },
  {
    name: "Viettel Pay",
    icon: require("../../assets/app_images/vt.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
  {
    name: "VCB Pay",
    icon: require("../../assets/app_images/vcbpay.png"),
    isIcon: false,
  },
  {
    name: "Shoppe Pay",
    icon: require("../../assets/app_images/spay.png"),
    isIcon: false,
  },
];

function payment() {
  const { total, checkout } = useCart();
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

  function buttonPressHandler() {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      checkout();
    }, 2000);
  }
  return (
    <View style={styles.ScreentContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <Stack.Screen options={{ headerShown: false }} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../../lottie/successful.json")}
        />
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={styles.HeaderContainer}>
          <TouchableOpacity>
            <GradientBGIcon
              name="arrow-back"
              color={COLORS.primaryLightGreyHex}
              size={16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode === "Credit Card"
                      ? COLORS.primaryOrangeHex
                      : "#FFF5E9",
                },
              ]}
            >
              <Text style={styles.CreditCartTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.LinearGradientStyle}
                  colors={["#89765b", "#cba06cfa"]}
                >
                  <View style={styles.CreditCardRow}>
                    <MaterialCommunityIcons
                      name="integrated-circuit-chip"
                      size={40}
                      color={COLORS.primaryOrangeHex}
                    />
                    <FontAwesome5
                      name="cc-visa"
                      size={60}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>1234</Text>
                    <Text style={styles.CreditCardNumber}>5678</Text>
                    <Text style={styles.CreditCardNumber}>9876</Text>
                    <Text style={styles.CreditCardNumber}>5432</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>Minh Hieu</Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/28</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => setPaymentMode(data.name)}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* payment Footer */}
      <PaymentFooter
        buttonTitle={`Pay With ${paymentMode}`}
        price={total}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
}

export default payment;

const styles = StyleSheet.create({
  ScreentContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  EmptyView: {
    height: 36,
    width: 36,
  },
  PaymentOptionsContainer: {
    padding: 15,
    gap: 15,
  },
  CreditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 15,
    borderWidth: 3,
  },
  CreditCartTitle: {
    fontWeight: "bold",
    fontSize: 14,
    // color: COLORS.primaryWhiteHex,
    marginLeft: 10,
    color: "#230C02",
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 25,
  },
  LinearGradientStyle: {
    borderRadius: 25,
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  CreditCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CreditCardNumberContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  CreditCardNumber: {
    fontWeight: "bold",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#693a27",
    letterSpacing: 6,
  },
  CreditCardNameSubitle: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
  },
  CreditCardNameTitle: {
    fontWeight: "600",
    fontSize: 16,
    // color: COLORS.primaryWhiteHex,
    color: "#693a27",
  },
  CreditCardNameContainer: {
    alignItems: "flex-start",
  },
  CreditCardDateContainer: {
    alignItems: "flex-end",
  },
  LottieAnimation: {
    flex: 1,
  },
});
