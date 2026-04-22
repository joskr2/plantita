export type Categoria = {
	id: string;
	nombre: string;
	slug: string;
	bannerImage: string;
	descripcion: string;
};

export const CATEGORIAS: Categoria[] = [
	{
		id: "1",
		nombre: "Interior",
		slug: "interior",
		bannerImage:
			"https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&h=400&fit=crop",
		descripcion:
			"Plantas perfectas para decorar tu hogar. Purifican el aire y aportan vida a cualquier espacio interior.",
	},
	{
		id: "2",
		nombre: "Exterior",
		slug: "exterior",
		bannerImage:
			"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop",
		descripcion:
			"Jardín, balcón o terraza. Encuentra las mejores opciones para tus espacios al aire libre.",
	},
	{
		id: "3",
		nombre: "Oficina",
		slug: "oficina",
		bannerImage:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
		descripcion:
			"Mejora tu productividad y ambiente de trabajo con plantas que reducen el estrés y aumenta la creatividad.",
	},
	{
		id: "4",
		nombre: "Regalos",
		slug: "regalos",
		bannerImage:
			"https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1200&h=400&fit=crop",
		descripcion:
			"Regala vida y naturaleza. Plantas perfectas para cualquier ocasión especial.",
	},
	{
		id: "5",
		nombre: "Decoración",
		slug: "decoracion",
		bannerImage:
			"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&h=400&fit=crop",
		descripcion:
			"Dale estilo a tu espacio con opciones decorativas que combinan belleza y personalidad.",
	},
];
