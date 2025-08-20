import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  const { colours } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colours.primary,
        tabBarInactiveTintColor: colours.textMuted,
        tabBarStyle: {
          backgroundColor: colours.surface,
          borderTopWidth: 1,
          borderTopColor: colours.border,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Actions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
