import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function AuthLayout() {
  const { session, isAdmin, profile } = useAuth();

  // if (session && profile?.group === "ADMIN") {
  //   return <Redirect href={"/"} />;
  // }

  // if (session && !(profile?.group === "ADMIN")) {
  //   return <Redirect href={"/(user)"} />;
  // }

  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
