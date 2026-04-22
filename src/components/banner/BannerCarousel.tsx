import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

export interface Banner {
	id: string;
	src: string;
	alt: string;
	isActive?: boolean;
	isMobile?: boolean;
}

const AUTO_PLAY_INTERVAL = 7000;

export interface BannerCarouselProps {
	banners: Banner[];
	isLoading?: boolean;
}

export function BannerCarousel({
	banners,
	isLoading = false,
}: BannerCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const isMobile = useIsMobile();
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);

	const filteredBanners = banners.filter((banner) => {
		if (banner.isActive !== true) return false;
		// Only filter mobile-only banners when we definitively know we're on desktop
		// During hydration (isMobile === undefined), show all banners to avoid mismatch
		if (banner.isMobile === true && isMobile === false) return false;
		return true;
	});

	const goToSlide = useCallback(
		(index: number) => {
			setCurrentIndex(index % filteredBanners.length);
		},
		[filteredBanners.length],
	);

	const goToNext = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % filteredBanners.length);
	}, [filteredBanners.length]);

	const goToPrev = useCallback(() => {
		setCurrentIndex(
			(prev) => (prev - 1 + filteredBanners.length) % filteredBanners.length,
		);
	}, [filteredBanners.length]);

	useEffect(() => {
		if (isPaused) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		intervalRef.current = setInterval(goToNext, AUTO_PLAY_INTERVAL);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isPaused, goToNext]);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (touchStartX.current === null || touchEndX.current === null) return;

		const diff = touchStartX.current - touchEndX.current;
		const threshold = 50;

		if (Math.abs(diff) > threshold) {
			if (diff > 0) {
				goToNext();
			} else {
				goToPrev();
			}
		}

		touchStartX.current = null;
		touchEndX.current = null;
	};

	const handleIndicatorClick = (index: number) => {
		if (index !== currentIndex) {
			goToSlide(index);
		}
	};

	if (filteredBanners.length === 0 && !isLoading) return null;

	if (isLoading) {
		return (
			<div className="mx-auto px-4 md:px-6 lg:px-8">
				<div className="relative w-full overflow-hidden rounded-xl">
					<Skeleton className="w-full h-[56vw] sm:h-64 md:h-80 lg:h-105 xl:h-120 2xl:h-135" />

					{/* Skeleton navigation dots */}
					<div className="absolute inset-0 flex items-end justify-center pb-4 md:pb-6">
						<div className="flex gap-2">
							<Skeleton className="h-2.5 w-6 rounded-full" />
							<Skeleton className="h-2.5 w-2.5 rounded-full" />
							<Skeleton className="h-2.5 w-2.5 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto px-4 md:px-6 lg:px-8">
			<section
				className="relative w-full overflow-hidden rounded-xl"
				aria-roledescription="carousel"
				aria-label="Featured promotions"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div
					className="flex transition-transform duration-500 ease-out"
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
					}}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					{filteredBanners.map((banner, index) => (
						<div
							key={banner.id}
							className="w-full shrink-0"
							aria-hidden={index !== currentIndex}
						>
							<img
								src={banner.src}
								alt={banner.alt}
								className="w-full h-[56vw] sm:h-64 md:h-80 lg:h-105 xl:h-120 2xl:h-135 object-cover"
								draggable={false}
							/>
						</div>
					))}
				</div>

				<nav
					className="absolute inset-0 flex items-end justify-center pb-4 md:pb-6 pointer-events-none"
					aria-label="Carousel navigation"
				>
					<div className="flex gap-2 pointer-events-auto">
						{filteredBanners.map((banner, index) => (
							<button
								key={banner.id}
								type="button"
								role="tab"
								aria-selected={index === currentIndex}
								aria-label={`Go to slide ${index + 1}: ${banner.alt}`}
								onClick={() => handleIndicatorClick(index)}
								className={cn(
									"rounded-full transition-all duration-300",
									"bg-white/70 hover:bg-white/90",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									index === currentIndex
										? "w-6 h-2.5 bg-white shadow-md"
										: "w-2.5 h-2.5",
								)}
							/>
						))}
					</div>
				</nav>

				<button
					type="button"
					aria-label="Previous slide"
					onClick={goToPrev}
					className={cn(
						"absolute left-2 top-1/2 -translate-y-1/2",
						"w-10 h-10 rounded-full",
						"bg-white/80 hover:bg-white/95",
						"flex items-center justify-center",
						"opacity-0 hover:opacity-100 focus:opacity-100",
						"transition-all duration-200",
						"shadow-lg",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"hidden md:flex",
					)}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-foreground"
						aria-hidden="true"
					>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<button
					type="button"
					aria-label="Next slide"
					onClick={goToNext}
					className={cn(
						"absolute right-2 top-1/2 -translate-y-1/2",
						"w-10 h-10 rounded-full",
						"bg-white/80 hover:bg-white/95",
						"flex items-center justify-center",
						"opacity-0 hover:opacity-100 focus:opacity-100",
						"transition-all duration-200",
						"shadow-lg",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"hidden md:flex",
					)}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-foreground"
						aria-hidden="true"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			</section>
		</div>
	);
}
