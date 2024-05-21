import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import HeaderBar from "../../components/HeaderBar";
import { supabase } from "../../lib/supabase";
import { getUser, useUpdateUser, useUser } from "../../api/user";
import LoadingP from "../../components/LoadingP";
import { COLORS } from "../../constants/theme2";
import Button from "../../components/Button";
import { useAuth } from "../../providers/AuthProvider";

const profile_picture = require("../../assets/profile/ava.png");

const ProfileScreen2 = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  // const { data: user, isLoading, error } = getUser();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log(user);

  const [errors, setErrors] = useState("");

  const { mutate: updateUser } = useUpdateUser();
  // const { mutate: updatingUser } = useUser(user.id);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      console.log("Data moi: ", data);
      console.log("Data sdt: ", data.full_name);
      console.log("Data dia chi: ", data.username);
      setSdt(data.full_name);
      setDiaChi(data.username);
      setName(data.avatar_url);
      setError(error);
      setIsLoading(false); // Set loading sang false sau khi lấy dữ liệu thành công
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error); //
      setError(error); // Cập nhật trạng thái lỗi nếu lấy dữ liệu thất bại
      setIsLoading(false); // Reset trạng thái tải
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {}, [isLoading]);

  function validateInput() {
    setErrors("");
    if (!sdt) {
      setErrors("Phone number is required");
      return false;
    }
    if (!diaChi) {
      setErrors("Address is required");
      return false;
    }
    return true;
  }

  function updateUser1() {
    if (!validateInput()) {
      return;
    }
    updateUser({
      id: id,
      full_name: sdt,
      username: diaChi,
    });
  }

  function onSubmit() {
    updateUser1();
  }

  if (isLoading) {
    return <LoadingP />;
  }

  return (
    <View style={styles.container2}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View>
          <Stack.Screen options={{ headerShown: false }} />
          <HeaderBar title="Profile" />
          <View style={styles.topSection}>
            <View style={styles.propicArea}>
              <Image source={profile_picture} style={styles.propic} />
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.membership}>User</Text>
          </View>
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.InputContainerComponent}>
              <TextInput
                value={sdt}
                onChangeText={setSdt}
                placeholder="Phone Number"
                style={styles.TextInputContainer}
              />
            </View>
            <Text style={styles.label}>Address</Text>
            <View style={styles.InputContainerComponent}>
              <TextInput
                value={diaChi}
                onChangeText={setDiaChi}
                placeholder="Phone Number"
                style={styles.TextInputContainer}
              />
            </View>
          </View>
        </View>
        <Text style={{ color: "#230C02", textAlign: "center" }}>{errors}</Text>
        <TouchableOpacity style={styles.SizeBox} onPress={onSubmit}>
          <Text style={styles.SizeText}>Update</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Pressable onPress={async () => await supabase.auth.signOut()}>
            <Text style={styles.buttonName}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen2;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#EEDCC6",
  },
  ScrollViewFlex: {
    flexGrow: 1,
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
  label: {
    color: "gray",
    fontSize: 16,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    width: 300,
  },
  InputContainerComponent: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#4d3429",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    marginLeft: 20,
    flex: 1,
    height: 60,
    fontWeight: "600",
    fontSize: 14,
    color: "#FFFFFF",
  },
  SizeBox: {
    flex: 1,
    backgroundColor: "#f8dcb9",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 30,
    borderWidth: 2,
    marginLeft: 140,
    marginRight: 140,
  },
  SizeText: {
    fontWeight: "600",
  },
});
