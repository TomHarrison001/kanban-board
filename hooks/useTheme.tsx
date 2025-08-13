import { ColourScheme, darkColours, lightColours } from '@/constants/colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
