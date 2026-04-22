import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { z } from "zod";

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
	validateSearch: z.object({
		priceMin: z.coerce.number().optional(),
		priceMax: z.coerce.number().optional(),
		inStock: z.coerce.boolean().optional(),
		minRating: z.coerce.number().optional(),
		page: z.coerce.number().optional(),
	}),
	loaderDeps: ({ search }) => {
		return {
			filters: {
				priceMin: search.priceMin,
				priceMax: search.priceMax,
				inStock: search.inStock,
				minRating: search.minRating,
			},
			page: search.page ?? 1,
		};
	},
	loader: async ({ params, deps }) => {
		const categoria = CATEGORIAS.find((c) => c.slug === params.categoria);

		if (!categoria) {
			throw new Error("Category not found");
		}

		const pagination: Pagination = {
			page: deps.page,
			perPage: 12,
		};

		const result = getCategoriaPlantas(
			categoria.slug,
			deps.filters,
			pagination,
		);

		return {
			categoria,
			result,
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
	const navigate = useNavigate({ from: "/$categoria" });

	const { categoria, result } = Route.useLoaderData();

	const search = useSearch({ from: "/$categoria" });

	const PER_PAGE = 12;

	const filters: Filters = {
		priceMin: search.priceMin,
		priceMax: search.priceMax,
		inStock: search.inStock,
		minRating: search.minRating,
	};

	const handleFiltersChange = (newFilters: Filters) => {
		void navigate({
			to: "/$categoria",
			params: { categoria: categoria.slug },
			search: {
				priceMin: newFilters.priceMin,
				priceMax: newFilters.priceMax,
				inStock: newFilters.inStock,
				minRating: newFilters.minRating,
				page: 1,
			},
		});
	};

	const handleClearAll = () => {
		void navigate({
			to: "/$categoria",
			params: { categoria: categoria.slug },
			search: { page: 1 },
		});
	};

	const handlePageChange = (page: number) => {
		void navigate({
			to: "/$categoria",
			params: { categoria: categoria.slug },
			search: {
				...search,
				page,
			},
		});
	};

	const startItem = result.total > 0 ? (result.page - 1) * PER_PAGE + 1 : 0;
	const endItem = Math.min(result.page * PER_PAGE, result.total);

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
