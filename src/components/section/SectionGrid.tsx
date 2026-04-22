import { PlantCard, PlantCardSkeleton } from "@/components/plant/PlantCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { SeccionMock } from "@/data/plantas/plantas";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Locale } from "@/i18n/translations";

type SectionGridProps = {
	seccion: SeccionMock;
	locale: Locale;
	columns?: 1 | 2 | 3 | 4;
	rows?: 1 | 2 | 3;
	mostrarBuyButton?: boolean;
	isLoading?: boolean;
};

export function SectionGrid({
	seccion,
	locale,
	columns = 4,
	rows = 1,
	mostrarBuyButton = true,
	isLoading = false,
}: SectionGridProps) {
	const isMobile = useIsMobile();

	const filteredPlantas = seccion.plantas.filter((planta) => {
		if (planta.isActive !== true) return false;
		if (planta.isMobile === true && isMobile === false) return false;
		return true;
	});

	// Chunk plantas into rows
	const totalPerRow = columns;
	const chunkedPlantas: (typeof filteredPlantas)[] = [];
	for (let i = 0; i < filteredPlantas.length; i += totalPerRow) {
		chunkedPlantas.push(filteredPlantas.slice(i, i + totalPerRow));
	}
	// Only show up to `rows` rows
	const visibleRows = chunkedPlantas.slice(0, rows);

	const renderSkeletons = (count: number) =>
		Array.from({ length: count }, () => (
			<PlantCardSkeleton key={crypto.randomUUID()} />
		));

	return (
		<section
			className="flex flex-col gap-6 py-6 px-4 md:px-8"
			aria-labelledby={`section-${seccion.id}`}
		>
			<h2 id={`section-${seccion.id}`} className="font-heading text-xl px-1">
				{isLoading ? <Skeleton className="h-6 w-48" /> : seccion.nombre}
			</h2>

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
								{renderSkeletons(columns)}
							</div>
						))
					: visibleRows.map((rowPlantas, rowIdx) => {
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
											mostrarBuyButton={mostrarBuyButton}
										/>
									))}
								</div>
							);
						})}
			</div>
		</section>
	);
}
