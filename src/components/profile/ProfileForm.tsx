import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileActions, profileStore } from "@/store/profileStore";

const profileSchema = z.object({
	nombre: z.string().min(1, "El nombre es requerido"),
	email: z.email("Email inválido").or(z.literal("")),
	telefono: z.string().optional(),
	avatarUrl: z.string().url("URL inválida").or(z.literal("")),
});

function ProfileFormInner() {
	const initialValues = useStore(profileStore, (state) => state);

	const form = useForm({
		defaultValues: {
			nombre: initialValues.nombre,
			email: initialValues.email,
			telefono: initialValues.telefono ?? "",
			avatarUrl: initialValues.avatarUrl,
		},
		validators: {
			onChange: ({ value }) => {
				const result = profileSchema.safeParse(value);
				if (!result.success) {
					const firstError = result.error.issues[0];
					return firstError ? firstError.message : undefined;
				}
				return undefined;
			},
		},
		onSubmit: async ({ value }) => {
			profileActions.updateProfile(value);
			// Show saved feedback - could be enhanced with toast
			console.log("Profile saved:", value);
		},
	});

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="nombre">
				{(field) => (
					<div className="flex flex-col gap-1.5">
						<FormLabel>Nombre</FormLabel>
						<FormControl>
							<Input
								placeholder="Tu nombre"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</div>
				)}
			</form.Field>

			<form.Field name="email">
				{(field) => (
					<div className="flex flex-col gap-1.5">
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input
								type="email"
								placeholder="tu@email.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</div>
				)}
			</form.Field>

			<form.Field name="telefono">
				{(field) => (
					<div className="flex flex-col gap-1.5">
						<FormLabel>Teléfono (opcional)</FormLabel>
						<FormControl>
							<Input
								type="tel"
								placeholder="+51 999 999 999"
								value={field.state.value ?? ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</div>
				)}
			</form.Field>

			<form.Field name="avatarUrl">
				{(field) => (
					<div className="flex flex-col gap-1.5">
						<FormLabel>URL del Avatar</FormLabel>
						<FormControl>
							<Input
								placeholder="https://example.com/avatar.jpg"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</FormControl>
						<FormMessage />
					</div>
				)}
			</form.Field>

			<Button type="submit">Guardar</Button>
		</form>
	);
}

// Wrapper to ensure component only renders on client
export function ProfileForm() {
	return <ProfileFormInner />;
}
