import { createFileRoute } from "@tanstack/react-router";

import { type Banner, BannerCarousel } from "@/components/banner";
import { SectionRenderer } from "@/components/section";
import { SECCIONES } from "@/data/secciones";

export const Route = createFileRoute("/")({
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
	return (
		<div className="flex flex-col gap-6 py-6">
			<BannerCarousel banners={MOCK_BANNERS} />

			{SECCIONES.map((seccion) => (
				<SectionRenderer key={seccion.id} seccion={seccion} locale="es" />
			))}
		</div>
	);
}
