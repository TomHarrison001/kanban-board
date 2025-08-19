import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  const addTodo = useMutation(api.todos.addTodo)
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  const todos = useQuery(api.todos.getTodos);
  console.log(todos);
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Actions.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={styles.content}>
          Toggle Dark Mode.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "A new to-do." })}>
        <Text style={styles.content}>
          Add To-Do
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text style={styles.content}>
          Clear All
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
  },

  content: {
    color: "#c3c3c3",
    fontSize: 24,
  }
});
