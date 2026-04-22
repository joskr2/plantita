import { createStore } from "@tanstack/react-store";
import type { Planta } from "@/data/plantas/plantas";

export type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "cancelled";

export type OrderItem = {
	plantaId: string;
	planta: Planta;
	quantity: number;
	unitPrice: number;
};

export type Order = {
	id: string;
	date: string;
	status: OrderStatus;
	items: OrderItem[];
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
	shippingAddress?: {
		name: string;
		street: string;
		city: string;
		zip: string;
		country: string;
	};
};

export type OrdersState = {
	orders: Order[];
};

const STORAGE_KEY = "tiendita-orders";

// SSR guard for localStorage
function loadFromStorage(): Order[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveToStorage(orders: Order[]) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
	} catch {
		// ignore
	}
}

const initialState: OrdersState = {
	orders: loadFromStorage(),
};

export const ordersStore = createStore(initialState);

// Order actions
const orderActions = {
	addOrder(orderData: Omit<Order, "id" | "date">): Order {
		const newOrder: Order = {
			...orderData,
			id: crypto.randomUUID(),
			date: new Date().toISOString(),
		};
		const current = ordersStore.get();
		const newOrders = [...current.orders, newOrder];
		ordersStore.setState(() => ({ orders: newOrders }));
		return newOrder;
	},

	updateOrderStatus(id: string, status: OrderStatus) {
		const current = ordersStore.get();
		const newOrders = current.orders.map((o) =>
			o.id === id ? { ...o, status } : o,
		);
		ordersStore.setState(() => ({ orders: newOrders }));
	},

	clearOrders() {
		ordersStore.setState(() => ({ orders: [] }));
	},
};

// Persistence - single subscription
if (typeof window !== "undefined") {
	ordersStore.subscribe((state) => {
		saveToStorage(state.orders);
	});
}

// Selectors
export const selectAllOrders = (state: OrdersState) => state.orders;

export const selectOrdersByStatus = (state: OrdersState, status: OrderStatus) =>
	state.orders.filter((o) => o.status === status);

export const selectOrderById = (state: OrdersState, id: string) =>
	state.orders.find((o) => o.id === id);

// Export actions
export { orderActions };
