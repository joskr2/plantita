import { useState } from "react";
import { type Locale, translations } from "@/i18n/translations";
import type { Order } from "@/store/orderStore";

type OrderDetailProps = {
	order: Order;
	locale?: Locale;
};

export function OrderDetail({
	order,
	locale = "en" as Locale,
}: OrderDetailProps) {
	const [expanded, setExpanded] = useState(false);

	const t = translations[locale];

	const priceFormatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "USD",
	});

	return (
		<div className="flex flex-col gap-3">
			<button
				type="button"
				onClick={() => setExpanded(!expanded)}
				className="text-sm text-primary hover:underline"
			>
				{expanded ? t.orderDetail.hideDetails : t.orderDetail.viewDetails}
			</button>

			{expanded && (
				<div className="flex flex-col gap-3">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b">
								<th className="text-left font-medium">{t.orderDetail.items}</th>
								<th className="text-right font-medium">
									{t.orderDetail.quantity}
								</th>
								<th className="text-right font-medium">
									{t.orderDetail.unitPrice}
								</th>
								<th className="text-right font-medium">
									{t.orderDetail.subtotal}
								</th>
							</tr>
						</thead>
						<tbody>
							{order.items.map((item) => (
								<tr key={item.plantaId} className="border-b">
									<td className="py-2">{item.planta.nombre}</td>
									<td className="py-2 text-right">{item.quantity}</td>
									<td className="py-2 text-right">
										{priceFormatter.format(item.unitPrice)}
									</td>
									<td className="py-2 text-right">
										{priceFormatter.format(item.unitPrice * item.quantity)}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="flex flex-col gap-1 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">
								{t.orderDetail.subtotal}
							</span>
							<span>{priceFormatter.format(order.subtotal)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">{t.orderDetail.tax}</span>
							<span>{priceFormatter.format(order.tax)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">
								{t.orderDetail.shipping}
							</span>
							<span>
								{order.shipping === 0
									? t.orderDetail.free
									: priceFormatter.format(order.shipping)}
							</span>
						</div>
						<div className="flex justify-between border-t pt-1 font-semibold">
							<span>{t.orderDetail.total}</span>
							<span>{priceFormatter.format(order.total)}</span>
						</div>
					</div>

					{order.shippingAddress && (
						<div className="text-sm text-muted-foreground">
							<span className="font-medium text-foreground">
								{t.orderDetail.shipTo}:
							</span>{" "}
							{order.shippingAddress.name}, {order.shippingAddress.street},{" "}
							{order.shippingAddress.city}, {order.shippingAddress.zip},{" "}
							{order.shippingAddress.country}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
