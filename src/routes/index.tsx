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
		src: "/images/demo-banner-1.png",
		alt: "Summer collection - Fresh and vibrant",
		isActive: true,
		isMobile: undefined,
	},
	{
		id: "special-offers",
		src: "/images/demo-banner-2.png",
		alt: "Special offers - Don't miss out",
		isActive: true,
		isMobile: true,
	},
	{
		id: "new-arrivals",
		src: "/images/demo-banner-1.png",
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
