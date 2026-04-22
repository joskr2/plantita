import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetRoot,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { Filters } from "@/data/categorias/index";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type FilterBarProps = {
	filters: Filters;
	onFiltersChange: (filters: Filters) => void;
	onClearAll: () => void;
	locale: Locale;
};

export function FilterBar({
	filters,
	onFiltersChange,
	onClearAll,
	locale,
}: FilterBarProps) {
	const t = translations[locale];
	const isMobile = useIsMobile();
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Mobile: Sheet drawer */}
			{isMobile && (
				<div className="px-4">
					<SheetRoot open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="outline" className="w-full">
								{t.filter.trigger}
							</Button>
						</SheetTrigger>
						<SheetContent side="bottom" className="max-h-[80vh]">
							<SheetHeader>
								<SheetTitle>{t.filter.title}</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-6 py-6">
								{/* Price Min */}
								<div className="flex flex-col gap-2">
									<label
										htmlFor="price-min-mobile"
										className="text-sm font-medium"
									>
										{t.filter.priceMin}
									</label>
									<input
										id="price-min-mobile"
										type="number"
										value={filters.priceMin ?? ""}
										onChange={(e) =>
											onFiltersChange({
												...filters,
												priceMin: e.target.value
													? Number(e.target.value)
													: undefined,
											})
										}
										placeholder="0"
										className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									/>
								</div>

								{/* Price Max */}
								<div className="flex flex-col gap-2">
									<label
										htmlFor="price-max-mobile"
										className="text-sm font-medium"
									>
										{t.filter.priceMax}
									</label>
									<input
										id="price-max-mobile"
										type="number"
										value={filters.priceMax ?? ""}
										onChange={(e) =>
											onFiltersChange({
												...filters,
												priceMax: e.target.value
													? Number(e.target.value)
													: undefined,
											})
										}
										placeholder="999"
										className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									/>
								</div>

								{/* In Stock Toggle */}
								<div className="flex items-center justify-between">
									<label
										htmlFor="in-stock-mobile"
										className="text-sm font-medium"
									>
										{t.filter.inStock}
									</label>
									<button
										id="in-stock-mobile"
										type="button"
										role="switch"
										aria-checked={filters.inStock ?? false}
										onClick={() =>
											onFiltersChange({
												...filters,
												inStock: filters.inStock ? undefined : true,
											})
										}
										className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
											filters.inStock ? "bg-primary" : "bg-input"
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
												filters.inStock ? "translate-x-6" : "translate-x-1"
											}`}
										/>
									</button>
								</div>

								{/* Min Rating */}
								<div className="flex flex-col gap-2">
									<label
										htmlFor="min-rating-mobile"
										className="text-sm font-medium"
									>
										{t.filter.minRating}
									</label>
									<select
										id="min-rating-mobile"
										value={filters.minRating ?? ""}
										onChange={(e) =>
											onFiltersChange({
												...filters,
												minRating: e.target.value
													? Number(e.target.value)
													: undefined,
											})
										}
										className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									>
										<option value="">{t.filter.allRatings}</option>
										<option value="1">1 ★</option>
										<option value="2">2 ★</option>
										<option value="3">3 ★</option>
										<option value="4">4 ★</option>
										<option value="5">5 ★</option>
									</select>
								</div>
							</div>

							<SheetFooter className="flex-row gap-2">
								<Button
									variant="outline"
									onClick={() => {
										onClearAll();
										setOpen(false);
									}}
									className="flex-1"
								>
									{t.filter.clearAll}
								</Button>
								<Button onClick={() => setOpen(false)} className="flex-1">
									{t.filter.showResults}
								</Button>
							</SheetFooter>
						</SheetContent>
					</SheetRoot>
				</div>
			)}

			{/* Desktop: Horizontal bar */}
			{!isMobile && (
				<div className="flex flex-wrap items-center gap-4 px-4 md:px-8">
					{/* Price Min */}
					<div className="flex items-center gap-2">
						<label
							htmlFor="price-min-desktop"
							className="text-sm font-medium whitespace-nowrap"
						>
							{t.filter.priceMin}:
						</label>
						<input
							id="price-min-desktop"
							type="number"
							value={filters.priceMin ?? ""}
							onChange={(e) =>
								onFiltersChange({
									...filters,
									priceMin: e.target.value ? Number(e.target.value) : undefined,
								})
							}
							placeholder="0"
							className="h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						/>
					</div>

					{/* Price Max */}
					<div className="flex items-center gap-2">
						<label
							htmlFor="price-max-desktop"
							className="text-sm font-medium whitespace-nowrap"
						>
							{t.filter.priceMax}:
						</label>
						<input
							id="price-max-desktop"
							type="number"
							value={filters.priceMax ?? ""}
							onChange={(e) =>
								onFiltersChange({
									...filters,
									priceMax: e.target.value ? Number(e.target.value) : undefined,
								})
							}
							placeholder="999"
							className="h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						/>
					</div>

					{/* In Stock Toggle */}
					<div className="flex items-center gap-2">
						<label
							htmlFor="in-stock-desktop"
							className="text-sm font-medium whitespace-nowrap"
						>
							{t.filter.inStock}
						</label>
						<button
							id="in-stock-desktop"
							type="button"
							role="switch"
							aria-checked={filters.inStock ?? false}
							onClick={() =>
								onFiltersChange({
									...filters,
									inStock: filters.inStock ? undefined : true,
								})
							}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
								filters.inStock ? "bg-primary" : "bg-input"
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
									filters.inStock ? "translate-x-6" : "translate-x-1"
								}`}
							/>
						</button>
					</div>

					{/* Min Rating */}
					<div className="flex items-center gap-2">
						<label
							htmlFor="min-rating-desktop"
							className="text-sm font-medium whitespace-nowrap"
						>
							{t.filter.minRating}:
						</label>
						<select
							id="min-rating-desktop"
							value={filters.minRating ?? ""}
							onChange={(e) =>
								onFiltersChange({
									...filters,
									minRating: e.target.value
										? Number(e.target.value)
										: undefined,
								})
							}
							className="h-9 w-28 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							<option value="">{t.filter.allRatings}</option>
							<option value="1">1 ★</option>
							<option value="2">2 ★</option>
							<option value="3">3 ★</option>
							<option value="4">4 ★</option>
							<option value="5">5 ★</option>
						</select>
					</div>

					{/* Clear button */}
					<Button
						variant="ghost"
						size="sm"
						onClick={onClearAll}
						className="text-muted-foreground"
					>
						{t.filter.clearAll}
					</Button>
				</div>
			)}
		</>
	);
}
