import { createFileRoute } from "@tanstack/react-router";

import type { Banner } from "@/components/banner";
import { BannerCarousel } from "@/components/banner/BannerCarousel";
import { SectionRenderer } from "@/components/section/SectionRenderer";
import { getSeccionPlantas, SECCIONES } from "@/data/secciones";

export const Route = createFileRoute("/")({
	loader: async () => {
		// SSR: resolve secciones data on the server
		const seccionesData = SECCIONES.map((seccion) => ({
			...seccion,
			plantas: getSeccionPlantas(seccion),
		}));

		return {
			secciones: seccionesData,
			banners: MOCK_BANNERS,
		};
	},
	head: () => ({
		meta: [
			{ title: "Plantas de Interior y Exterior | Tiendita" },
			{
				name: "description",
				content:
					"Encuentra las mejores plantas para tu hogar u oficina. Envío gratis en pedidosSelected.",
			},
		],
	}),
	component: App,
});

const MOCK_BANNERS: Banner[] = [
	{
		id: "summer-collection",
		src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1400&h=500&fit=crop&q=80",
		alt: "Summer collection - Fresh and vibrant",
		isActive: true,
		isMobile: undefined,
	},
	{
		id: "special-offers",
		src: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1400&h=500&fit=crop&q=80",
		alt: "Special offers - Don't miss out",
		isActive: true,
		isMobile: true,
	},
	{
		id: "new-arrivals",
		src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&h=500&fit=crop&q=80",
		alt: "New arrivals - Check them out",
		isActive: true,
		isMobile: undefined,
	},
];

function App() {
	const { secciones, banners } = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6 py-6">
			<BannerCarousel banners={banners} />

			{secciones.map((seccion) => (
				<SectionRenderer key={seccion.id} seccion={seccion} locale="es" />
			))}
		</div>
	);
}
