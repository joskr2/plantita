import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";

interface LoginFormProps extends React.ComponentProps<"div"> {
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
	error?: string | null;
	locale?: Locale;
}

export function LoginForm({
	className,
	onSubmit,
	error,
	locale = "en",
	...props
}: LoginFormProps) {
	const t = translations[locale];

	return (
		<div
			className={cn("w-full px-4 md:px-0 md:w-[90vw] md:max-w-5xl", className)}
			{...props}
		>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid md:grid-cols-2">
					{/* Form Section */}
					<div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
						<form
							onSubmit={onSubmit}
							className="mx-auto w-full max-w-[320px] md:max-w-[360px]"
						>
							<FieldGroup className="gap-5">
								<div className="flex flex-col items-center gap-2 text-center">
									<h1 className="text-2xl font-bold">{t.auth.welcomeBack}</h1>
									<p className="text-balance text-muted-foreground">
										{t.auth.loginSubtitle}
									</p>
								</div>
								<Field>
									<FieldLabel htmlFor="email">{t.auth.email}</FieldLabel>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="tu@email.com"
										required
									/>
								</Field>
								<Field>
									<div className="flex items-center">
										<FieldLabel htmlFor="password">
											{t.auth.password}
										</FieldLabel>
										<a
											href="/forgot-password"
											className="ml-auto text-sm underline-offset-2 hover:underline"
										>
											{t.auth.forgotPassword}
										</a>
									</div>
									<Input
										id="password"
										type="password"
										name="password"
										required
									/>
									{error && <FieldError>{error}</FieldError>}
								</Field>
								<Field>
									<Button type="submit" className="w-full">
										{t.auth.loginButton}
									</Button>
								</Field>
								<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
									{t.auth.orContinueWith}
								</FieldSeparator>
								<Field>
									<Button variant="outline" className="w-full">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											aria-hidden="true"
											className="size-4"
										>
											<title>Google</title>
											<path
												d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
												fill="currentColor"
											/>
										</svg>
									</Button>
								</Field>
								<FieldDescription className="text-center">
									{t.auth.noAccount}{" "}
									<a
										href="/sign-up"
										className="underline underline-offset-2 hover:text-foreground"
									>
										{t.auth.signUp}
									</a>
								</FieldDescription>
							</FieldGroup>
						</form>
					</div>

					{/* Image Section - Desktop only */}
					<div className="relative hidden md:block">
						<img
							src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=1200&fit=crop&q=80"
							alt=""
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
						<div className="absolute bottom-6 left-6 right-6">
							<p className="font-heading text-2xl font-semibold text-white">
								Tiendita
							</p>
							<p className="mt-1 text-sm text-white/80">
								Your favorite plant shop
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="mt-4 text-center text-sm">
				{t.auth.termsAgree}{" "}
				<a
					href="/terms"
					className="underline underline-offset-2 hover:text-foreground"
				>
					{t.auth.termsOfService}
				</a>{" "}
				{t.auth.and}{" "}
				<a
					href="/privacy"
					className="underline underline-offset-2 hover:text-foreground"
				>
					{t.auth.privacyPolicy}
				</a>
				.
			</FieldDescription>
		</div>
	);
}
