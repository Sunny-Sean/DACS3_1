import { Pressable, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <Pressable onPress={() => router.push("/")}>
        <Text style={{ textAlign: "center" }}>Sign out</Text>
      </Pressable>
    </View>
  );
}

export default ProfileScreen;
