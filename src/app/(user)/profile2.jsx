import { Stack } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import HeaderBar from "../../components/HeaderBar";
import { supabase } from "../../lib/supabase";

const profile_picture = require("../../assets/profile/ava.png");

const ProfileScreen2 = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Profile" />
      <View style={styles.topSection}>
        <View style={styles.propicArea}>
          <Image source={profile_picture} style={styles.propic} />
        </View>
        <Text style={styles.name}>Sunny</Text>
        <Text style={styles.membership}>User</Text>
      </View>

      <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
        <Pressable onPress={async () => await supabase.auth.signOut()}>
          <Text style={styles.buttonName}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEDCC6",
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  propicArea: {
    width: 170,
    height: 170,
    // borderRadius: "100%",
    borderWidth: 4,
    borderColor: "#FFBB3B",
  },
  propic: {
    width: "100%",
    height: "100%",
  },
  name: {
    marginTop: 20,
    color: "#230C02",
    fontSize: 32,
  },
  membership: {
    color: "#FFBB3B",
    fontSize: 18,
  },
  buttonList: {
    marginTop: 20,
  },
  buttonSection: {
    paddingTop: 10,
    paddingBottom: 5,
    // paddingLeft: 25,
    // paddingRight: 25,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconArea: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: 25,
    height: 25,
    backgroundColor: "#230C02",
  },
  buttonName: {
    width: 300,
    fontSize: 18,
    color: "#230C02",
    textAlign: "center",
  },
  sp: {
    width: 400,
    marginTop: 10,
    height: 1,
    backgroundColor: "#FFFFFF45",
  },
});
