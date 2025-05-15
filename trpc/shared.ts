import superjson from "superjson";

export const transformer = superjson;

// base url
export function getBaseUrl() {
  // return process.env.EXPO_PUBLIC_API_URL as string;
  if (process.env.NODE_ENV === "development") {
    return process.env.EXPO_PUBLIC_API_URL_DEV!;
  }
  return "https://expo-api-routes-trpc.expo.app";
}

export function getTrpcApiUrl() {
  return getBaseUrl() + "/api/trpc";
}
