import { NextIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { CATEGORIAS } from "@/data/categorias/categorias";
import { PLANTAS } from "@/data/plantas/plantas";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

export const Route = createFileRoute("/product/$slug")({
	component: ProductDetailPage,
});

function ProductDetailPage() {
	const locale: Locale = "es";
	const params = Route.useParams();
	const planta = PLANTAS.find((p) => p.slug === params.slug);
	const categoria = planta
		? CATEGORIAS.find((c) => c.id === planta.categoriaId)
		: null;

	const t = translations[locale];

	if (!planta) {
		return (
			<div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
				<h1 className="font-heading text-2xl font-bold">
					{t.product.productNotFound ?? "Product not found"}
				</h1>
				<p className="text-muted-foreground">
					{t.product.productNotFoundDescription ??
						"The product you are looking for does not exist."}
				</p>
				<Link to="/" className="text-primary hover:underline">
					{t.product.returnHome}
				</Link>
			</div>
		);
	}

	// All data from centralized mock — no hardcoded values in the page
	const images = planta.images ?? [planta.imagenUrl];

	const specifications = planta.specifications ?? {};

	const reviews = planta.reviews ?? [];

	// Related: same category, exclude current, max 4
	const relatedProducts = PLANTAS.filter(
		(p) => p.categoriaId === planta.categoriaId && p.id !== planta.id,
	).slice(0, 4);

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
						<ProductGallery images={images} productName={planta.nombre} />
					</div>

					{/* Right column - Product info */}
					<div>
						<ProductInfo
							planta={planta}
							locale={locale}
							categoryName={categoria?.nombre ?? "Planta"}
							onAddToCart={handleAddToCart}
							onBuyNow={handleBuyNow}
						/>
					</div>
				</div>

				{/* Tabs section */}
				<div className="mt-12">
					<ProductTabs
						locale={locale}
						description={planta.descripcion}
						specifications={specifications}
						reviews={reviews}
					/>
				</div>

				{/* Related products — grid of 4 cards on desktop */}
				{relatedProducts.length > 0 && (
					<div className="mt-16">
						<RelatedProducts products={relatedProducts} locale={locale} />
					</div>
				)}
			</main>
		</div>
	);
}
