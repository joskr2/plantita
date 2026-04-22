import { createFileRoute, useSearch } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { CATEGORIAS } from "@/data/categorias/categorias";
import type { Filters, Pagination } from "@/data/categorias/index";
import { getCategoriaPlantas } from "@/data/categorias/index";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

// Lazy load client-only components
const FilterBar = lazy(() =>
	import("@/components/category/FilterBar").then((m) => ({
		default: m.FilterBar,
	})),
);
const PaginationComponent = lazy(() =>
	import("@/components/category/Pagination").then((m) => ({
		default: m.Pagination,
	})),
);
const PlantCard = lazy(() =>
	import("@/components/plant/PlantCard").then((m) => ({
		default: m.PlantCard,
	})),
);

export const Route = createFileRoute("/$categoria")({
	loader: async ({ params, location }) => {
		const categoria = CATEGORIAS.find((c) => c.slug === params.categoria);

		if (!categoria) {
			throw new Error("Category not found");
		}

		// Parse search params for filters
		const searchParams = new URLSearchParams(location.search.slice(1));
		const filters: Filters = {
			priceMin: searchParams.get("priceMin")
				? Number(searchParams.get("priceMin"))
				: undefined,
			priceMax: searchParams.get("priceMax")
				? Number(searchParams.get("priceMax"))
				: undefined,
			inStock:
				searchParams.get("inStock") === "true"
					? true
					: searchParams.get("inStock") === "false"
						? false
						: undefined,
			minRating: searchParams.get("minRating")
				? Number(searchParams.get("minRating"))
				: undefined,
		};

		const pagination: Pagination = {
			page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
			perPage: 12,
		};

		const result = getCategoriaPlantas(categoria.slug, filters, pagination);

		return {
			categoria,
			result,
			filters,
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData?.categoria) {
			return { meta: [{ title: "Categoría no encontrada | Tiendita" }] };
		}
		return {
			meta: [
				{ title: `${loaderData.categoria.nombre} | Tiendita` },
				{
					name: "description",
					content:
						loaderData.categoria.descripcion ??
						`Explora nuestra colección de plantas ${loaderData.categoria.nombre}`,
				},
			],
		};
	},
	pendingComponent: () => <CategorySkeleton />,
	component: CategoryPage,
});

function CategoryPage() {
	const locale: Locale = "es";
	const t = translations[locale];

	const { categoria, result, filters } = Route.useLoaderData();

	const search = useSearch({ from: "/$categoria" });

	const pagination: Pagination = {
		page: search.page ? Number(search.page) : 1,
		perPage: 12,
	};

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
		const searchStr = params.toString();
		window.location.search = searchStr ? `?${searchStr}` : "";
	};

	const handleClearAll = () => {
		window.location.search = "";
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams();
		if (filters?.priceMin !== undefined)
			params.set("priceMin", String(filters.priceMin));
		if (filters?.priceMax !== undefined)
			params.set("priceMax", String(filters.priceMax));
		if (filters?.inStock !== undefined)
			params.set("inStock", String(filters.inStock));
		if (filters?.minRating !== undefined)
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
			<Suspense
				fallback={
					<div className="h-12 bg-muted animate-pulse rounded mx-4 md:mx-8" />
				}
			>
				<FilterBar
					filters={filters}
					onFiltersChange={handleFiltersChange}
					onClearAll={handleClearAll}
					locale={locale}
				/>
			</Suspense>

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
				<Suspense
					fallback={
						<div className="h-12 bg-muted animate-pulse rounded mx-4 md:mx-8" />
					}
				>
					<PaginationComponent
						currentPage={result.page}
						totalPages={result.totalPages}
						onPageChange={handlePageChange}
					/>
				</Suspense>
			)}
		</div>
	);
}

function CategorySkeleton() {
	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Banner skeleton */}
			<div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
				<div className="h-full w-full bg-muted animate-pulse" />
			</div>
			{/* Filter bar skeleton */}
			<div className="h-12 bg-muted animate-pulse rounded mx-4 md:mx-8" />
			{/* Products grid skeleton */}
			<div className="grid grid-cols-1 gap-4 px-4 md:px-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{Array.from({ length: 8 }, () => (
					<div
						key={crypto.randomUUID()}
						className="h-80 bg-muted animate-pulse rounded-lg"
					/>
				))}
			</div>
		</div>
	);
}
