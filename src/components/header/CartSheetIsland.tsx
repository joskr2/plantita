"use client";

import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { ShoppingCart, Trash2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetRoot,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { cartActions, cartStore, selectCartTotal } from "@/store/cartStore";

interface CartSheetIslandProps {
	locale: Locale;
}

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

export function CartSheetIsland({ locale }: CartSheetIslandProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);
	const isMobile = useIsMobile();
	const t = translations[locale];

	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Always call hooks - SSR safe with empty defaults
	const storeItems = useStore(cartStore, (state) => state.items);
	const storeTotal = useStore(cartStore, (state) => selectCartTotal(state));

	// Use empty defaults during SSR, real values after mount
	const items = mounted ? storeItems : [];
	const total = mounted ? storeTotal : 0;
	const count = items.reduce((sum, i) => sum + i.quantity, 0);

	const handleDecrease = (plantaId: string, currentQty: number) => {
		if (currentQty <= 1) {
			cartActions.removeItem(plantaId);
		} else {
			cartActions.updateQuantity(plantaId, currentQty - 1);
		}
	};

	const handleIncrease = (plantaId: string, currentQty: number) => {
		cartActions.updateQuantity(plantaId, currentQty + 1);
	};

	const handleRemove = (plantaId: string) => {
		cartActions.removeItem(plantaId);
	};

	const cartContent = (
		<>
			<SheetHeader>
				<SheetTitle>{t.cartLabel}</SheetTitle>
				<SheetDescription>
					{t.cartDescription ?? "Your cart is empty"}
				</SheetDescription>
			</SheetHeader>

			{items.length === 0 ? (
				<div className="mt-4 flex flex-1 flex-col items-center justify-center py-12 text-muted-foreground">
					<ShoppingCart
						className="size-12 mb-4 opacity-50"
						aria-hidden="true"
					/>
					<p>{t.cart.empty}</p>
				</div>
			) : (
				<div className="mt-4 flex flex-col gap-4 overflow-y-auto">
					{items.map((item) => (
						<div key={item.plantaId} className="flex gap-3">
							<img
								src={item.planta.imagenUrl}
								alt={item.planta.nombre}
								className="size-16 shrink-0 rounded-lg object-cover"
							/>
							<div className="flex flex-1 flex-col gap-1">
								<span className="text-sm font-medium leading-tight">
									{item.planta.nombre}
								</span>
								<span className="text-xs text-muted-foreground">
									{formatPrice(item.planta.precio, locale)}
								</span>
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="outline"
										size="icon-sm"
										onClick={() => handleDecrease(item.plantaId, item.quantity)}
										aria-label={t.cart.quantity}
									>
										<span className="text-sm font-medium">−</span>
									</Button>
									<span className="w-6 text-center text-sm">
										{item.quantity}
									</span>
									<Button
										type="button"
										variant="outline"
										size="icon-sm"
										onClick={() => handleIncrease(item.plantaId, item.quantity)}
										aria-label={t.cart.quantity}
									>
										<span className="text-sm font-medium">+</span>
									</Button>
								</div>
							</div>
							<div className="flex flex-col items-end justify-between">
								<Button
									type="button"
									variant="ghost"
									size="icon-xs"
									onClick={() => handleRemove(item.plantaId)}
									aria-label={t.cart.remove}
									className="text-muted-foreground hover:text-destructive"
								>
									<Trash2 className="size-4" />
								</Button>
								<span className="text-sm font-medium">
									{formatPrice(item.planta.precio * item.quantity, locale)}
								</span>
							</div>
						</div>
					))}

					<div className="mt-4 border-t pt-4">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">{t.cart.subtotal}</span>
							<span className="text-lg font-semibold">
								{formatPrice(total, locale)}
							</span>
						</div>
						<Link
							to="/checkout"
							className="mt-3 block"
							onClick={() => setIsOpen(false)}
						>
							<Button className="w-full">{t.cart.checkout}</Button>
						</Link>
					</div>
				</div>
			)}
		</>
	);

	return (
		<SheetRoot open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					aria-label={count > 0 ? `${t.cartLabel} (${count})` : t.cartLabel}
					className="relative"
					suppressHydrationWarning
				>
					<ShoppingCart className="size-5" aria-hidden="true" />
					{count > 0 && (
						<span
							className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
							suppressHydrationWarning
						>
							{count}
						</span>
					)}
				</Button>
			</SheetTrigger>
			{isMobile ? (
				<SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
					{cartContent}
				</SheetContent>
			) : (
				<SheetContent side="right" className="h-full w-96">
					{cartContent}
				</SheetContent>
			)}
		</SheetRoot>
	);
}
