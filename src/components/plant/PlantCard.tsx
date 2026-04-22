import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Planta } from "@/data/plantas/plantas";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";
import { cartActions, cartStore } from "@/store/cartStore";

const plantCardVariants = cva(
	"w-full overflow-hidden rounded-2xl border-t border-border bg-card pt-0 ring-1 ring-foreground/10",
	{
		variants: {
			variant: {
				default: "max-w-sm mx-auto",
				carousel: "w-full",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type PlantCardProps = {
	planta: Planta;
	locale: Locale;
	mostrarBuyButton?: boolean;
	variant?: "default" | "carousel";
	className?: string;
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

export function PlantCardSkeleton({
	variant = "default",
}: {
	variant?: "default" | "carousel";
}) {
	return (
		<Card
			className={cn(
				"overflow-hidden rounded-2xl border-t border-border bg-card pt-0 ring-1 ring-foreground/10",
				plantCardVariants({ variant }),
			)}
		>
			{/* Image skeleton — flush to top, no rounded corners */}
			<div className="overflow-hidden bg-muted">
				<Skeleton className="h-48 w-full rounded-none sm:h-56" />
			</div>

			{/* Content skeleton */}
			<div className="flex flex-col gap-3 px-4 pt-4 pb-4">
				{/* Title */}
				<Skeleton className="h-5 w-3/4" />

				{/* Description — 2 lines */}
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
				</div>

				{/* Price */}
				<Skeleton className="h-7 w-20" />
			</div>

			{/* Footer — Button skeleton */}
			<CardFooter className="px-4 pb-4 pt-0">
				<Skeleton className="h-9 w-full" />
			</CardFooter>
		</Card>
	);
}

export function PlantCard({
	planta,
	locale,
	mostrarBuyButton = true,
	variant = "default",
	className,
}: PlantCardProps) {
	const t = translations[locale];
	const cartItems = useStore(cartStore, (state) => state.items);
	const cartItem = cartItems.find((i) => i.plantaId === planta.id);
	const quantity = cartItem?.quantity ?? 0;

	const handleAddToCart = () => {
		cartActions.addItem(planta);
	};

	const handleDecrease = () => {
		if (quantity <= 1) {
			cartActions.removeItem(planta.id);
		} else {
			cartActions.updateQuantity(planta.id, quantity - 1);
		}
	};

	const handleIncrease = () => {
		cartActions.updateQuantity(planta.id, quantity + 1);
	};

	return (
		<Card className={cn(plantCardVariants({ variant }), className ?? "")}>
			{/* Image - flush to top, no padding above */}
			<Link
				to="/product/$slug"
				params={{ slug: planta.slug }}
				className="block overflow-hidden bg-muted"
			>
				<img
					src={planta.imagenUrl}
					alt={planta.nombre}
					className="h-48 w-full object-cover sm:h-56 cursor-pointer transition-transform hover:scale-105"
					loading="lazy"
				/>
			</Link>

			{/* Content */}
			<div className="flex flex-col gap-3 px-4 pt-4 pb-4">
				{/* Title */}
				<Link
					to="/product/$slug"
					params={{ slug: planta.slug }}
					className="block cursor-pointer"
				>
					<h3 className="text-lg font-heading text-foreground leading-tight hover:text-foreground/80 transition-colors">
						{planta.nombre}
					</h3>
				</Link>

				{/* Description - optional, truncated */}
				{planta.descripcion && (
					<p className="text-sm text-muted-foreground line-clamp-2 leading-snug">
						{planta.descripcion}
					</p>
				)}

				{/* Price row */}
				<div className="flex items-baseline gap-3">
					<span className="text-2xl font-mono font-medium text-foreground">
						{formatPrice(planta.precio, locale)}
					</span>
				</div>
			</div>

			{/* Footer - Add to cart button */}
			{mostrarBuyButton && (
				<CardFooter className="px-4 pb-4 pt-0">
					{cartItem ? (
						<div className="flex w-full items-center justify-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								onClick={handleDecrease}
								aria-label={t.cart.remove}
							>
								<span className="text-sm font-medium">−</span>
							</Button>
							<span className="w-8 text-center text-sm font-medium">
								{quantity}
							</span>
							<Button
								type="button"
								variant="outline"
								size="icon-sm"
								onClick={handleIncrease}
								aria-label={t.cart.quantity}
							>
								<span className="text-sm font-medium">+</span>
							</Button>
						</div>
					) : (
						<Button
							type="button"
							className="w-full cursor-pointer"
							onClick={handleAddToCart}
						>
							{t.plantCard.addToCart}
						</Button>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
