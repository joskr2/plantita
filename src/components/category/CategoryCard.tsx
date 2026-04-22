import type { Seccion } from "@/data/secciones";

type CategoryCardProps = {
	seccion: Seccion;
};

export function CategoryCard({ seccion }: CategoryCardProps) {
	return (
		<figure className="group relative overflow-hidden rounded-lg">
			{/* Banner Image */}
			<div className="aspect-[4/3] overflow-hidden">
				<img
					src={
						seccion.bannerImage ??
						`https://picsum.photos/seed/${seccion.slug}/400/300`
					}
					alt={seccion.nombre}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			{/* Content Overlay */}
			<figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
				<h3 className="font-heading text-lg font-bold text-white">
					{seccion.nombre}
				</h3>
				<p className="mt-1 text-sm text-white/80">
					{seccion.productoIds.length} productos
				</p>
			</figcaption>
		</figure>
	);
}
