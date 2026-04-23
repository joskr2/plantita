import { createFileRoute, redirect } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import * as React from "react";
import { toast } from "sonner";
import { SignupForm } from "@/components/signup-form";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { authActions, authStore } from "@/store/authStore";

export const Route = createFileRoute("/sign-up")({
	component: SignupPage,
});

function SignupPage() {
	const locale: Locale = "es";
	const isAuthenticated = useStore(authStore, (state) => state.isAuthenticated);

	React.useEffect(() => {
		if (isAuthenticated) {
			redirect({ to: "/" });
		}
	}, [isAuthenticated]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		const phone = formData.get("phone") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (password !== confirmPassword) {
			toast.error(translations[locale].auth.passwordsMismatch);
			return;
		}

		const result = authActions.register(
			email,
			password,
			firstName,
			lastName,
			phone,
		);

		if ("message" in result) {
			toast.error(translations[locale].auth.registrationFailed);
		} else {
			toast.success(translations[locale].auth.registrationSuccess);
			redirect({ to: "/" });
		}
	}

	function handleGoogleSubmit() {
		redirect({ to: "/" });
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center py-8 md:py-12">
			<SignupForm
				onSubmit={handleSubmit}
				onGoogleSubmit={handleGoogleSubmit}
				locale={locale}
			/>
		</div>
	);
}
