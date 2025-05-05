import { api } from "@/trpc/react";
import { StyleSheet, Text } from "react-native";

export function Hello() {
  const [hello] = api.post.hello.useSuspenseQuery({ text: "World" });
  const user = api.post.auth.useQuery();

  return (
    <Text style={styles.title}>
      {hello.greeting}
      {user.data?.user.email}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
