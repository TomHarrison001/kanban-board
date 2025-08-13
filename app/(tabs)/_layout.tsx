import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#F0F0F0",
            tabBarInactiveTintColor: "#C3C3C3",
            tabBarStyle: {
                backgroundColor: "#2D2D2D",
                borderTopWidth: 1,
                borderTopColor: "#C3C3C3",
                height: 90
            },
            tabBarLabelStyle: {
                fontSize: 18,
                fontWeight: "600"
            },
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Actions",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='flash-outline' color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='settings-outline' color={color} size={size}/>
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;
