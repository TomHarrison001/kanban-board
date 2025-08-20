import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const EmptyState = () => {
  const { colours } = useTheme();

  const homeStyles = createHomeStyles(colours);

  return (
    <View style={homeStyles.emptyContainer}>
      <LinearGradient
        colors={colours.gradients.empty}
        style={homeStyles.emptyIconContainer}
      >
        <Ionicons
          name="clipboard-outline"
          size={60}
          color={colours.textMuted}
        />
      </LinearGradient>
      <Text style={homeStyles.emptyText}>No todos yet!</Text>
      <Text style={homeStyles.emptySubtext}>
        Add your first todo above to get started
      </Text>
    </View>
  );
};

export default EmptyState;
