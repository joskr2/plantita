import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { cartActions, cartStore, selectCartTotal } from "@/store/cartStore";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

const fmt = new Intl.NumberFormat("es-MX", {
	style: "currency",
	currency: "PEN",
});

const fmtEn = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function formatPrice(precio: number, locale: Locale): string {
	return locale === "es" ? fmt.format(precio) : fmtEn.format(precio);
}

function CheckoutPage() {
	const locale: Locale = "es";
	const t = translations[locale];

	const items = useStore(cartStore, (state) => state.items);

	// Redirect if cart is empty
	if (items.length === 0) {
		if (typeof window !== "undefined") {
			redirect("/");
		}
		return null;
	}

	const subtotal = selectCartTotal({ items });
	const tax = subtotal * 0.1;
	const shipping = subtotal >= 500 ? 0 : 15;
	const total = subtotal + tax + shipping;

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

	return (
		<div className="container mx-auto max-w-2xl px-4 py-8">
			<h1 className="text-3xl font-heading mb-6">{t.checkout.title}</h1>

			{/* Items list */}
			<div className="mb-6 flex flex-col gap-4">
				{items.map((item) => (
					<div key={item.plantaId} className="flex gap-4 rounded-lg border p-3">
						<img
							src={item.planta.imagenUrl}
							alt={item.planta.nombre}
							className="size-20 shrink-0 rounded-lg object-cover"
						/>
						<div className="flex flex-1 flex-col gap-1">
							<span className="font-medium">{item.planta.nombre}</span>
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
								<span className="w-8 text-center text-sm">{item.quantity}</span>
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
						<span className="flex items-center text-sm font-medium">
							{formatPrice(item.planta.precio * item.quantity, locale)}
						</span>
					</div>
				))}
			</div>

			{/* Summary */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">{t.checkout.summary}</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-3">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">{t.checkout.subtotal}</span>
						<span>{formatPrice(subtotal, locale)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">{t.checkout.tax}</span>
						<span>{formatPrice(tax, locale)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">{t.checkout.shipping}</span>
						<span>
							{shipping === 0 ? t.checkout.free : formatPrice(shipping, locale)}
						</span>
					</div>
					<div className="border-t pt-3 flex justify-between font-semibold">
						<span>{t.checkout.total}</span>
						<span className="text-lg">{formatPrice(total, locale)}</span>
					</div>
					<Button className="w-full mt-2" size="lg">
						{t.checkout.pay.replace("{amount}", formatPrice(total, locale))}
					</Button>
				</CardContent>
			</Card>

			{/* Continue shopping */}
			<div className="mt-4 text-center">
				<Link
					to="/"
					className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
				>
					{t.checkout.continueShopping}
				</Link>
			</div>
		</div>
	);
}
