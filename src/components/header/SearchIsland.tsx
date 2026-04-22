"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

interface SearchIslandProps {
	locale: Locale;
	isExpanded?: boolean;
	onExpandChange?: (expanded: boolean) => void;
	className?: string;
	alwaysExpanded?: boolean;
}

// Simple debounce hook using setTimeout
function useDebounce(value: string, delay: number): string {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}

export function SearchIsland({
	locale,
	isExpanded: controlledIsExpanded,
	onExpandChange,
	className = "",
	alwaysExpanded = false,
}: SearchIslandProps) {
	const [internalExpanded, setInternalExpanded] = React.useState(false);
	// When alwaysExpanded is true, use true; otherwise use controlled or internal state
	const isExpanded = alwaysExpanded
		? true
		: (controlledIsExpanded ?? internalExpanded);

	const [query, setQuery] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const searchButtonRef = React.useRef<HTMLButtonElement>(null);
	const t = translations[locale];

	const debouncedQuery = useDebounce(query, 300);

	function handleQueryChange(value: string) {
		setQuery(value);
		// debounce is handled by useDebounce hook
	}

	const _searchQuery = useQuery({
		queryKey: ["search", debouncedQuery],
		queryFn: async () => {
			return debouncedQuery;
		},
		enabled: debouncedQuery.length > 0,
		staleTime: Infinity,
	});

	function toggleExpanded() {
		const next = !isExpanded;
		if (controlledIsExpanded === undefined) {
			setInternalExpanded(next);
		}
		onExpandChange?.(next);
	}

	React.useEffect(() => {
		if (isExpanded) {
			inputRef.current?.focus();
		} else {
			searchButtonRef.current?.focus();
		}
	}, [isExpanded]);

	function handleClose() {
		if (controlledIsExpanded === undefined) {
			setInternalExpanded(false);
		}
		setQuery("");
		onExpandChange?.(false);
	}

	const showResults = debouncedQuery.length > 0;
	const resultsId = "search-results";

	return (
		<div
			className={`relative flex items-center ${isExpanded ? "px-4" : ""} ${className}`}
		>
			{alwaysExpanded ? (
				// Desktop mode: always show input with search icon, no X button
				<div className="flex h-9 w-full items-center overflow-hidden rounded-4xl border border-border bg-background focus-within:ring-2 focus-within:ring-ring">
					<div className="flex size-9 shrink-0 items-center justify-center">
						<Search
							className="size-5 text-muted-foreground"
							aria-hidden="true"
						/>
					</div>
					<input
						ref={inputRef}
						type="search"
						role="combobox"
						aria-label={t.search}
						aria-autocomplete="list"
						aria-expanded={showResults}
						aria-controls={resultsId}
						aria-haspopup="listbox"
						placeholder={t.search}
						value={query}
						onChange={(e) => handleQueryChange(e.target.value)}
						className="h-full flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
					/>
				</div>
			) : isExpanded ? (
				// Mobile expanded: input with search icon and X button
				<div className="flex h-9 w-full items-center overflow-hidden rounded-4xl border border-border bg-background transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-ring">
					<div className="flex size-9 shrink-0 items-center justify-center">
						<Search
							className="size-5 text-muted-foreground"
							aria-hidden="true"
						/>
					</div>
					<input
						ref={inputRef}
						type="search"
						role="combobox"
						aria-label={t.search}
						aria-autocomplete="list"
						aria-expanded={showResults}
						aria-controls={resultsId}
						aria-haspopup="listbox"
						placeholder={t.search}
						value={query}
						onChange={(e) => handleQueryChange(e.target.value)}
						className="h-full flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								handleClose();
							}
						}}
					/>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleClose}
						aria-label={t.closeSearch}
						className="mr-1 shrink-0"
					>
						<X className="size-5" aria-hidden="true" />
					</Button>
				</div>
			) : (
				// Mobile collapsed: show search icon button
				<Button
					ref={searchButtonRef}
					variant="ghost"
					size="icon"
					onClick={toggleExpanded}
					aria-label={t.search}
				>
					<Search className="size-5" aria-hidden="true" />
				</Button>
			)}

			{/* Results dropdown */}
			{showResults && (
				<div
					id={resultsId}
					role="listbox"
					aria-label={t.search}
					aria-live="polite"
					aria-busy={_searchQuery.isLoading}
					className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-md"
				>
					{_searchQuery.isLoading || _searchQuery.isPending ? (
						// Skeleton rows while loading
						<div className="flex flex-col gap-1 p-2">
							{[
								"skeleton-result-0",
								"skeleton-result-1",
								"skeleton-result-2",
								"skeleton-result-3",
							].map((key) => (
								<div
									key={key}
									className="flex items-center gap-3 rounded-lg px-3 py-2"
								>
									<Skeleton className="h-8 w-8 shrink-0 rounded-full" />
									<div className="flex flex-col gap-1.5 flex-1">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-3 w-1/2" />
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}
