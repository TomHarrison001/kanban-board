import { createSettingsStyles } from "@/assets/styles/settings.style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colours } = useTheme();
  const settingsStyles = createSettingsStyles(colours);
  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isComplete).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <LinearGradient
      colors={colours.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
      <View style={settingsStyles.statsContainer}>
        <LinearGradient
          colors={colours.gradients.background}
          style={[
            settingsStyles.statCard,
            { borderLeftColor: colours.primary },
          ]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colours.gradients.primary}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View style={settingsStyles.statInfo}>
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={colours.gradients.background}
          style={[
            settingsStyles.statCard,
            { borderLeftColor: colours.success },
          ]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colours.gradients.success}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View style={settingsStyles.statInfo}>
            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={colours.gradients.background}
          style={[
            settingsStyles.statCard,
            { borderLeftColor: colours.warning },
          ]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient
              colors={colours.gradients.warning}
              style={settingsStyles.statIcon}
            >
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View style={settingsStyles.statInfo}>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
