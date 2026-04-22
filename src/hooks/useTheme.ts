import * as React from "react";

interface ThemeContextValue {
	isDark: boolean;
	toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
	const context = React.useContext(ThemeContext);
	// During SSR or when outside provider, return safe defaults
	if (!context) {
		return { isDark: false, toggleTheme: () => {} };
	}
	return context;
}
