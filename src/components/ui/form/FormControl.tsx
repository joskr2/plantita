import type * as React from "react";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export interface FormControlProps {
	children:
		| React.ReactElement<{
				id?: string;
				name?: string;
				value?: unknown;
				onBlur?: () => void;
				onChange?: (...args: unknown[]) => void;
		  }>
		| ((field: {
				id: string;
				name: string;
				value: unknown;
				onBlur: () => void;
				onChange: (...args: unknown[]) => void;
		  }) => React.ReactNode);
	className?: string;
}

export function FormControl({ children, className }: FormControlProps) {
	const child =
		isValidElement(children) && typeof children !== "function"
			? cloneElement(
					children as React.ReactElement<Record<string, unknown>>,
					{},
				)
			: typeof children === "function"
				? children({
						id: "",
						name: "",
						value: undefined,
						onBlur: () => {},
						onChange: (_value: unknown) => {},
					})
				: null;

	return <div className={cn(className)}>{child}</div>;
}
