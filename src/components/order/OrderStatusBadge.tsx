import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import type { OrderStatus } from "@/store/orderStore";

type OrderStatusBadgeProps = {
	status: OrderStatus;
	locale?: Locale;
};

const statusStyles: Record<
	OrderStatus,
	{
		variant: "default" | "secondary" | "outline" | "destructive";
		className?: string;
	}
> = {
	pending: {
		variant: "default",
		className:
			"bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
	},
	confirmed: {
		variant: "default",
		className:
			"bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800",
	},
	shipped: {
		variant: "default",
		className:
			"bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800",
	},
	delivered: {
		variant: "default",
		className:
			"bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
	},
	cancelled: {
		variant: "destructive",
		className:
			"bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
	},
};

export function OrderStatusBadge({
	status,
	locale = "en" as Locale,
}: OrderStatusBadgeProps) {
	const t = translations[locale];

	const statusLabels: Record<OrderStatus, string> = {
		pending: t.orders.filter.pending,
		confirmed: t.orders.filter.confirmed,
		shipped: t.orders.filter.shipped,
		delivered: t.orders.filter.delivered,
		cancelled: t.orders.filter.cancelled,
	};

	const config = statusStyles[status];
	return (
		<Badge variant={config.variant} className={config.className}>
			{statusLabels[status]}
		</Badge>
	);
}
