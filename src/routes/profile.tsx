import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { useEffect, useRef, useState } from "react";
import {
	AvatarFallback,
	AvatarImage,
	AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { type Locale, translations } from "@/i18n/translations";
import { profileActions, profileStore } from "@/store/profileStore";

type ProfilePageProps = {
	locale?: Locale;
};

type Translation = (typeof translations)["en"] | (typeof translations)["es"];

function ProfileAvatarSection({ t }: { t: Translation }) {
	const avatarUrl = useStore(profileStore, (state) => state.avatarUrl);
	const [previewUrl, setPreviewUrl] = useState(avatarUrl);

	return (
		<div className="flex flex-col items-center gap-5">
			{/* Avatar con ring decorativo */}
			<div className="relative">
				<div className="absolute -inset-3 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent" />
				<AvatarRoot className="size-36 ring-4 ring-background shadow-xl">
					<AvatarImage src={previewUrl} alt="Avatar" />
					<AvatarFallback className="bg-muted">
						<svg
							aria-hidden="true"
							className="size-14 text-muted-foreground"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
								fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
							/>
						</svg>
					</AvatarFallback>
				</AvatarRoot>
			</div>

			{/* Input de URL oculto pero funcional */}
			<div className="w-full max-w-52">
				<input
					id="avatar-url-input"
					type="text"
					placeholder={t.profile.avatar}
					value={previewUrl}
					onChange={(e) => setPreviewUrl(e.target.value)}
					onBlur={() => {
						if (previewUrl !== avatarUrl) {
							profileActions.updateProfile({ avatarUrl: previewUrl });
						}
					}}
					className="w-full rounded-md border border-dashed border-muted-foreground/30 bg-transparent px-3 py-1.5 text-xs text-muted-foreground outline-none focus:border-primary/50 focus:bg-background/50 transition-colors"
				/>
			</div>
		</div>
	);
}

function ProfileFormSection({ t }: { t: Translation }) {
	const formRef = useRef<HTMLFormElement>(null);
	const currentAvatarUrl = useStore(profileStore, (state) => state.avatarUrl);
	const currentNombre = useStore(profileStore, (state) => state.nombre);
	const currentEmail = useStore(profileStore, (state) => state.email);
	const currentTelefono = useStore(profileStore, (state) => state.telefono);
	const currentDni = useStore(profileStore, (state) => state.dni);
	const currentDireccionCasa = useStore(
		profileStore,
		(state) => state.direccionCasa,
	);
	const currentDireccionSecundaria = useStore(
		profileStore,
		(state) => state.direccionSecundaria,
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		profileActions.updateProfile({
			nombre: formData.get("nombre") as string,
			email: formData.get("email") as string,
			telefono: formData.get("telefono") as string,
			direccionCasa: formData.get("direccionCasa") as string,
			direccionSecundaria: formData.get("direccionSecundaria") as string,
			dni: formData.get("dni") as string,
			avatarUrl: currentAvatarUrl,
		});
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
			{/* Sección: Información personal */}
			<div className="mb-8">
				<h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					{t.profile.personalInfo}
				</h3>
				<div className="grid gap-5">
					<div className="grid gap-2">
						<label htmlFor="nombre" className="text-sm font-medium">
							{t.profile.fullName}
						</label>
						<Input
							id="nombre"
							name="nombre"
							defaultValue={currentNombre}
							placeholder="¿Cómo te llamas?"
							className="h-11"
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="email" className="text-sm font-medium">
							{t.profile.emailLabel}
						</label>
						<Input
							id="email"
							name="email"
							type="email"
							defaultValue={currentEmail}
							placeholder="tu@email.com"
							className="h-11"
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="telefono" className="text-sm font-medium">
							{t.profile.phone}
						</label>
						<Input
							id="telefono"
							name="telefono"
							type="tel"
							defaultValue={currentTelefono ?? ""}
							placeholder="+51 999 999 999"
							className="h-11"
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="dni" className="text-sm font-medium">
							{t.profile.dni}
						</label>
						<Input
							id="dni"
							name="dni"
							defaultValue={currentDni ?? ""}
							placeholder="12345678"
							className="h-11"
						/>
					</div>
				</div>
			</div>

			{/* Sección: Direcciones */}
			<div className="mb-8">
				<h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					{t.profile.addresses}
				</h3>
				<div className="grid gap-5">
					<div className="grid gap-2">
						<label htmlFor="direccionCasa" className="text-sm font-medium">
							{t.profile.homeAddress}
						</label>
						<Input
							id="direccionCasa"
							name="direccionCasa"
							defaultValue={currentDireccionCasa ?? ""}
							placeholder="Av. Example 123, Lima"
							className="h-11"
						/>
					</div>

					<div className="grid gap-2">
						<label
							htmlFor="direccionSecundaria"
							className="text-sm font-medium"
						>
							{t.profile.secondaryAddress}
						</label>
						<Input
							id="direccionSecundaria"
							name="direccionSecundaria"
							defaultValue={currentDireccionSecundaria ?? ""}
							placeholder="Calle Example 456, Arequipa"
							className="h-11"
						/>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="mb-6 h-px bg-linear-to-r from-transparent via-border to-transparent" />

			{/* Botón */}
			<div className="flex justify-end">
				<Button type="submit" size="lg" className="px-8">
					{t.profile.saveChanges}
				</Button>
			</div>
		</form>
	);
}

function ProfilePageDesktop({ t }: { t: Translation }) {
	return (
		<div className="flex min-h-svh items-center justify-center bg-linear-to-b from-transparent via-muted/50 to-transparent p-8">
			<Card className="w-full max-w-4xl shadow-2xl">
				<CardHeader className="pb-8">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<svg
								aria-hidden="true"
								className="size-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
						</div>
						<div>
							<CardTitle className="text-2xl">{t.profile.title}</CardTitle>
							<p className="mt-0.5 text-sm text-muted-foreground">
								{t.profile.subtitle}
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-12 md:grid-cols-[280px_1fr]">
						<ProfileAvatarSection t={t} />
						<ProfileFormSection t={t} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function ProfilePageMobile({ t }: { t: Translation }) {
	return (
		<div className="flex min-h-svh flex-col p-6">
			<h1 className="mb-6 text-2xl font-bold">{t.profile.title}</h1>
			<div className="flex flex-col items-center gap-6">
				<ProfileAvatarSection t={t} />
			</div>
			<div className="mt-8">
				<ProfileFormSection t={t} />
			</div>
		</div>
	);
}

export const Route = createFileRoute("/profile")({
	component: ProfilePage,
});

function ProfilePage({ locale = "es" as Locale }: ProfilePageProps) {
	const t = translations[locale];
	const isMobile = useIsMobile();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="flex min-h-svh items-center justify-center p-6">
				<div className="flex flex-col items-center gap-6">
					<div className="bg-muted size-36 animate-pulse rounded-full" />
					<div className="bg-muted h-10 w-52 animate-pulse rounded" />
				</div>
			</div>
		);
	}

	return isMobile ? <ProfilePageMobile t={t} /> : <ProfilePageDesktop t={t} />;
}
