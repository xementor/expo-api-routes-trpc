import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { authClient } from "@/trpc/auth-client";

export default function App() {
  const handleGoogleSignIn = async () => {
    try {
      const response = await authClient.signIn.social({
        provider: "google",
        // disableRedirect: true,
      });
      console.log("Google sign-in response:", response);
    } catch (error) {
      console.error("Google sign-in error:", error);
      Alert.alert("Sign-in Error", "Failed to sign in with Google");
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
}
