function Footer({ locale = "en" }: { locale?: "en" | "es" }) {
	const text =
		locale === "es"
			? "© 2026 Tiendita. Todos los derechos reservados."
			: "© 2026 Tiendita. All rights reserved.";

	return (
		<footer className="border-t border-border/50 py-6 mt-auto">
			<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
				<p className="text-center text-sm text-muted-foreground">{text}</p>
			</div>
		</footer>
	);
}

export { Footer };
