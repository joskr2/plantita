import { useCallback, useEffect, useRef, useState } from "react";
import { PlantCard, PlantCardSkeleton } from "@/components/plant/PlantCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { SeccionMock } from "@/data/plantas/plantas";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

type SectionCarouselProps = {
	seccion: SeccionMock;
	locale: Locale;
	/** Columns visible on desktop. On mobile always 1. Default: 2 */
	columnsVisible?: 1 | 2;
	isLoading?: boolean;
};

const DEFAULT_AUTO_SCROLL_INTERVAL = 7; // seconds

/** Returns a random delay between `seconds` and `seconds + 8` (in ms) */
function randomDelay(seconds: number): number {
	const min = seconds * 1000;
	const max = (seconds + 8) * 1000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function SectionCarousel({
	seccion,
	locale,
	columnsVisible = 2,
	isLoading = false,
}: SectionCarouselProps) {
	const isMobile = useIsMobile();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const autoScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const intervalRef = useRef<number>(DEFAULT_AUTO_SCROLL_INTERVAL);

	// Respect user's motion preference
	const prefersReducedMotion =
		typeof window !== "undefined"
			? window.matchMedia("(prefers-reduced-motion: reduce)").matches
			: false;

	const filteredPlantas = seccion.plantas.filter((planta) => {
		if (planta.isActive !== true) return false;
		// Only filter mobile-only items when we definitively know we're on desktop
		if (planta.isMobile === true && isMobile === false) return false;
		return true;
	});

	// Mobile always shows 1 card at a time
	const effectiveColumns = isMobile ? 1 : columnsVisible;
	const totalCards = filteredPlantas.length;
	const totalDots = Math.ceil(totalCards / effectiveColumns);

	const scrollToIndex = useCallback(
		(index: number) => {
			const el = scrollRef.current;
			if (!el) return;
			const cardWidthPx = el.offsetWidth / effectiveColumns;
			el.scrollTo({ left: index * cardWidthPx, behavior: "smooth" });
		},
		[effectiveColumns],
	);

	const scheduleNextScroll = useCallback(() => {
		if (autoScrollRef.current) {
			clearTimeout(autoScrollRef.current);
		}
		const interval = seccion.autoScrollInterval ?? DEFAULT_AUTO_SCROLL_INTERVAL;
		intervalRef.current = interval;
		const delay = randomDelay(interval);
		autoScrollRef.current = setTimeout(() => {
			setActiveIndex((prev) => {
				const next = prev + 1;
				const targetIndex = next >= totalCards ? 0 : next;
				scrollToIndex(targetIndex);
				return targetIndex;
			});
		}, delay);
	}, [seccion.autoScrollInterval, totalCards, scrollToIndex]);

	// Sync scroll position with active index
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const handleScroll = () => {
			const scrollLeft = el.scrollLeft;
			const cardWidthPx = el.offsetWidth / effectiveColumns;
			const index = Math.round(scrollLeft / cardWidthPx);
			setActiveIndex(index);
		};

		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, [effectiveColumns]);

	// Auto-scroll on mobile (respects reduced motion + pause state)
	useEffect(() => {
		if (!isMobile || totalCards <= 1 || prefersReducedMotion || isPaused)
			return;

		scheduleNextScroll();

		return () => {
			if (autoScrollRef.current) {
				clearTimeout(autoScrollRef.current);
			}
		};
	}, [
		isMobile,
		totalCards,
		scheduleNextScroll,
		prefersReducedMotion,
		isPaused,
	]);

	// Pause auto-scroll when user hovers or focuses the carousel
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		function handlePause() {
			setIsPaused(true);
		}
		function handleResume() {
			setIsPaused(false);
		}

		el.addEventListener("mouseenter", handlePause);
		el.addEventListener("mouseleave", handleResume);
		el.addEventListener("focusin", handlePause);
		el.addEventListener("focusout", handleResume);

		return () => {
			el.removeEventListener("mouseenter", handlePause);
			el.removeEventListener("mouseleave", handleResume);
			el.removeEventListener("focusin", handlePause);
			el.removeEventListener("focusout", handleResume);
		};
	}, []);

	// Reschedule after manual dot click
	const handleDotClick = useCallback(
		(dotIndex: number) => {
			const targetCardIndex = dotIndex * effectiveColumns;
			setActiveIndex(targetCardIndex);
			scrollToIndex(targetCardIndex);
			// Reset auto-scroll timer
			if (isMobile && totalCards > 1) {
				if (autoScrollRef.current) {
					clearTimeout(autoScrollRef.current);
				}
				const interval =
					seccion.autoScrollInterval ?? DEFAULT_AUTO_SCROLL_INTERVAL;
				const delay = randomDelay(interval);
				autoScrollRef.current = setTimeout(() => {
					setActiveIndex((prev) => {
						const next = prev + effectiveColumns;
						const targetIndex = next >= totalCards ? 0 : next;
						scrollToIndex(targetIndex);
						return targetIndex;
					});
				}, delay);
			}
		},
		[
			isMobile,
			effectiveColumns,
			scrollToIndex,
			seccion.autoScrollInterval,
			totalCards,
		],
	);

	const cardWidth =
		effectiveColumns === 2 ? "calc(50% - 0.75rem)" : "calc(100% - 1rem)";

	return (
		<section
			className="flex flex-col gap-6 py-6 px-4 md:px-8"
			aria-labelledby={`section-${seccion.id}`}
		>
			<h2 id={`section-${seccion.id}`} className="font-heading text-xl">
				{isLoading ? <Skeleton className="h-6 w-48" /> : seccion.nombre}
			</h2>

			<div
				ref={scrollRef}
				className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2"
				style={{ scrollbarWidth: "none" } as React.CSSProperties}
			>
				{isLoading
					? effectiveColumns === 1
						? [
								<div
									key="carousel-item-0"
									className="shrink-0 snap-start"
									style={{ width: cardWidth } as React.CSSProperties}
								>
									<PlantCardSkeleton variant="carousel" />
								</div>,
							]
						: [
								<div
									key="carousel-item-0"
									className="shrink-0 snap-start"
									style={{ width: cardWidth } as React.CSSProperties}
								>
									<PlantCardSkeleton variant="carousel" />
								</div>,
								<div
									key="carousel-item-1"
									className="shrink-0 snap-start"
									style={{ width: cardWidth } as React.CSSProperties}
								>
									<PlantCardSkeleton variant="carousel" />
								</div>,
							]
					: filteredPlantas.map((planta) => (
							<div
								key={planta.id}
								className="shrink-0 snap-start"
								style={{ width: cardWidth } as React.CSSProperties}
							>
								<PlantCard planta={planta} locale={locale} variant="carousel" />
							</div>
						))}
			</div>

			{isLoading ? (
				<div className="flex justify-center gap-2">
					<Skeleton key="carousel-dot-0" className="h-2.5 w-2.5 rounded-full" />
					<Skeleton key="carousel-dot-1" className="h-2.5 w-2.5 rounded-full" />
					<Skeleton key="carousel-dot-2" className="h-2.5 w-2.5 rounded-full" />
				</div>
			) : totalDots > 1 ? (
				<div
					className="flex justify-center gap-2"
					role="tablist"
					aria-label={seccion.nombre}
					onKeyDown={(e) => {
						const currentDot = Math.floor(activeIndex / effectiveColumns);
						if (e.key === "ArrowRight") {
							e.preventDefault();
							handleDotClick((currentDot + 1) % totalDots);
						}
						if (e.key === "ArrowLeft") {
							e.preventDefault();
							handleDotClick((currentDot - 1 + totalDots) % totalDots);
						}
					}}
				>
					{filteredPlantas
						.filter((_, i) => i % effectiveColumns === 0)
						.map((planta, filteredIndex) => {
							const isActive =
								Math.floor(activeIndex / effectiveColumns) === filteredIndex;
							return (
								<button
									key={`dot-${planta.id}`}
									type="button"
									role="tab"
									tabIndex={isActive ? 0 : -1}
									aria-selected={isActive}
									aria-label={`Go to slide ${filteredIndex + 1}`}
									onClick={() => handleDotClick(filteredIndex)}
									className={cn(
										"h-2.5 rounded-full transition-all duration-300",
										isActive
											? "w-6 bg-primary"
											: "w-2.5 bg-muted-foreground/30",
									)}
								/>
							);
						})}
				</div>
			) : null}

			{/* Visually hidden live region for screen readers */}
			<p className="sr-only" aria-live="polite" aria-atomic="true">
				{`Slide ${Math.floor(activeIndex / effectiveColumns) + 1} of ${totalDots}`}
			</p>
		</section>
	);
}
