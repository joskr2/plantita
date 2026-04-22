"use client";

import * as React from "react";
import { ThemeContext } from "@/hooks/useTheme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	// Start with false (light) - avoid SSR hydration mismatch
	const [isDark, setIsDark] = React.useState(false);

	// Apply to DOM before first paint — runs synchronously
	React.useLayoutEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);

	// Sync to localStorage and read saved preference after hydration
	React.useEffect(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "dark") {
			setIsDark(true);
		} else if (saved === "light") {
			setIsDark(false);
		} else {
			// No saved preference — check system
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			setIsDark(prefersDark);
		}
	}, []);

	// Persist preference to localStorage
	React.useEffect(() => {
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	function toggleTheme() {
		setIsDark((prev) => !prev);
	}

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
