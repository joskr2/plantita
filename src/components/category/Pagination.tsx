import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange?: (page: number) => void;
};

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const locale: Locale = "es";
	const t = translations[locale];

	// Generate page numbers with ellipsis
	const getPageNumbers = (): (number | "ellipsis")[] => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | "ellipsis")[] = [];

		if (currentPage <= 3) {
			pages.push(1, 2, 3, "ellipsis", totalPages);
		} else if (currentPage >= totalPages - 2) {
			pages.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
		} else {
			pages.push(
				1,
				"ellipsis",
				currentPage - 1,
				currentPage,
				currentPage + 1,
				"ellipsis",
				totalPages,
			);
		}

		return pages;
	};

	if (totalPages <= 1) {
		return null;
	}

	const pageNumbers = getPageNumbers();

	return (
		<div className="flex flex-col items-center gap-4 py-6">
			{/* Page info label */}
			<p className="text-sm text-muted-foreground">
				{t.pagination.page} {currentPage} {t.pagination.of} {totalPages}
			</p>

			{/* Pagination controls */}
			<div className="flex items-center gap-2">
				{/* Previous button */}
				{currentPage > 1 ? (
					onPageChange ? (
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPageChange(currentPage - 1)}
						>
							{t.pagination.prev}
						</Button>
					) : (
						<Link search={{ page: currentPage - 1 }} preload="intent">
							<Button variant="outline" size="sm">
								{t.pagination.prev}
							</Button>
						</Link>
					)
				) : (
					<Button variant="outline" size="sm" disabled>
						{t.pagination.prev}
					</Button>
				)}

				{/* Page numbers */}
				<div className="flex items-center gap-1">
					{pageNumbers.map((page, _index) =>
						page === "ellipsis" ? (
							<span key="ellipsis" className="px-2 text-muted-foreground">
								...
							</span>
						) : onPageChange ? (
							<Button
								key={page}
								variant={currentPage === page ? "default" : "outline"}
								size="sm"
								onClick={() => onPageChange(page)}
							>
								{page}
							</Button>
						) : (
							<Link key={page} search={{ page }} preload="intent">
								<Button
									variant={currentPage === page ? "default" : "outline"}
									size="sm"
								>
									{page}
								</Button>
							</Link>
						),
					)}
				</div>

				{/* Next button */}
				{currentPage < totalPages ? (
					onPageChange ? (
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPageChange(currentPage + 1)}
						>
							{t.pagination.next}
						</Button>
					) : (
						<Link search={{ page: currentPage + 1 }} preload="intent">
							<Button variant="outline" size="sm">
								{t.pagination.next}
							</Button>
						</Link>
					)
				) : (
					<Button variant="outline" size="sm" disabled>
						{t.pagination.next}
					</Button>
				)}
			</div>
		</div>
	);
}
