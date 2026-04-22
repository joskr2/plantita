import { NextIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { CATEGORIAS } from "@/data/categorias/categorias";
import { PLANTAS } from "@/data/plantas/plantas";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

// Lazy load client-only components (useState, useEffect)
const ProductGallery = lazy(() =>
	import("@/components/product/ProductGallery").then((m) => ({
		default: m.ProductGallery,
	})),
);
const ProductInfo = lazy(() =>
	import("@/components/product/ProductInfo").then((m) => ({
		default: m.ProductInfo,
	})),
);
const ProductTabs = lazy(() =>
	import("@/components/product/ProductTabs").then((m) => ({
		default: m.ProductTabs,
	})),
);
const RelatedProducts = lazy(() =>
	import("@/components/product/RelatedProducts").then((m) => ({
		default: m.RelatedProducts,
	})),
);

export const Route = createFileRoute("/product/$slug")({
	loader: async ({ params }) => {
		const planta = PLANTAS.find((p) => p.slug === params.slug);

		if (!planta) {
			throw new Error("Product not found");
		}

		const categoria = CATEGORIAS.find((c) => c.id === planta.categoriaId);
		const images = planta.images ?? [planta.imagenUrl];
		const specifications = planta.specifications ?? {};
		const reviews = planta.reviews ?? [];

		const relatedProducts = PLANTAS.filter(
			(p) => p.categoriaId === planta.categoriaId && p.id !== planta.id,
		).slice(0, 4);

		return {
			planta,
			categoria: categoria ?? null,
			images,
			specifications,
			reviews,
			relatedProducts,
		};
	},
	head: ({ loaderData }) => ({
		meta: [
			{ title: `${loaderData.planta.nombre} | Tiendita` },
			{
				name: "description",
				content:
					loaderData.planta.descripcion?.slice(0, 160) ??
					`${loaderData.planta.nombre} - Planta de calidad`,
			},
			{ property: "og:title", content: loaderData.planta.nombre },
			{
				property: "og:description",
				content: loaderData.planta.descripcion?.slice(0, 160),
			},
			{ property: "og:image", content: loaderData.images[0] },
			{ property: "og:type", content: "product" },
		],
	}),
	pendingComponent: () => <ProductDetailSkeleton />,
	component: ProductDetailPage,
});

function ProductDetailPage() {
	const locale: Locale = "es";
	const {
		planta,
		categoria,
		images,
		specifications,
		reviews,
		relatedProducts,
	} = Route.useLoaderData();
	const t = translations[locale];

	// All data from centralized mock — no hardcoded values in the page

	const handleAddToCart = (quantity: number) => {
		console.log(`Added ${quantity} of ${planta.nombre} to cart`);
	};

	const handleBuyNow = (quantity: number) => {
		console.log(`Buying ${quantity} of ${planta.nombre} now`);
	};

	return (
		<div className="min-h-svh bg-background">
			{/* Breadcrumb */}
			<nav
				className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
				aria-label="Breadcrumb"
			>
				<ol className="flex items-center gap-2 text-sm">
					<li>
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<HugeiconsIcon
								icon={NextIcon}
								className="mr-1 inline size-4 rotate-180"
							/>
							{t.product.home}
						</Link>
					</li>
					<li className="text-muted-foreground">/</li>
					<li>
						<Link
							to="/$categoria"
							params={{ categoria: planta.categoriaId }}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							{categoria?.nombre ?? "Category"}
						</Link>
					</li>
					<li className="text-muted-foreground">/</li>
					<li>
						<span className="text-foreground font-medium" aria-current="page">
							{planta.nombre}
						</span>
					</li>
				</ol>
			</nav>

			{/* Main product content */}
			<main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
					{/* Left column - Image gallery */}
					<div className="lg:sticky lg:top-8 lg:self-start">
						<Suspense
							fallback={
								<div className="aspect-square bg-muted animate-pulse rounded-lg" />
							}
						>
							<ProductGallery images={images} productName={planta.nombre} />
						</Suspense>
					</div>

					{/* Right column - Product info */}
					<div>
						<Suspense
							fallback={
								<div className="h-96 bg-muted animate-pulse rounded-lg" />
							}
						>
							<ProductInfo
								planta={planta}
								locale={locale}
								categoryName={categoria?.nombre ?? "Planta"}
								onAddToCart={handleAddToCart}
								onBuyNow={handleBuyNow}
							/>
						</Suspense>
					</div>
				</div>

				{/* Tabs section */}
				<div className="mt-12">
					<Suspense
						fallback={
							<div className="h-64 bg-muted animate-pulse rounded-lg" />
						}
					>
						<ProductTabs
							locale={locale}
							description={planta.descripcion}
							specifications={specifications}
							reviews={reviews}
						/>
					</Suspense>
				</div>

				{/* Related products — grid of 4 cards on desktop */}
				{relatedProducts && relatedProducts.length > 0 && (
					<div className="mt-16">
						<Suspense
							fallback={
								<div className="h-64 bg-muted animate-pulse rounded-lg" />
							}
						>
							<RelatedProducts products={relatedProducts} locale={locale} />
						</Suspense>
					</div>
				)}
			</main>
		</div>
	);
}

function ProductDetailSkeleton() {
	return (
		<div className="min-h-svh bg-background">
			<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2 text-sm">
					<div className="h-4 w-16 bg-muted animate-pulse rounded" />
					<div className="h-4 w-4 bg-muted animate-pulse rounded" />
					<div className="h-4 w-24 bg-muted animate-pulse rounded" />
				</div>
			</div>
			<main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="aspect-square bg-muted animate-pulse rounded-lg" />
					<div className="space-y-4">
						<div className="h-8 w-48 bg-muted animate-pulse rounded" />
						<div className="h-6 w-32 bg-muted animate-pulse rounded" />
						<div className="h-24 w-full bg-muted animate-pulse rounded" />
						<div className="h-12 w-40 bg-muted animate-pulse rounded" />
					</div>
				</div>
			</main>
		</div>
	);
}
