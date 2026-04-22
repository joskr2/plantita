import type * as React from "react";

import { cn } from "@/lib/utils";

export interface FormMessageProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children?: React.ReactNode;
	error?: string;
}

export function FormMessage({
	className,
	children,
	error,
	...props
}: FormMessageProps) {
	if (!error) {
		return null;
	}

	return (
		<p className={cn("text-xs text-destructive", className)} {...props}>
			{children || error}
		</p>
	);
}
