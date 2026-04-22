import type { Order } from "@/store/orderStore";
import { OrderDetail } from "./OrderDetail";
import { OrderStatusBadge } from "./OrderStatusBadge";

type OrderCardProps = {
	order: Order;
	locale?: string;
};

export function OrderCard({ order, locale = "en" }: OrderCardProps) {
	const dateFormatter = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const priceFormatter = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "USD",
	});

	const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

	return (
		<div className="flex flex-col gap-3 rounded-lg border p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<span className="font-medium">
						#{order.id.slice(-6).toUpperCase()}
					</span>
					<OrderStatusBadge status={order.status} />
				</div>
				<span className="text-xs text-muted-foreground">
					{dateFormatter.format(new Date(order.date))}
				</span>
			</div>

			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">
					{itemCount} {itemCount === 1 ? "item" : "items"}
				</span>
				<span className="font-semibold">
					{priceFormatter.format(order.total)}
				</span>
			</div>

			<OrderDetail order={order} locale={locale} />
		</div>
	);
}
