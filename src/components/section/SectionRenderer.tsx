import { Link } from "@tanstack/react-router";
import { PlantCard, PlantCardSkeleton } from "@/components/plant/PlantCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PLANTAS } from "@/data/plantas/plantas";
import type { Seccion } from "@/data/secciones";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type SectionRendererProps = {
	seccion: Seccion;
	locale: Locale;
	columns?: 1 | 2 | 3 | 4;
	isLoading?: boolean;
};

/** Chunk an array into rows of given size */
function chunkArray<T>(arr: T[], size: number): T[][] {
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}

/**
 * Unified section renderer.
 * - Mobile: always horizontal scroll carousel (1 row)
 * - Desktop:
 *   - carousel: flex row, overflow-x-auto, 4 cards visible, scroll on overflow
 *   - grid-2: 2-row grid
 *   - grid-3: 3-row grid
 *   - grid: 1-row grid
 */
export function SectionRenderer({
	seccion,
	locale,
	columns = 4,
	isLoading = false,
}: SectionRendererProps) {
	const isMobile = useIsMobile();
	const layout = seccion.layout ?? "grid";
	const t = translations[locale];

	// Resolve plantas from productoIds
	const plantas = seccion.productoIds
		.map((id) => PLANTAS.find((p) => p.id === id))
		.filter((p) => p !== undefined) as typeof PLANTAS;

	// Mobile: always carousel (1 row horizontal scroll with 2 visible)
	if (isMobile) {
		return (
			<section
				className="flex flex-col gap-4 py-6 px-4"
				aria-labelledby={`section-${seccion.id}`}
			>
				<h2 id={`section-${seccion.id}`} className="font-heading text-xl px-1">
					{seccion.nombre}
				</h2>
				<div
					className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
					style={{ scrollbarWidth: "none" } as React.CSSProperties}
				>
					{plantas.map((planta) => (
						<div key={planta.id} className="w-full shrink-0 snap-start flex">
							<PlantCard planta={planta} locale={locale} variant="default" />
						</div>
					))}
				</div>
			</section>
		);
	}

	// Desktop carousel: flex row, show 4 cards, scroll on overflow
	if (layout === "carousel") {
		return (
			<section
				className="flex flex-col gap-4 py-6 px-4 md:px-8"
				aria-labelledby={`section-${seccion.id}`}
			>
				<div className="flex items-center justify-between">
					<h2
						id={`section-${seccion.id}`}
						className="font-heading text-xl px-1"
					>
						{isLoading ? <Skeleton className="h-6 w-48" /> : seccion.nombre}
					</h2>
					<Link
						to="/seccion/$slug"
						params={{ slug: seccion.slug }}
						className="text-sm text-primary hover:underline pr-2"
						prefetch="intent"
					>
						{t.sections.viewMore}
					</Link>
				</div>
				{isLoading ? (
					<div className="flex gap-6 overflow-hidden">
						{[0, 1, 2, 3].map((i) => (
							<div
								key={`carousel-skeleton-${i}`}
								className="w-[calc(25%-1.125rem)] shrink-0"
							>
								<PlantCardSkeleton variant="carousel" />
							</div>
						))}
					</div>
				) : (
					<div
						className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
						style={{ scrollbarWidth: "none" } as React.CSSProperties}
					>
						{plantas.map((planta) => (
							<div
								key={planta.id}
								className="w-[calc(25%-1.125rem)] shrink-0 snap-start"
							>
								<PlantCard planta={planta} locale={locale} variant="carousel" />
							</div>
						))}
					</div>
				)}
			</section>
		);
	}

	// Desktop grid sections: multi-row grid with "Ver más" link
	const rows = layout === "grid-3" ? 3 : layout === "grid-2" ? 2 : 1;
	const rowChunks = chunkArray(plantas, columns).slice(0, rows);

	return (
		<section
			className="flex flex-col gap-4 py-6 px-4 md:px-8"
			aria-labelledby={`section-${seccion.id}`}
		>
			<div className="flex items-center justify-between">
				<h2 id={`section-${seccion.id}`} className="font-heading text-xl px-1">
					{isLoading ? <Skeleton className="h-6 w-48" /> : seccion.nombre}
				</h2>
				<Link
					to="/seccion/$slug"
					params={{ slug: seccion.slug }}
					className="text-sm text-primary hover:underline pr-2"
					prefetch="intent"
				>
					{t.sections.viewMore}
				</Link>
			</div>

			<div className="hidden md:flex flex-col gap-6">
				{isLoading
					? Array.from({ length: rows }, () => (
							<div
								key={crypto.randomUUID()}
								className="grid gap-6"
								style={{
									gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
								}}
							>
								{Array.from({ length: columns }, () => (
									<PlantCardSkeleton key={crypto.randomUUID()} />
								))}
							</div>
						))
					: rowChunks.map((rowPlantas, rowIdx) => {
							const rowKey = rowPlantas[0]?.id ?? `${seccion.id}-row-${rowIdx}`;
							return (
								<div
									key={rowKey}
									className="grid gap-6"
									style={{
										gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
										justifyContent:
											rowPlantas.length < columns ? "center" : undefined,
									}}
								>
									{rowPlantas.map((planta) => (
										<PlantCard
											key={planta.id}
											planta={planta}
											locale={locale}
										/>
									))}
								</div>
							);
						})}
			</div>
		</section>
	);
}
