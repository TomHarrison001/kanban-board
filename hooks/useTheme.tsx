import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface ColourScheme {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    shadow: string;
    gradients: {
        background: [string, string];
        surface: [string, string];
        text: [string, string];
        textMuted: [string, string];
        border: [string, string];
        primary: [string, string];
        success: [string, string];
        warning: [string, string];
        danger: [string, string];
        shadow: [string, string];
    };
    backgrounds: {
        input: string;
        editInput: string;
    };
    statusBarStyle: "light-content" | "dark-content";
}

const lightColours: ColourScheme = {
    background: "#FFFFFF",
    surface: "#F0F0F0",
    text: "#000000",
    textMuted: "#7D7D7D",
    border: "#E0E0E0",
    primary: "#6200EE",
    success: "#03DAC6",
    warning: "#FFAB00",
    danger: "#B00020",
    shadow: "#000000",
    gradients: {
        background: ["#FFFFFF", "#F0F0F0"],
        surface: ["#F0F0F0", "#FFFFFF"],
        text: ["#000000", "#7D7D7D"],
        textMuted: ["#7D7D7D", "#000000"],
        border: ["#E0E0E0", "#FFFFFF"],
        primary: ["#6200EE", "#3700B3"],
        success: ["#03DAC6", "#018786"],
        warning: ["#FFAB00", "#FF8F00"],
        danger: ["#B00020", "#C51162"],
        shadow: ["#000000", "#000000"],
    },
    backgrounds: {
        input: "#FFFFFF",
        editInput: "#F0F0F0",
    },
    statusBarStyle: "dark-content" as const,
};

const darkColours: ColourScheme = {
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    textMuted: "#B0B0B0",
    border: "#333333",
    primary: "#BB86FC",
    success: "#03DAC6",
    warning: "#FFAB00",
    danger: "#CF6679",
    shadow: "#000000",
    gradients: {
        background: ["#121212", "#1E1E1E"],
        surface: ["#1E1E1E", "#121212"],
        text: ["#FFFFFF", "#B0B0B0"],
        textMuted: ["#B0B0B0", "#FFFFFF"],
        border: ["#333333", "#1E1E1E"],
        primary: ["#BB86FC", "#3700B3"],
        success: ["#03DAC6", "#018786"],
        warning: ["#FFAB00", "#FF8F00"],
        danger: ["#CF6679", "#C51162"],
        shadow: ["#000000", "#000000"],
    },
    backgrounds: {
        input: "#121212",
        editInput: "#1E1E1E",
    },
    statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
    colours: ColourScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("darkMode").then((value) => {
            if (value) setDarkMode(JSON.parse(value));
        });
    }, []);

    const toggleDarkMode = async () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const colours = darkMode ? darkColours : lightColours;

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode, colours}}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider.");
    }

    return context;
}

export default useTheme;
