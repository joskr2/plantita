import { FavouriteIcon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Planta } from "@/data/plantas/plantas";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type ProductInfoProps = {
	planta: Planta;
	locale: Locale;
	categoryName: string;
	onAddToCart: (quantity: number) => void;
	onBuyNow: (quantity: number) => void;
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

function StarRating({
	rating = 4.5,
	reviewCount = 128,
}: {
	rating?: number;
	reviewCount?: number;
}) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	return (
		<div>
			<div
				className="flex items-center gap-1"
				role="img"
				aria-label={`${rating} out of 5 stars`}
			>
				{["first", "second", "third", "fourth", "fifth"].map((label, i) => (
					<HugeiconsIcon
						key={`star-${label}`}
						icon={StarIcon}
						className={`size-4 ${
							i < fullStars
								? "text-amber-400 fill-amber-400"
								: i === fullStars && hasHalfStar
									? "text-amber-400/50"
									: "text-muted-foreground/30"
						}`}
					/>
				))}
			</div>
			<span className="mt-1 block text-sm text-muted-foreground">
				{rating} ({reviewCount} reviews)
			</span>
		</div>
	);
}

export function ProductInfo({
	planta,
	locale,
	categoryName,
	onAddToCart,
	onBuyNow,
}: ProductInfoProps) {
	const t = translations[locale];
	const [quantity, setQuantity] = React.useState(1);

	const stock = planta.stock ?? 0;
	const isOutOfStock = stock === 0;
	const isLowStock = stock > 0 && stock <= 5;

	return (
		<div className="flex flex-col gap-6">
			{/* Category badge */}
			<Badge variant="secondary" className="w-fit">
				{categoryName}
			</Badge>

			{/* Product title */}
			<div>
				<h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
					{planta.nombre}
				</h1>
			</div>

			{/* Rating — from data layer */}
			<StarRating
				rating={planta.rating ?? 0}
				reviewCount={planta.reviewCount ?? 0}
			/>

			{/* Price */}
			<div className="flex items-baseline gap-3">
				<span className="font-mono text-4xl font-bold text-foreground sm:text-5xl">
					{formatPrice(planta.precio, locale)}
				</span>
			</div>

			{/* Short description */}
			{planta.descripcion && (
				<p className="text-base leading-relaxed text-muted-foreground">
					{planta.descripcion}
				</p>
			)}

			{/* Stock status */}
			<div className="flex items-center gap-2">
				{isOutOfStock ? (
					<Badge variant="destructive">{t.product.outOfStock}</Badge>
				) : isLowStock ? (
					<Badge
						variant="outline"
						className="border-orange-500 text-orange-600 dark:text-orange-400"
					>
						{t.product.lowStock.replace("{count}", String(stock))}
					</Badge>
				) : (
					<Badge
						variant="outline"
						className="border-green-600 text-green-700 dark:text-green-400"
					>
						{t.product.inStock}
					</Badge>
				)}
			</div>

			{/* Quantity selector */}
			<fieldset>
				<legend className="mb-2 text-sm font-medium text-foreground">
					{t.product.quantity}
				</legend>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => setQuantity((q) => Math.max(1, q - 1))}
						disabled={quantity <= 1 || isOutOfStock}
						aria-label={t.product.quantitySelector.decrease}
					>
						-
					</Button>
					<span
						className="min-w-[3rem] text-center font-medium"
						aria-live="polite"
						aria-atomic="true"
					>
						{quantity}
					</span>
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
						disabled={quantity >= stock || isOutOfStock}
						aria-label={t.product.quantitySelector.increase}
					>
						+
					</Button>
				</div>
			</fieldset>

			{/* Action buttons — full width on mobile, larger touch targets */}
			<div className="flex flex-col gap-3 sm:flex-row">
				<Button
					size="lg"
					className="h-14 w-full text-base sm:h-12 sm:w-auto sm:flex-1"
					onClick={() => onAddToCart(quantity)}
					disabled={isOutOfStock}
				>
					{t.product.addToCart}
				</Button>
				<Button
					variant="secondary"
					size="lg"
					className="h-14 w-full text-base sm:h-12 sm:w-auto sm:flex-1"
					onClick={() => onBuyNow(quantity)}
					disabled={isOutOfStock}
				>
					{t.product.buyNow}
				</Button>
				<Button
					variant="outline"
					size="lg"
					className="h-14 w-14 sm:h-12 sm:w-auto px-0 sm:px-4"
					aria-label={t.product.wishlist}
				>
					<HugeiconsIcon icon={FavouriteIcon} className="size-5" />
				</Button>
			</div>

			{/* Shipping info card */}
			<Card className="p-4">
				<div className="flex flex-col gap-2 text-sm">
					<div className="flex items-center gap-2 text-muted-foreground">
						<span>{t.product.soldBy}: Tiendita</span>
					</div>
					<div className="flex items-center gap-2 text-muted-foreground">
						<span>{t.product.freeShipping}</span>
					</div>
				</div>
			</Card>
		</div>
	);
}
