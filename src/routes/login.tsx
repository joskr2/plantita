import { createFileRoute, redirect } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import { LoginForm } from "@/components/login-form";
import type { Locale } from "@/i18n/translations";
import { authActions, authStore } from "@/store/authStore";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const locale: Locale = "es";
	const isAuthenticated = useStore(authStore, (state) => state.isAuthenticated);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (isAuthenticated) {
			redirect({ to: "/" });
		}
	}, [isAuthenticated]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const result = authActions.login(email, password);
		if ("message" in result) {
			setError(result.message);
		} else {
			redirect({ to: "/" });
		}
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center py-8 md:py-12">
			<LoginForm onSubmit={handleSubmit} error={error} locale={locale} />
		</div>
	);
}
