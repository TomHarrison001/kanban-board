import { createHomeStyles } from "@/assets/styles/home.style";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";
import useTheme from "../hooks/useTheme";

const LoadingSpinner = () => {
  const { colours } = useTheme();
  const homeStyles = createHomeStyles(colours);
  return (
    <LinearGradient
      colors={colours.gradients.background}
      style={homeStyles.container}
    >
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colours.primary} />
        <Text style={homeStyles.loadingText}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;
