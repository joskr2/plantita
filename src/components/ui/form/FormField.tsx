import type * as React from "react";

import { cn } from "@/lib/utils";

export interface FormFieldProps {
	children: React.ReactNode;
	className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
	);
}
