import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/Header";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colours } = useTheme();
  const homeStyles = createHomeStyles(colours);
  return (
    <LinearGradient
      colors={colours.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colours.statusBarStyle} />
      <Header />
      <SafeAreaView style={homeStyles.safeArea}>
        <Text>Actions.</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Dark Mode.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
