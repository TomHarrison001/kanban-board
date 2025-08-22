import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyState from "@/components/EmtpyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { toggleDarkMode, colours } = useTheme();
  const homeStyles = createHomeStyles(colours);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Failed to toggle todo.", error);
      Alert.alert("Error", "Failed to toggle todo.");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    //Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
    //  { text: "Cancel", style: "cancel" },
    //  {
    //    text: "Delete",
    //    style: "destructive",
    //    onPress: () => deleteTodo({ id }),
    //  },
    //]);
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.log("Failed to delete todo.", error);
      Alert.alert("Error", "Failed to delete todo.");
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colours.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isComplete
                  ? colours.gradients.success
                  : colours.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isComplete ? "transparent" : colours.border,
                },
              ]}
            >
              {item.isComplete && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isComplete && {
                  textDecoratedLine: "line-through",
                  color: colours.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colours.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colours.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colours.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colours.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          //showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Dark Mode.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
