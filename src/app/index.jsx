import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";

function index() {
  const { session, loading, isAdmin } = useAuth();
  // console.log(session);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/LoginPage"} />;
  }

  // if (!isAdmin) {
  //   return <Redirect href={"/(user)"} />;
  // }

  if (isAdmin) {
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
