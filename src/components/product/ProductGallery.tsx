import type * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
	images: string[];
	productName: string;
};

const DEFAULT_AUTO_SCROLL_INTERVAL = 5; // seconds

function randomDelay(seconds: number): number {
	const min = seconds * 1000;
	const max = (seconds + 8) * 1000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stableKey(url: string, fallback: number): string {
	try {
		const u = new URL(url);
		return u.pathname.slice(-12) || `img-${fallback}`;
	} catch {
		return `img-${fallback}`;
	}
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
	const isMobile = useIsMobile();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const autoScrollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const prefersReducedMotion =
		typeof window !== "undefined"
			? window.matchMedia("(prefers-reduced-motion: reduce)").matches
			: false;

	const totalImages = images.length;

	const scrollToIndex = useCallback((index: number) => {
		const el = scrollRef.current;
		if (!el) return;
		const cardWidthPx = el.offsetWidth;
		el.scrollTo({ left: index * cardWidthPx, behavior: "smooth" });
	}, []);

	const scheduleNextScroll = useCallback(() => {
		if (autoScrollRef.current) {
			clearTimeout(autoScrollRef.current);
		}
		const delay = randomDelay(DEFAULT_AUTO_SCROLL_INTERVAL);
		autoScrollRef.current = setTimeout(() => {
			setActiveIndex((prev) => {
				const next = prev + 1;
				const targetIndex = next >= totalImages ? 0 : next;
				scrollToIndex(targetIndex);
				return targetIndex;
			});
		}, delay);
	}, [totalImages, scrollToIndex]);

	// Sync scroll position with active index
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const handleScroll = () => {
			const scrollLeft = el.scrollLeft;
			const cardWidthPx = el.offsetWidth;
			const index = Math.round(scrollLeft / cardWidthPx);
			setActiveIndex(index);
		};

		el.addEventListener("scroll", handleScroll, { passive: true });
		return () => el.removeEventListener("scroll", handleScroll);
	}, []);

	// Auto-scroll on mobile
	useEffect(() => {
		if (!isMobile || totalImages <= 1 || prefersReducedMotion || isPaused)
			return;

		scheduleNextScroll();

		return () => {
			if (autoScrollRef.current) {
				clearTimeout(autoScrollRef.current);
			}
		};
	}, [
		isMobile,
		totalImages,
		scheduleNextScroll,
		prefersReducedMotion,
		isPaused,
	]);

	// Pause on hover/focus
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

	const handleDotClick = useCallback(
		(index: number) => {
			setActiveIndex(index);
			scrollToIndex(index);
			if (autoScrollRef.current) {
				clearTimeout(autoScrollRef.current);
			}
			const delay = randomDelay(DEFAULT_AUTO_SCROLL_INTERVAL);
			autoScrollRef.current = setTimeout(() => {
				setActiveIndex((prev) => {
					const next = prev + 1;
					const targetIndex = next >= totalImages ? 0 : next;
					scrollToIndex(targetIndex);
					return targetIndex;
				});
			}, delay);
		},
		[scrollToIndex, totalImages],
	);

	// ─── Mobile: scroll-snap carousel with dots ───────────────────────────────
	if (isMobile) {
		return (
			<div className="flex flex-col gap-4">
				<section
					ref={scrollRef}
					className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl bg-muted"
					style={{ scrollbarWidth: "none" } as React.CSSProperties}
					aria-label={`${productName} gallery`}
				>
					{images.map((url, idx) => (
						// biome-ignore lint/a11y/useSemanticElements: role=group + aria-roledescription=slide is correct carousel ARIA
						<div
							key={stableKey(url, idx)}
							className="flex w-full shrink-0 snap-start"
							role="group"
							aria-roledescription="slide"
							aria-label={`${idx + 1} of ${totalImages}`}
						>
							<img
								src={url}
								alt={`${productName} - View ${idx + 1}`}
								className="aspect-square w-full object-cover"
							/>
						</div>
					))}
				</section>

				{/* Dots */}
				{totalImages > 1 && (
					<div
						className="flex justify-center gap-2"
						role="tablist"
						aria-label="Gallery navigation"
						onKeyDown={(e) => {
							if (e.key === "ArrowRight") {
								e.preventDefault();
								handleDotClick((activeIndex + 1) % totalImages);
							}
							if (e.key === "ArrowLeft") {
								e.preventDefault();
								handleDotClick((activeIndex - 1 + totalImages) % totalImages);
							}
						}}
					>
						{images.map((url, idx) => (
							<button
								key={stableKey(url, idx)}
								type="button"
								role="tab"
								tabIndex={idx === activeIndex ? 0 : -1}
								aria-selected={idx === activeIndex}
								aria-label={`Go to photo ${idx + 1}`}
								onClick={() => handleDotClick(idx)}
								className={cn(
									"h-2.5 rounded-full transition-all duration-300",
									idx === activeIndex
										? "w-6 bg-primary"
										: "w-2.5 bg-muted-foreground/30",
								)}
							/>
						))}
					</div>
				)}

				{/* Screen reader count */}
				<p className="sr-only" aria-live="polite" aria-atomic="true">
					{`Photo ${activeIndex + 1} of ${totalImages}`}
				</p>
			</div>
		);
	}

	// ─── Desktop: main image + thumbnails ───────────────────────────────────
	return (
		<div className="flex flex-col gap-4">
			<div className="relative overflow-hidden rounded-2xl bg-muted">
				<img
					src={images[activeIndex]}
					alt={`${productName} - View ${activeIndex + 1}`}
					className="aspect-square w-full object-cover"
				/>
			</div>

			{/* Thumbnails */}
			{totalImages > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{images.map((url, idx) => (
						<button
							key={stableKey(url, idx)}
							type="button"
							onClick={() => setActiveIndex(idx)}
							className={
								activeIndex === idx
									? "relative shrink-0 overflow-hidden rounded-lg border-2 border-primary ring-2 ring-primary/20"
									: "relative shrink-0 overflow-hidden rounded-lg border-2 border-transparent hover:border-muted-foreground/30"
							}
							aria-label={`View photo ${idx + 1}`}
							aria-pressed={activeIndex === idx}
						>
							<img
								src={url}
								alt={`${productName} - Thumbnail ${idx + 1}`}
								className="size-20 object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
