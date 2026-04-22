import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({
	className,
	type,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
