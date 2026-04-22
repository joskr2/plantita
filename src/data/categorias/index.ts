import { CATEGORIAS } from "@/data/categorias/categorias";
import type { Planta } from "@/data/plantas/plantas";
import { PLANTAS } from "@/data/plantas/plantas";

export type Filters = {
	priceMin?: number;
	priceMax?: number;
	inStock?: boolean;
	minRating?: number;
};

export type Pagination = {
	page: number;
	perPage: number;
};

export type CategoriaPlantasResult = {
	items: Planta[];
	total: number;
	page: number;
	totalPages: number;
};

const DEFAULT_PER_PAGE = 12;

export function getCategoriaPlantas(
	slug: string,
	filters: Filters = {},
	pagination: Pagination = { page: 1, perPage: DEFAULT_PER_PAGE },
): CategoriaPlantasResult {
	// Find categoria by slug
	const categoria = CATEGORIAS.find((c) => c.slug === slug);

	if (!categoria) {
		return { items: [], total: 0, page: 1, totalPages: 0 };
	}

	// Filter PLANTAS by categoriaId
	let filtered = PLANTAS.filter((p) => p.categoriaId === categoria.id);

	// Apply filters
	if (filters.priceMin !== undefined) {
		filtered = filtered.filter((p) => p.precio >= (filters.priceMin ?? 0));
	}
	if (filters.priceMax !== undefined) {
		filtered = filtered.filter(
			(p) => p.precio <= (filters.priceMax ?? Infinity),
		);
	}
	if (filters.inStock !== undefined) {
		filtered = filtered.filter((p) =>
			filters.inStock ? (p.stock ?? 0) > 0 : (p.stock ?? 0) === 0,
		);
	}
	if (filters.minRating !== undefined) {
		filtered = filtered.filter(
			(p) => (p.rating ?? 0) >= (filters.minRating ?? 0),
		);
	}

	const total = filtered.length;
	const totalPages = Math.ceil(total / pagination.perPage);
	const start = (pagination.page - 1) * pagination.perPage;
	const items = filtered.slice(start, start + pagination.perPage);

	return { items, total, page: pagination.page, totalPages };
}
