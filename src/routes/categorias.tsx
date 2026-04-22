import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryCard } from "@/components/category/CategoryCard";
import { SECCIONES } from "@/data/secciones";
import { useIsMobile } from "@/hooks/useIsMobile";

export const Route = createFileRoute("/categorias")({
	component: CategoriesPage,
});

function CategoriesPage() {
	const isMobile = useIsMobile();

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

			<div
				className={`grid gap-4 px-4 md:px-8 ${
					isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
				}`}
			>
				{SECCIONES.map((seccion) => (
					<Link
						key={seccion.id}
						to="/seccion/$slug"
						params={{ slug: seccion.slug }}
						className="block"
					>
						<CategoryCard seccion={seccion} />
					</Link>
				))}
			</div>
		</div>
	);
}
