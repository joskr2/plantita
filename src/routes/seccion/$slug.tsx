import { createFileRoute } from "@tanstack/react-router";
import { SectionGrid } from "@/components/section";
import { getSeccionPlantas, SECCIONES } from "@/data/secciones";
import type { Locale } from "@/i18n/translations";

export const Route = createFileRoute("/seccion/$slug")({
	component: SectionPage,
});

function SectionPage() {
	const { slug } = Route.useParams();
	const seccion = SECCIONES.find((s) => s.slug === slug);
	const locale: Locale = "es";

	if (!seccion) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-20">
				<h1 className="text-2xl font-bold">Sección no encontrada</h1>
				<p className="text-muted-foreground">
					La sección que buscas no existe.
				</p>
				<a href="/" className="text-primary hover:underline">
					Volver al inicio
				</a>
			</div>
		);
	}

	const plantas = getSeccionPlantas(seccion);

	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Banner */}
			{seccion.bannerImage && (
				<div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
					<img
						src={seccion.bannerImage}
						alt={seccion.nombre}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
					<h1 className="absolute bottom-4 left-6 text-2xl md:text-3xl font-bold text-white">
						{seccion.nombre}
					</h1>
				</div>
			)}

			{/* Description */}
			{seccion.descripcion && (
				<p className="px-4 md:px-8 text-muted-foreground">
					{seccion.descripcion}
				</p>
			)}

			{/* Products Grid */}
			<SectionGrid
				seccion={{ ...seccion, plantas, layout: seccion.layout }}
				locale={locale}
				columns={4}
				rows={3}
			/>
		</div>
	);
}
