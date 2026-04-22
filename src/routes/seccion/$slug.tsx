import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { getSeccionPlantas, SECCIONES } from "@/data/secciones";
import type { Locale } from "@/i18n/translations";

// Lazy load client-only components
const SectionGrid = lazy(() =>
	import("@/components/section/SectionGrid").then((m) => ({
		default: m.SectionGrid,
	})),
);

export const Route = createFileRoute("/seccion/$slug")({
	loader: async ({ params }) => {
		const seccion = SECCIONES.find((s) => s.slug === params.slug);

		if (!seccion) {
			throw new Error("Section not found");
		}

		const plantas = getSeccionPlantas(seccion);

		return {
			seccion,
			plantas,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData?.seccion) {
			return { meta: [{ title: "Sección no encontrada | Tiendita" }] };
		}
		return {
			meta: [
				{ title: `${loaderData.seccion.nombre} | Tiendita` },
				{
					name: "description",
					content:
						loaderData.seccion.descripcion ??
						`Explora ${loaderData.seccion.nombre}`,
				},
			],
		};
	},
	pendingComponent: () => <SectionSkeleton />,
	component: SectionPage,
});

function SectionPage() {
	const { seccion, plantas } = Route.useLoaderData();
	const locale: Locale = "es";

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
			<Suspense
				fallback={
					<div className="grid grid-cols-1 gap-4 px-4 md:px-8 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 12 }, () => (
							<div
								key={crypto.randomUUID()}
								className="h-80 bg-muted animate-pulse rounded-lg"
							/>
						))}
					</div>
				}
			>
				<SectionGrid
					seccion={{ ...seccion, plantas, layout: seccion.layout }}
					locale={locale}
					columns={4}
					rows={3}
				/>
			</Suspense>
		</div>
	);
}

function SectionSkeleton() {
	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Banner skeleton */}
			<div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
				<div className="h-full w-full bg-muted animate-pulse" />
			</div>
			{/* Description skeleton */}
			<div className="h-4 w-64 bg-muted animate-pulse rounded mx-4 md:mx-8" />
			{/* Products grid skeleton */}
			<div className="grid grid-cols-1 gap-4 px-4 md:px-8 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 12 }, () => (
					<div
						key={crypto.randomUUID()}
						className="h-80 bg-muted animate-pulse rounded-lg"
					/>
				))}
			</div>
		</div>
	);
}
