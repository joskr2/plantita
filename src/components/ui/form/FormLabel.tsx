import type * as React from "react";

import { cn } from "@/lib/utils";

export interface FormLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
}

export function FormLabel({
	className,
	children,
	htmlFor,
	...props
}: FormLabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
}
