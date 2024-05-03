import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View, ViewBase } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Icon from "react-native-feather";
import { themeColors } from "../../constants/theme2";
import { useCart } from "../../providers/CartProvider";

export default function DeliveryScreen() {
  const { checkout } = useCart();
  const router = useRouter();
  return (
    <View style={{ flex: 1, flexGrow: 1, flexBasis: 0 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        initialRegion={{
          latitude: 15.9752982,
          longitude: 108.2497801,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        style={{
          flex: 1,
          flexGrow: 1,
          flexBasis: 0,
        }}
        mapType="standard"
      >
        <Marker coordinate={{ latitude: 15.9752982, longitude: 108.2497801 }} />
      </MapView>
      <View
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: 48,
          position: "relative",
          backgroundColor: "#EEDCC6",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", right: 16, top: 8 }}
        ></TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 40,
            backgroundColor: "#EEDCC6",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                color: "gray",
                fontWeight: "600",
              }}
            >
              Will Deliver To You
            </Text>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 36,
                fontWeight: "800",
                color: "gray",
              }}
            >
              20-30 Minutes
            </Text>
            <Text style={{ marginTop: 8, color: "gray", fontWeight: "600" }}>
              Your Order is own its way
            </Text>
          </View>
          <Image
            style={{ height: 96, width: 96 }}
            source={require("../../../assets/anime/bikeGuy2.gif")}
          />
        </View>

        <View
          style={{
            backgroundColor: "#EEDCC6",
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 9999,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              padding: 4,
              borderRadius: 9999,
            }}
          >
            <Image
              style={{
                backgroundColor: "rgba(255,255,255,0.4)",
                width: 64,
                height: 64,
                borderRadius: 9999,
              }}
              source={require("../../assets/profile/ava.png")}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexGrow: 1,
              flexBasis: 0,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                fontWeight: "600",
                color: "#230C02",
              }}
            >
              Minh Hieu
            </Text>
            <Text style={{ color: "#230C02", fontWeight: "600" }}>Shipper</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 12,
              marginLeft: 12,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 9999,
              }}
              onPress={() => router.push("/(user)/menu/home")}
            >
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
                strokeWidth="1"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 9999,
                marginLeft: 10,
              }}
              onPress={() => router.push("/(user)/menu/home")}
            >
              <Icon.X stroke={"red"} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
