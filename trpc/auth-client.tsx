import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { getBaseUrl } from "./shared";

// Create a cross-platform storage solution
const createStorage = () => {
  // Web storage implementation using localStorage
  if (Platform.OS === "web") {
    return {
      getItem: (key: string) => {
        try {
          const value = localStorage.getItem(key);
          return value;
        } catch (error) {
          console.error("Error reading from localStorage:", error);
          return null;
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, value);
          return true;
        } catch (error) {
          console.error("Error writing to localStorage:", error);
          return false;
        }
      },
    };
  }

  // Native storage implementation using SecureStore
  return SecureStore;
};

// Get the appropriate storage for the current platform
const platformStorage = createStorage();

export const authClient = createAuthClient({
  baseURL: getBaseUrl() /* Base URL of your Better Auth backend. */,
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "myapp",
      storage: platformStorage,
    }),
  ],
});
