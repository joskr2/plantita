import { createStore } from "@tanstack/react-store";
import type { Planta } from "@/data/plantas/plantas";

export type CartItem = {
	plantaId: string;
	planta: Planta;
	quantity: number;
};

export type CartState = {
	items: CartItem[];
};

const STORAGE_KEY = "tiendita-cart";

// SSR guard for localStorage
function loadFromStorage(): CartItem[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveToStorage(items: CartItem[]) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		// ignore
	}
}

const initialState: CartState = {
	items: loadFromStorage(),
};

export const cartStore = createStore(initialState);

// Cart actions
function addItem(planta: Planta, quantity = 1) {
	const current = cartStore.get();
	const existing = current.items.find((i) => i.plantaId === planta.id);
	let newItems: CartItem[];
	if (existing) {
		newItems = current.items.map((i) =>
			i.plantaId === planta.id ? { ...i, quantity: i.quantity + quantity } : i,
		);
	} else {
		newItems = [...current.items, { plantaId: planta.id, planta, quantity }];
	}
	cartStore.setState(() => ({ items: newItems }));
}

function removeItem(plantaId: string) {
	const current = cartStore.get();
	const newItems = current.items.filter((i) => i.plantaId !== plantaId);
	cartStore.setState(() => ({ items: newItems }));
}

function updateQuantity(plantaId: string, quantity: number) {
	const current = cartStore.get();
	let newItems: CartItem[];
	if (quantity <= 0) {
		newItems = current.items.filter((i) => i.plantaId !== plantaId);
	} else {
		newItems = current.items.map((i) =>
			i.plantaId === plantaId ? { ...i, quantity } : i,
		);
	}
	cartStore.setState(() => ({ items: newItems }));
}

function clearCart() {
	cartStore.setState(() => ({ items: [] }));
}

// Persistence - single subscription instead of calling saveToStorage in each action
if (typeof window !== "undefined") {
	cartStore.subscribe((state) => {
		saveToStorage(state.items);
	});
}

// Selector helpers
export function selectCartItems(state: CartState) {
	return state.items;
}

export function selectCartTotal(state: CartState) {
	return state.items.reduce((sum, i) => sum + i.planta.precio * i.quantity, 0);
}

export function selectCartCount(state: CartState) {
	return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

// Export actions for use in event handlers
export const cartActions = { addItem, removeItem, updateQuantity, clearCart };
