import type { Planta } from "./plantas/plantas";
import { PLANTAS } from "./plantas/plantas";

export type SeccionLayout = "carousel" | "grid" | "grid-2" | "grid-3";

export type Seccion = {
	id: string;
	nombre: string;
	slug: string;
	descripcion?: string;
	bannerImage?: string;
	productoIds: string[];
	autoScrollInterval?: number;
	layout: SeccionLayout;
};

export const SECCIONES: Seccion[] = [
	{
		id: "promociones",
		nombre: "Promociones de Temporada",
		slug: "promociones",
		descripcion: "Descuentos increíbles en plantas seleccionadas",
		bannerImage: "https://picsum.photos/seed/promo/1200/400",
		layout: "carousel",
		productoIds: ["potus", "lavanda", "suculenta"],
		autoScrollInterval: 7,
	},
	{
		id: "suculentas-oferta",
		nombre: "Suculentas al 50% OFF",
		slug: "suculentas-oferta",
		descripcion: "Las mejores suculentas con descuento",
		bannerImage: "https://picsum.photos/seed/suc/1200/400",
		layout: "grid-2",
		productoIds: ["suculenta", "cactus-escritorio", "potus", "sanchezia"],
	},
	{
		id: "plantas-interior",
		nombre: "Plantas de Interior",
		slug: "interior",
		bannerImage: "https://picsum.photos/seed/interior/1200/400",
		layout: "carousel",
		productoIds: ["potus", "sanchezia", "cinta", "ficus-elastica"],
		autoScrollInterval: 9,
	},
	{
		id: "regalos-perfectos",
		nombre: "Regalos Perfectos",
		slug: "regalos-perfectos",
		descripcion: "Plantas ideales para regalar",
		bannerImage: "https://picsum.photos/seed/gift/1200/400",
		layout: "grid-3",
		productoIds: [
			"bonsai",
			"suculenta",
			"lavanda",
			"buganvilla",
			"potus",
			"romero",
		],
	},
	{
		id: "nuevos-ingresos",
		nombre: "Nuevos Arrivals",
		slug: "nuevos-ingresos",
		descripcion: "Las últimas incorporaciones a nuestra tienda",
		bannerImage: "https://picsum.photos/seed/new/1200/400",
		layout: "carousel",
		productoIds: ["sanchezia", "buganvilla", "ficus-elastica"],
		autoScrollInterval: 8,
	},
];

export function getSeccionPlantas(seccion: Seccion): Planta[] {
	return seccion.productoIds
		.map((id) => PLANTAS.find((p) => p.id === id))
		.filter((p): p is Planta => p !== undefined);
}
