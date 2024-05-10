import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

function index() {
  const { session, loading, isAdmin, profile } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/LoginPage"} />;
  }

  if (profile?.group === "ADMIN") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>

        <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      </View>
    );
  }
  return <Redirect href={"/(user)"} />;
}

export default index;
