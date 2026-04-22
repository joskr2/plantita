export type PlantaSpecifications = Record<string, string>;

export type PlantaReview = {
	id: string;
	author: string;
	rating: number;
	comment: string;
	date: string;
};

export type Planta = {
	id: string;
	nombre: string;
	slug: string;
	precio: number;
	imagenUrl: string;
	categoriaId: string;
	descripcion?: string;
	stock?: number;
	isActive?: boolean;
	isMobile?: boolean;
	/** Average rating 0-5 */
	rating?: number;
	/** Total number of reviews */
	reviewCount?: number;
	/** Additional product images (gallery) */
	images?: string[];
	/** Technical specifications */
	specifications?: PlantaSpecifications;
	/** Customer reviews */
	reviews?: PlantaReview[];
};

export const PLANTAS: Planta[] = [
	{
		id: "potus",
		nombre: "Potus",
		slug: "potus",
		precio: 12.99,
		imagenUrl: "https://picsum.photos/seed/potus/400/400",
		categoriaId: "1",
		descripcion:
			"El Potus (Epipremnum aureum) es una planta de interior perfecta para principiantes. Con sus hojas en forma de corazón y su capacidad de crecer tanto en agua como en tierra, es incredibly fácil de cuidar. Es conocida por purifyar el aire del hogar, eliminando toxinas como el formaldehído.",
		stock: 15,
		isActive: true,
		rating: 4.8,
		reviewCount: 234,
		images: [
			"https://picsum.photos/seed/potus/400/400",
			"https://picsum.photos/seed/potus/400/401",
			"https://picsum.photos/seed/potus/400/402",
			"https://picsum.photos/seed/potus/400/403",
		],
		specifications: {
			Height: "30-50 cm",
			Light: "Indirect sunlight to low light",
			Water: "Every 7-10 days",
			Soil: "Well-draining potting mix",
			Origin: "Southeast Asia",
			Difficulty: "Very easy",
			PetFriendly: "No (toxic if ingested)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "María G.",
				rating: 5,
				comment: "Hermosa planta, llegó en perfecto estado. Muy recomendable.",
				date: "2024-01-15",
			},
			{
				id: "rev-2",
				author: "Juan P.",
				rating: 4,
				comment:
					"Buena calidad, pero el envío tardó un poco más de lo esperado.",
				date: "2024-01-10",
			},
			{
				id: "rev-3",
				author: "Ana L.",
				rating: 5,
				comment:
					"Mi potus está hermoso, crece muy rápido y no necesita muchos cuidados.",
				date: "2023-12-20",
			},
		],
	},
	{
		id: "sanchezia",
		nombre: "Sanchezia",
		slug: "sanchezia",
		precio: 18.5,
		imagenUrl: "https://picsum.photos/seed/sanchezia/400/400",
		categoriaId: "1",
		descripcion:
			"La Sanchezia es una planta tropical conocida por sus impresionantes hojas variegadas con nervaduras amarillas. Agrega un toque de color y vegetación a cualquier espacio interior.",
		stock: 8,
		isActive: true,
		isMobile: true,
		rating: 4.5,
		reviewCount: 89,
		images: [
			"https://picsum.photos/seed/sanchezia/400/400",
			"https://picsum.photos/seed/sanchezia/400/401",
			"https://picsum.photos/seed/sanchezia/400/402",
		],
		specifications: {
			Height: "40-80 cm",
			Light: "Bright indirect light",
			Water: "Every 5-7 days",
			Soil: "Rich, well-draining soil",
			Origin: "South America",
			Difficulty: "Moderate",
			PetFriendly: "No",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Carlos R.",
				rating: 5,
				comment: "Las hojas son increíblemente coloridas. Excelente planta.",
				date: "2024-02-01",
			},
		],
	},
	{
		id: "cinta",
		nombre: "Cinta (Spider Plant)",
		slug: "cinta",
		precio: 9.99,
		imagenUrl: "https://picsum.photos/seed/cinta/400/400",
		categoriaId: "1",
		descripcion:
			"La planta Cinta (Chlorophytum comosum) es famosa por sus hojas largas y arqueadas con franjas blancas. Es una de las mejores plantas purificadoras de aire según la NASA.",
		stock: 20,
		isActive: true,
		rating: 4.7,
		reviewCount: 312,
		images: [
			"https://picsum.photos/seed/cinta/400/400",
			"https://picsum.photos/seed/cinta/400/401",
		],
		specifications: {
			Height: "25-45 cm",
			Light: "Moderate to bright indirect light",
			Water: "Every 7-10 days",
			Soil: "Standard potting mix",
			Origin: "South Africa",
			Difficulty: "Very easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Sofía M.",
				rating: 5,
				comment:
					"Perfecta para colgar. Mis gatos pueden estar cerca sin preocupación.",
				date: "2024-01-25",
			},
		],
	},
	{
		id: "ficus-elastica",
		nombre: "Ficus Elástica",
		slug: "ficus-elastica",
		precio: 24.99,
		imagenUrl: "https://picsum.photos/seed/ficus-elastica/400/400",
		categoriaId: "1",
		descripcion:
			"El Ficus Elastica, también conocido como, es un árbol de interior con hojas grandes, brillantes y de un verde profundo. Es perfecto para crear un punto focal en salas de estar u oficinas.",
		stock: 5,
		isActive: true,
		rating: 4.6,
		reviewCount: 156,
		images: [
			"https://picsum.photos/seed/ficus-elastica/400/400",
			"https://picsum.photos/seed/ficus-elastica/400/401",
			"https://picsum.photos/seed/ficus-elastica/400/402",
			"https://picsum.photos/seed/ficus-elastica/400/403",
		],
		specifications: {
			Height: "100-200 cm",
			Light: "Bright indirect light",
			Water: "Every 10-14 days",
			Soil: "Well-draining potting mix",
			Origin: "Southeast Asia",
			Difficulty: "Easy",
			PetFriendly: "No (toxic)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Roberto H.",
				rating: 4,
				comment: "Muy bonita, pero crece lento. Paciencia.",
				date: "2024-01-05",
			},
		],
	},
	{
		id: "lavanda",
		nombre: "Lavanda",
		slug: "lavanda",
		precio: 7.99,
		imagenUrl: "https://picsum.photos/seed/lavanda/400/400",
		categoriaId: "2",
		descripcion:
			"La Lavanda (Lavandula) es una hierba aromática popular por su fragancia relajante y sus hermosas flores púrpuras. Perfecta para jardines, balcones o interiores con buena luz solar.",
		stock: 30,
		isActive: true,
		rating: 4.9,
		reviewCount: 445,
		images: [
			"https://picsum.photos/seed/lavanda/400/400",
			"https://picsum.photos/seed/lavanda/400/401",
			"https://picsum.photos/seed/lavanda/400/402",
		],
		specifications: {
			Height: "30-60 cm",
			Light: "Full sun (6+ hours)",
			Water: "Every 7-14 days",
			Soil: "Sandy, well-draining",
			Origin: "Mediterranean",
			Difficulty: "Easy",
			PetFriendly: "No (can be toxic)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Elena V.",
				rating: 5,
				comment: "Mi jardín huele increíble gracias a la lavanda.",
				date: "2024-02-10",
			},
		],
	},
	{
		id: "romero",
		nombre: "Romero",
		slug: "romero",
		precio: 6.49,
		imagenUrl: "https://picsum.photos/seed/romero/400/400",
		categoriaId: "2",
		descripcion:
			"El Romero (Rosmarinus officinalis) es una hierba culinaria esencial en cualquier cocina. Su aroma intenso y flavor profundo hacen de esta planta un must-have para amantes de la cocina.",
		stock: 25,
		isActive: true,
		isMobile: true,
		rating: 4.7,
		reviewCount: 278,
		images: [
			"https://picsum.photos/seed/romero/400/400",
			"https://picsum.photos/seed/romero/400/401",
		],
		specifications: {
			Height: "50-100 cm",
			Light: "Full sun",
			Water: "Every 7-10 days",
			Soil: "Sandy, well-draining",
			Origin: "Mediterranean",
			Difficulty: "Easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Pedro S.",
				rating: 5,
				comment: "Cocino con romero fresco todos los días. Perfecto.",
				date: "2024-01-28",
			},
		],
	},
	{
		id: "buganvilla",
		nombre: "Buganvilla",
		slug: "buganvilla",
		precio: 15.99,
		imagenUrl: "https://picsum.photos/seed/buganvilla/400/400",
		categoriaId: "2",
		descripcion:
			"La Buganvilla es una enredadera trepadora conocida por sus flores brillantes en tonos de magenta, rosa, naranja y blanco. Ideal para cubrir cercas y muros.",
		stock: 12,
		isActive: true,
		rating: 4.4,
		reviewCount: 98,
		images: [
			"https://picsum.photos/seed/buganvilla/400/400",
			"https://picsum.photos/seed/buganvilla/400/401",
			"https://picsum.photos/seed/buganvilla/400/402",
		],
		specifications: {
			Height: "200-400 cm",
			Light: "Full sun",
			Water: "Every 7-14 days",
			Soil: "Well-draining",
			Origin: "South America",
			Difficulty: "Moderate",
			PetFriendly: "No (thorns)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Carmen T.",
				rating: 5,
				comment: "Mi cerca está llena de color todo el año.",
				date: "2024-02-05",
			},
		],
	},
	{
		id: "suculenta",
		nombre: "Suculenta Variada",
		slug: "suculenta",
		precio: 5.99,
		imagenUrl: "https://picsum.photos/seed/suculenta/400/400",
		categoriaId: "3",
		descripcion:
			"Set de suculentas variadas perfecto para escritorios y espacios pequeños. Estas plantas almacenan agua en sus hojas carnosas, haciéndolas extremely fáciles de mantener.",
		stock: 50,
		isActive: true,
		rating: 4.6,
		reviewCount: 189,
		images: [
			"https://picsum.photos/seed/suculenta/400/400",
			"https://picsum.photos/seed/suculenta/400/401",
		],
		specifications: {
			Height: "5-15 cm",
			Light: "Bright direct light",
			Water: "Every 14-21 days",
			Soil: "Cactus/succulent mix",
			Origin: "Various",
			Difficulty: "Very easy",
			PetFriendly: "Varies",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Laura B.",
				rating: 4,
				comment: "Ideales para mi oficina. Muy decorativas.",
				date: "2024-01-12",
			},
		],
	},
	{
		id: "cactus-escritorio",
		nombre: "Cactus de Escritorio",
		slug: "cactus-escritorio",
		precio: 8.99,
		imagenUrl: "https://picsum.photos/seed/cactus-escritorio/400/400",
		categoriaId: "3",
		descripcion:
			"Cactus pequeño y decorativo, perfecto para espacios de trabajo. Requieren mínimo cuidado y adding a touch of greenery to your desk.",
		stock: 35,
		isActive: true,
		isMobile: true,
		rating: 4.8,
		reviewCount: 203,
		images: [
			"https://picsum.photos/seed/cactus-escritorio/400/400",
			"https://picsum.photos/seed/cactus-escritorio/400/401",
			"https://picsum.photos/seed/cactus-escritorio/400/402",
		],
		specifications: {
			Height: "5-10 cm",
			Light: "Bright direct light",
			Water: "Every 21-30 days",
			Soil: "Cactus mix",
			Origin: "Americas",
			Difficulty: "Very easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Miguel A.",
				rating: 5,
				comment: "Llevo 2 años con mi cactus y sigue vivo. Perfecto.",
				date: "2024-01-20",
			},
		],
	},
	{
		id: "bonsai",
		nombre: "Bonsai Ficus",
		slug: "bonsai",
		precio: 45.0,
		imagenUrl: "https://picsum.photos/seed/bonsai/400/400",
		categoriaId: "4",
		descripcion:
			"Árbol bonsái cultivado en maceta decorativa. El Ficus microcarpa es ideal para principiantes en el arte del bonsái, con su tronco grueso y raíces aéreas impressionantes.",
		stock: 3,
		isActive: true,
		rating: 4.9,
		reviewCount: 67,
		images: [
			"https://picsum.photos/seed/bonsai/400/400",
			"https://picsum.photos/seed/bonsai/400/401",
			"https://picsum.photos/seed/bonsai/400/402",
			"https://picsum.photos/seed/bonsai/400/403",
		],
		specifications: {
			Height: "25-35 cm",
			Light: "Bright indirect light",
			Water: "Every 3-5 days",
			Soil: "Bonsai soil mix",
			Origin: "Southeast Asia",
			Difficulty: "Moderate",
			PetFriendly: "No (toxic sap)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Isabel R.",
				rating: 5,
				comment: "Un regalo hermoso y elegante. Muy bien cuidado.",
				date: "2024-02-15",
			},
		],
	},
	// NEW PLANTS (11 more to reach 21 total)
	{
		id: "helecho",
		nombre: "Helecho Bostón",
		slug: "helecho",
		precio: 11.99,
		imagenUrl: "https://picsum.photos/seed/helecho/400/400",
		categoriaId: "1",
		descripcion:
			"El Helecho de Boston (Nephrolepis exaltata) es una planta colgante con frondas verdes y suaves. Perfecto para agregar un toque tropical a cualquier espacio.",
		stock: 18,
		isActive: true,
		rating: 4.3,
		reviewCount: 142,
		images: [
			"https://picsum.photos/seed/helecho/400/400",
			"https://picsum.photos/seed/helecho/400/401",
		],
		specifications: {
			Height: "40-60 cm",
			Light: "Indirect light",
			Water: "Every 3-5 days",
			Soil: "Rich, moist soil",
			Origin: "Tropical regions",
			Difficulty: "Moderate",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Andrea M.",
				rating: 4,
				comment: "Lindo helecho, llegó saludable.",
				date: "2024-02-20",
			},
		],
	},
	{
		id: "calathea",
		nombre: "Calathea Orbifolia",
		slug: "calathea",
		precio: 19.99,
		imagenUrl: "https://picsum.photos/seed/calathea/400/400",
		categoriaId: "1",
		descripcion:
			"La Calathea es famosa por sus hojas ornamentales con patrones únicos. Ideal para espacios con poca luz y excelente opción para mejorar la humedad ambiental.",
		stock: 7,
		isActive: true,
		rating: 4.4,
		reviewCount: 88,
		images: [
			"https://picsum.photos/seed/calathea/400/400",
			"https://picsum.photos/seed/calathea/400/401",
			"https://picsum.photos/seed/calathea/400/402",
		],
		specifications: {
			Height: "30-70 cm",
			Light: "Low to medium indirect light",
			Water: "Every 5-7 days",
			Soil: "Well-draining potting mix",
			Origin: "South America",
			Difficulty: "Moderate",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Luis D.",
				rating: 4,
				comment: "Preciosas hojas, pero necesita humedad.",
				date: "2024-01-30",
			},
		],
	},
	{
		id: "aloe-vera",
		nombre: "Aloe Vera",
		slug: "aloe-vera",
		precio: 4.99,
		imagenUrl: "https://picsum.photos/seed/aloe-vera/400/400",
		categoriaId: "2",
		descripcion:
			"El Aloe Vera es una planta suculenta conocida por sus propiedades medicinales. Su gel se usa para quemaduras y cuidado de la piel. Muy fácil de mantener.",
		stock: 40,
		isActive: true,
		rating: 4.8,
		reviewCount: 267,
		images: [
			"https://picsum.photos/seed/aloe-vera/400/400",
			"https://picsum.photos/seed/aloe-vera/400/401",
		],
		specifications: {
			Height: "15-30 cm",
			Light: "Bright indirect to direct light",
			Water: "Every 14-21 days",
			Soil: "Sandy, well-draining",
			Origin: "Arabian Peninsula",
			Difficulty: "Very easy",
			PetFriendly: "No (toxic if ingested)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Rosa H.",
				rating: 5,
				comment: "Tengo 3 ya. Perfectas para la cocina.",
				date: "2024-02-12",
			},
		],
	},
	{
		id: "menta",
		nombre: "Menta Fresca",
		slug: "menta",
		precio: 5.49,
		imagenUrl: "https://picsum.photos/seed/menta/400/400",
		categoriaId: "2",
		descripcion:
			"La Menta (Mentha) es una hierba aromática esencial en la cocina. Perfecta para tés, cócteles y comidas. Crece rápidamente y huele increíble.",
		stock: 28,
		isActive: true,
		rating: 4.7,
		reviewCount: 198,
		images: [
			"https://picsum.photos/seed/menta/400/400",
			"https://picsum.photos/seed/menta/400/401",
		],
		specifications: {
			Height: "30-90 cm",
			Light: "Full sun to partial shade",
			Water: "Every 3-5 days",
			Soil: "Rich, moist soil",
			Origin: "Europe and Asia",
			Difficulty: "Easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Daniela F.",
				rating: 5,
				comment: "Mi mojito nunca fue igual.",
				date: "2024-01-18",
			},
		],
	},
	{
		id: "jazmin",
		nombre: "Jazmín",
		slug: "jazmin",
		precio: 12.99,
		imagenUrl: "https://picsum.photos/seed/jazmin/400/400",
		categoriaId: "2",
		descripcion:
			"El Jazmín (Jasminum officinale) es una enredadera trepadora conocida por sus fragantes flores blancas. Perfecta para balcones y jardines.",
		stock: 15,
		isActive: true,
		rating: 4.6,
		reviewCount: 134,
		images: [
			"https://picsum.photos/seed/jazmin/400/400",
			"https://picsum.photos/seed/jazmin/400/401",
			"https://picsum.photos/seed/jazmin/400/402",
		],
		specifications: {
			Height: "300-600 cm",
			Light: "Full sun to partial shade",
			Water: "Every 5-7 days",
			Soil: "Well-draining",
			Origin: "Asia",
			Difficulty: "Moderate",
			PetFriendly: "No (can be toxic)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Paula R.",
				rating: 5,
				comment: "El aroma es celestial.",
				date: "2024-02-08",
			},
		],
	},
	{
		id: "kalanchoe",
		nombre: "Kalanchoe",
		slug: "kalanchoe",
		precio: 6.99,
		imagenUrl: "https://picsum.photos/seed/kalanchoe/400/400",
		categoriaId: "3",
		descripcion:
			"El Kalanchoe es una planta suculenta con flores brillantes que duran semanas. Available en múltiples colores, es perfecta para regalar.",
		stock: 22,
		isActive: true,
		rating: 4.5,
		reviewCount: 156,
		images: [
			"https://picsum.photos/seed/kalanchoe/400/400",
			"https://picsum.photos/seed/kalanchoe/400/401",
		],
		specifications: {
			Height: "15-30 cm",
			Light: "Bright indirect light",
			Water: "Every 14-21 days",
			Soil: "Well-draining cactus mix",
			Origin: "Madagascar",
			Difficulty: "Very easy",
			PetFriendly: "No (toxic)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Marcos T.",
				rating: 4,
				comment: "Flores hermosas y duraderas.",
				date: "2024-01-22",
			},
		],
	},
	{
		id: "echeveria",
		nombre: "Echeveria",
		slug: "echeveria",
		precio: 4.49,
		imagenUrl: "https://picsum.photos/seed/echeveria/400/400",
		categoriaId: "3",
		descripcion:
			"La Echeveria es una suculenta compacta con hojas en forma de rosa. Sus tonos van del verde al rosa pálido. Perfecta para terrarios y minijardines.",
		stock: 45,
		isActive: true,
		rating: 4.7,
		reviewCount: 211,
		images: [
			"https://picsum.photos/seed/echeveria/400/400",
			"https://picsum.photos/seed/echeveria/400/401",
		],
		specifications: {
			Height: "5-15 cm",
			Light: "Bright direct light",
			Water: "Every 14-21 days",
			Soil: "Cactus/succulent mix",
			Origin: "Mexico",
			Difficulty: "Very easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Valentina G.",
				rating: 5,
				comment: "Adorables y résistentes.",
				date: "2024-02-14",
			},
		],
	},
	{
		id: "sanseviera",
		nombre: "Sansevieria",
		slug: "sanseviera",
		precio: 14.99,
		imagenUrl: "https://picsum.photos/seed/sanseviera/400/400",
		categoriaId: "1",
		descripcion:
			"La Sansevieria (Lengua de suegra) es una de las plantas más résistentes que existe. Purifica el aire incluso en espacios con poca luz.",
		stock: 20,
		isActive: true,
		rating: 4.9,
		reviewCount: 324,
		images: [
			"https://picsum.photos/seed/sanseviera/400/400",
			"https://picsum.photos/seed/sanseviera/400/401",
			"https://picsum.photos/seed/sanseviera/400/402",
		],
		specifications: {
			Height: "30-120 cm",
			Light: "Low to bright indirect light",
			Water: "Every 14-28 days",
			Soil: "Well-draining potting mix",
			Origin: "Africa",
			Difficulty: "Very easy",
			PetFriendly: "No (toxic if ingested)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Ricardo P.",
				rating: 5,
				comment: "Sobrevive a todo. La recomiendo.",
				date: "2024-01-05",
			},
		],
	},
	{
		id: "tradescantia",
		nombre: "Tradescantia",
		slug: "tradescantia",
		precio: 7.99,
		imagenUrl: "https://picsum.photos/seed/tradescantia/400/400",
		categoriaId: "1",
		descripcion:
			"La Tradescantia (Amor de hombre) es una planta colgante con hojas rayadas en púrpura y verde. Crece rápidamente y es muy fácil de reproducir.",
		stock: 25,
		isActive: true,
		rating: 4.4,
		reviewCount: 167,
		images: [
			"https://picsum.photos/seed/tradescantia/400/400",
			"https://picsum.photos/seed/tradescantia/400/401",
		],
		specifications: {
			Height: "20-40 cm (hanging)",
			Light: "Bright indirect light",
			Water: "Every 5-7 days",
			Soil: "Well-draining potting mix",
			Origin: "Americas",
			Difficulty: "Easy",
			PetFriendly: "No (can irritate skin)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Camila S.",
				rating: 4,
				comment: "Quedé encantada con el color.",
				date: "2024-02-18",
			},
		],
	},
	{
		id: "pilea",
		nombre: "Pilea Peperomioides",
		slug: "pilea",
		precio: 9.99,
		imagenUrl: "https://picsum.photos/seed/pilea/400/400",
		categoriaId: "1",
		descripcion:
			"La Pilea (Planta del dinero china) tiene hojas circulares únicas que la hacen muy popular en decoración. Fácil de cuidar y propagar.",
		stock: 16,
		isActive: true,
		rating: 4.6,
		reviewCount: 203,
		images: [
			"https://picsum.photos/seed/pilea/400/400",
			"https://picsum.photos/seed/pilea/400/401",
			"https://picsum.photos/seed/pilea/400/402",
		],
		specifications: {
			Height: "30-60 cm",
			Light: "Medium to bright indirect light",
			Water: "Every 7-10 days",
			Soil: "Well-draining potting mix",
			Origin: "China",
			Difficulty: "Easy",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Felipe J.",
				rating: 5,
				comment: "Las hojas redondas son geniales.",
				date: "2024-01-28",
			},
		],
	},
	{
		id: "bambu-suerte",
		nombre: "Bambú de la Suerte",
		slug: "bambu-suerte",
		precio: 8.99,
		imagenUrl: "https://picsum.photos/seed/bambu-suerte/400/400",
		categoriaId: "1",
		descripcion:
			"El Bambú de la Suerte (Dracaena sanderiana) es una planta de interior muy popular por su significado de buena suerte. Crece en agua o tierra.",
		stock: 30,
		isActive: true,
		rating: 4.5,
		reviewCount: 178,
		images: [
			"https://picsum.photos/seed/bambu-suerte/400/400",
			"https://picsum.photos/seed/bambu-suerte/400/401",
		],
		specifications: {
			Height: "30-100 cm",
			Light: "Low to bright indirect light",
			Water: "Every 7-10 days (change water if in water)",
			Soil: "Well-draining or water",
			Origin: "Africa",
			Difficulty: "Very easy",
			PetFriendly: "No (toxic if ingested)",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Natalia L.",
				rating: 4,
				comment: "Quedó hermoso en mi escritorio.",
				date: "2024-02-02",
			},
		],
	},
	{
		id: "gerbera",
		nombre: "Gerbera",
		slug: "gerbera",
		precio: 7.49,
		imagenUrl: "https://picsum.photos/seed/gerbera/400/400",
		categoriaId: "2",
		descripcion:
			"La Gerbera es una flor vibrante disponible en múltiples colores. Perfecta para iluminar cualquier espacio con sus grandes capítulos coloridos.",
		stock: 35,
		isActive: true,
		rating: 4.7,
		reviewCount: 145,
		images: [
			"https://picsum.photos/seed/gerbera/400/400",
			"https://picsum.photos/seed/gerbera/400/401",
		],
		specifications: {
			Height: "20-40 cm",
			Light: "Full sun to partial shade",
			Water: "Every 5-7 days",
			Soil: "Well-draining, rich soil",
			Origin: "South Africa",
			Difficulty: "Moderate",
			PetFriendly: "Yes",
		},
		reviews: [
			{
				id: "rev-1",
				author: "Esteban M.",
				rating: 5,
				comment: "Flores increíbles, muy decorativas.",
				date: "2024-01-15",
			},
		],
	},
];
