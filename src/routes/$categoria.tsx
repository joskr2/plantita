import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { FilterBar } from "@/components/category/FilterBar";
import { Pagination as PaginationComponent } from "@/components/category/Pagination";
import { PlantCard } from "@/components/plant/PlantCard";
import { CATEGORIAS } from "@/data/categorias/categorias";
import type { Filters, Pagination } from "@/data/categorias/index";
import { getCategoriaPlantas } from "@/data/categorias/index";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

export const Route = createFileRoute("/$categoria")({
	component: CategoryPage,
});

function CategoryPage() {
	const locale: Locale = "es";
	const t = translations[locale];

	// Get route params
	const params = Route.useParams();

	// Get search params for filters and pagination
	const search = useSearch({
		from: "/$categoria",
	});

	// Parse filters from search params
	const filters: Filters = {
		priceMin: search.priceMin ? Number(search.priceMin) : undefined,
		priceMax: search.priceMax ? Number(search.priceMax) : undefined,
		inStock:
			search.inStock === "true"
				? true
				: search.inStock === "false"
					? false
					: undefined,
		minRating: search.minRating ? Number(search.minRating) : undefined,
	};

	// Parse pagination
	const pagination: Pagination = {
		page: search.page ? Number(search.page) : 1,
		perPage: 12,
	};

	// Find categoria by slug
	const categoria = CATEGORIAS.find((c) => c.slug === params.categoria);

	// If no categoria found, show 404
	if (!categoria) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
				<h1 className="font-heading text-2xl font-bold">
					{t.product.productNotFound}
				</h1>
				<p className="text-muted-foreground">
					{t.product.productNotFoundDescription}
				</p>
				<Link to="/" className="text-primary hover:underline">
					{t.product.returnHome}
				</Link>
			</div>
		);
	}

	// Get filtered plantas for this category
	const result = getCategoriaPlantas(categoria.slug, filters, pagination);

	const handleFiltersChange = (newFilters: Filters) => {
		const params = new URLSearchParams();
		if (newFilters.priceMin !== undefined)
			params.set("priceMin", String(newFilters.priceMin));
		if (newFilters.priceMax !== undefined)
			params.set("priceMax", String(newFilters.priceMax));
		if (newFilters.inStock !== undefined)
			params.set("inStock", String(newFilters.inStock));
		if (newFilters.minRating !== undefined)
			params.set("minRating", String(newFilters.minRating));
		if (pagination.page > 1) params.set("page", String(pagination.page));
		// Navigate with new filters
		const searchStr = params.toString();
		window.location.search = searchStr ? `?${searchStr}` : "";
	};

	const handleClearAll = () => {
		window.location.search = "";
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams();
		if (filters.priceMin !== undefined)
			params.set("priceMin", String(filters.priceMin));
		if (filters.priceMax !== undefined)
			params.set("priceMax", String(filters.priceMax));
		if (filters.inStock !== undefined)
			params.set("inStock", String(filters.inStock));
		if (filters.minRating !== undefined)
			params.set("minRating", String(filters.minRating));
		if (page > 1) params.set("page", String(page));
		const searchStr = params.toString();
		window.location.search = searchStr ? `?${searchStr}` : "";
	};

	const startItem =
		result.total > 0 ? (pagination.page - 1) * pagination.perPage + 1 : 0;
	const endItem = Math.min(pagination.page * pagination.perPage, result.total);

	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Banner with gradient overlay */}
			<div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
				<img
					src={categoria.bannerImage}
					alt={categoria.nombre}
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
					<h1 className="font-heading text-2xl md:text-3xl font-bold text-white">
						{categoria.nombre}
					</h1>
					<p className="mt-2 text-sm md:text-base text-white/90 max-w-2xl">
						{categoria.descripcion}
					</p>
				</div>
			</div>

			{/* Filter bar */}
			<FilterBar
				filters={filters}
				onFiltersChange={handleFiltersChange}
				onClearAll={handleClearAll}
				locale={locale}
			/>

			{/* Results count */}
			{result.total > 0 && (
				<div className="px-4 md:px-8 text-sm text-muted-foreground">
					{t.category.showingResults
						.replace("{start}", String(startItem))
						.replace("{end}", String(endItem))
						.replace("{total}", String(result.total))}
				</div>
			)}

			{/* Products grid */}
			{result.items.length > 0 ? (
				<div className="grid grid-cols-1 gap-4 px-4 md:px-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{result.items.map((planta) => (
						<PlantCard key={planta.id} planta={planta} locale={locale} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 px-4">
					<p className="text-lg text-muted-foreground">{t.category.empty}</p>
				</div>
			)}

			{/* Pagination */}
			{result.items.length > 0 && result.totalPages > 1 && (
				<PaginationComponent
					currentPage={result.page}
					totalPages={result.totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
