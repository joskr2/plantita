import { QueryClientProvider } from "@tanstack/react-query";
import {
	type RenderOptions,
	render as rtlRender,
} from "@testing-library/react";
import * as React from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { createQueryClient } from "./mocks";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	initialRouterPath?: string;
}

export function TestProviders({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => createQueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>{children}</ThemeProvider>
		</QueryClientProvider>
	);
}

export function render(ui: React.ReactElement, options?: CustomRenderOptions) {
	return rtlRender(ui, { wrapper: TestProviders, ...options });
}
