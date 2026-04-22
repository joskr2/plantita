import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { Planta } from "@/data/plantas/plantas";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type RelatedProductsProps = {
	products: Planta[];
	locale: Locale;
	title?: string;
};

const fmt = new Intl.NumberFormat("es-MX", {
	style: "currency",
	currency: "MXN",
});

const fmtEn = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function formatPrice(precio: number, locale: Locale): string {
	return locale === "es" ? fmt.format(precio) : fmtEn.format(precio);
}

function RelatedProductCard({
	planta,
	locale,
}: {
	planta: Planta;
	locale: Locale;
}) {
	const t = translations[locale];

	return (
		<Card className="overflow-hidden rounded-2xl border-t border-border bg-card pt-0 ring-1 ring-foreground/10">
			<Link
				to="/product/$slug"
				params={{ slug: planta.slug }}
				className="block"
			>
				<div className="overflow-hidden bg-muted">
					<img
						src={planta.imagenUrl}
						alt={planta.nombre}
						className="h-40 w-full object-cover transition-transform hover:scale-105"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-col gap-2 p-4">
					<h3 className="font-heading text-base font-medium text-foreground line-clamp-1">
						{planta.nombre}
					</h3>
					<span className="font-mono text-lg font-semibold text-foreground">
						{formatPrice(planta.precio, locale)}
					</span>
				</div>
			</Link>
			<CardFooter className="px-4 pb-4 pt-0">
				<Button
					variant="outline"
					size="sm"
					className="w-full"
					onClick={(e) => {
						e.preventDefault();
						// TODO: Add to cart
					}}
				>
					{t.plantCard.addToCart}
				</Button>
			</CardFooter>
		</Card>
	);
}

export function RelatedProducts({
	products,
	locale,
	title,
}: RelatedProductsProps) {
	const t = translations[locale];

	if (products.length === 0) {
		return null;
	}

	return (
		<section className="w-full" aria-label={title || t.product.relatedProducts}>
			<h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
				{title || t.product.relatedProducts}
			</h2>

			{/* Mobile: Carousel | Desktop: 4-column grid */}
			<div className="hidden lg:block">
				<div className="grid grid-cols-4 gap-4">
					{products.slice(0, 4).map((planta) => (
						<RelatedProductCard
							key={planta.id}
							planta={planta}
							locale={locale}
						/>
					))}
				</div>
			</div>

			<div className="lg:hidden">
				<Carousel
					className="w-full"
					opts={{
						loop: true,
						slidesPerView: 2,
						breakpoints: {
							"640": { slidesPerView: 3 },
						},
					}}
				>
					<CarouselContent className="-ml-4">
						{products.map((planta) => (
							<CarouselItem key={planta.id} className="pl-4">
								<RelatedProductCard planta={planta} locale={locale} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden sm:flex" />
					<CarouselNext className="hidden sm:flex" />
				</Carousel>
			</div>
		</section>
	);
}
