import { PLANTAS } from "@/data/plantas/plantas";
import type { Order } from "@/store/orderStore";

const _potus = PLANTAS.find((p) => p.id === "potus");
const _sanchezia = PLANTAS.find((p) => p.id === "sanchezia");
const _cinta = PLANTAS.find((p) => p.id === "cinta");

// All these IDs exist in the seed data, safe to assert
const getPlanta = (id: string) => {
	const planta = PLANTAS.find((p) => p.id === id);
	if (!planta) throw new Error(`Planta ${id} not found in seed data`);
	return planta;
};

export const MOCK_ORDERS: Order[] = [
	{
		id: "ord-001",
		date: "2026-04-15T10:30:00.000Z",
		status: "delivered",
		items: [
			{
				plantaId: getPlanta("potus").id,
				planta: getPlanta("potus"),
				quantity: 2,
				unitPrice: getPlanta("potus").precio,
			},
			{
				plantaId: getPlanta("cinta").id,
				planta: getPlanta("cinta"),
				quantity: 1,
				unitPrice: getPlanta("cinta").precio,
			},
		],
		subtotal: 35.97,
		tax: 3.6,
		shipping: 0,
		total: 39.57,
		shippingAddress: {
			name: "María García",
			street: "Av. Brasil 1234",
			city: "Lima",
			zip: "15001",
			country: "Perú",
		},
	},
	{
		id: "ord-002",
		date: "2026-04-18T14:15:00.000Z",
		status: "shipped",
		items: [
			{
				plantaId: getPlanta("sanchezia").id,
				planta: getPlanta("sanchezia"),
				quantity: 1,
				unitPrice: getPlanta("sanchezia").precio,
			},
		],
		subtotal: 18.5,
		tax: 1.85,
		shipping: 5.0,
		total: 25.35,
		shippingAddress: {
			name: "Juan Pérez",
			street: "Calle Lima 567",
			city: "Arequipa",
			zip: "04001",
			country: "Perú",
		},
	},
	{
		id: "ord-003",
		date: "2026-04-20T09:00:00.000Z",
		status: "pending",
		items: [
			{
				plantaId: getPlanta("potus").id,
				planta: getPlanta("potus"),
				quantity: 1,
				unitPrice: getPlanta("potus").precio,
			},
			{
				plantaId: getPlanta("cinta").id,
				planta: getPlanta("cinta"),
				quantity: 3,
				unitPrice: getPlanta("cinta").precio,
			},
		],
		subtotal: 42.96,
		tax: 4.3,
		shipping: 5.0,
		total: 52.26,
	},
];
