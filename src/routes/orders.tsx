import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { OrderCard } from "@/components/order/OrderCard";
import { OrdersTable } from "@/components/order/OrdersTable";
import { MOCK_ORDERS } from "@/data/ordersSeed";
import { useIsMobile } from "@/hooks/useIsMobile";
import { orderActions, ordersStore } from "@/store/orderStore";

export const Route = createFileRoute("/orders")({
	component: OrdersPage,
});

function OrdersPage() {
	const isMobile = useIsMobile();
	const orders = useStore(ordersStore, (state) => state.orders);

	// Seed on first load if empty (browser only)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("tiendita-orders");
			if (!stored || JSON.parse(stored).orders?.length === 0) {
				MOCK_ORDERS.forEach((order) => {
					orderActions.addOrder({
						status: order.status,
						items: order.items,
						subtotal: order.subtotal,
						tax: order.tax,
						shipping: order.shipping,
						total: order.total,
						shippingAddress: order.shippingAddress,
					});
				});
			}
		}
	}, []);

	if (orders.length === 0) {
		return (
			<div className="flex min-h-svh p-6">
				<div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
					<h1 className="text-2xl font-bold">Orders</h1>
					<p className="text-muted-foreground">No orders yet</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-svh p-6">
			<div className="flex w-full flex-col gap-4 text-sm leading-loose">
				<h1 className="text-2xl font-bold">Orders</h1>

				{isMobile ? (
					<div className="flex flex-col gap-3">
						{orders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				) : (
					<OrdersTable orders={orders} locale="es" />
				)}
			</div>
		</div>
	);
}
