import { Stack } from "expo-router";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        initialRegion={{
          latitude: 15.9752982,
          longitude: 108.2497801,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
        mapType="standard"
      >
        <Marker coordinate={{ latitude: 15.9752982, longitude: 108.2497801 }} />
      </MapView>
    </View>
  );
}
