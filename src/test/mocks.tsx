import { QueryClient } from "@tanstack/react-query";
import * as React from "react";

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
}

export const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => {
	return {
		Link: ({
			children,
			to,
			...props
		}: {
			children: React.ReactNode;
			to: string;
		}) => React.createElement("a", { href: to, ...props }, children),
		useNavigate: () => mockNavigate,
		RouterProvider: ({ children }: { children: React.ReactNode }) => children,
	};
});
