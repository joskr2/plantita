import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { SECCIONES } from "@/data/secciones";

// Lazy load client-only components
const CategoryCard = lazy(() =>
	import("@/components/category/CategoryCard").then((m) => ({
		default: m.CategoryCard,
	})),
);

export const Route = createFileRoute("/categorias")({
	loader: async () => {
		// SSR: pass secciones data from server
		return { secciones: SECCIONES };
	},
	head: () => ({
		title: "Categorías | Plantita",
		meta: [
			{
				name: "description",
				content: "Explora nuestras colecciones de plantas",
			},
		],
	}),
	pendingComponent: () => <CategoriesSkeleton />,
	component: CategoriesPage,
});

function CategoriesPage() {
	const { secciones } = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6 py-6">
			<div className="px-4 md:px-8">
				<h1 className="font-heading text-2xl md:text-3xl font-bold">
					Categorías
				</h1>
				<p className="mt-2 text-muted-foreground">
					Explora nuestras colecciones
				</p>
			</div>

			<div className="grid gap-4 px-4 md:px-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{secciones.map((seccion) => (
					<Link
						key={seccion.id}
						to="/seccion/$slug"
						params={{ slug: seccion.slug }}
						className="block"
					>
						<Suspense
							fallback={
								<div className="h-64 bg-muted animate-pulse rounded-lg" />
							}
						>
							<CategoryCard seccion={seccion} />
						</Suspense>
					</Link>
				))}
			</div>
		</div>
	);
}

function CategoriesSkeleton() {
	return (
		<div className="flex flex-col gap-6 py-6">
			<div className="px-4 md:px-8">
				<div className="h-8 w-48 bg-muted animate-pulse rounded" />
				<div className="h-4 w-64 bg-muted animate-pulse rounded mt-2" />
			</div>
			<div className="grid gap-4 px-4 md:px-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }, () => (
					<div
						key={crypto.randomUUID()}
						className="h-64 bg-muted animate-pulse rounded-lg"
					/>
				))}
			</div>
		</div>
	);
}
