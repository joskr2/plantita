import * as React from "react";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

type ProductTabsProps = {
	locale: Locale;
	description?: string;
	specifications?: Record<string, string>;
	reviews?: Array<{
		author: string;
		rating: number;
		comment: string;
		date: string;
	}>;
};

export function ProductTabs({
	locale,
	description,
	specifications,
	reviews = [],
}: ProductTabsProps) {
	const t = translations[locale];
	const [activeTab, setActiveTab] = React.useState<
		"description" | "specs" | "reviews"
	>("description");

	const tabs = [
		{ id: "description" as const, label: t.product.description },
		{ id: "specs" as const, label: t.product.specifications },
		{
			id: "reviews" as const,
			label: `${t.product.reviews} (${reviews.length})`,
		},
	];

	return (
		<div className="w-full">
			{/* Tab buttons */}
			<div
				className="flex border-b border-border"
				role="tablist"
				aria-label="Product information"
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={activeTab === tab.id}
						aria-controls={`tabpanel-${tab.id}`}
						id={`tab-${tab.id}`}
						onClick={() => setActiveTab(tab.id)}
						className={`px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
							activeTab === tab.id
								? "border-b-2 border-primary text-primary"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab content */}
			<div className="py-6">
				{activeTab === "description" && (
					<div
						role="tabpanel"
						id="tabpanel-description"
						aria-labelledby="tab-description"
					>
						<h2 className="mb-4 font-heading text-xl font-semibold">
							{t.product.aboutThisProduct}
						</h2>
						<p className="leading-relaxed text-muted-foreground">
							{description || "No description available for this product."}
						</p>
					</div>
				)}

				{activeTab === "specs" && (
					<div role="tabpanel" id="tabpanel-specs" aria-labelledby="tab-specs">
						<h2 className="mb-4 font-heading text-xl font-semibold">
							{t.product.specifications}
						</h2>
						{specifications && Object.keys(specifications).length > 0 ? (
							<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{Object.entries(specifications).map(([key, value]) => (
									<div key={key} className="flex flex-col gap-1">
										<dt className="text-sm font-medium text-foreground">
											{key}
										</dt>
										<dd className="text-sm text-muted-foreground">{value}</dd>
									</div>
								))}
							</dl>
						) : (
							<p className="text-muted-foreground">
								No specifications available.
							</p>
						)}
					</div>
				)}

				{activeTab === "reviews" && (
					<div
						role="tabpanel"
						id="tabpanel-reviews"
						aria-labelledby="tab-reviews"
					>
						<h2 className="mb-4 font-heading text-xl font-semibold">
							{t.product.customerReviews}
						</h2>
						{reviews.length > 0 ? (
							<div className="flex flex-col gap-6">
								{reviews.map((review, idx) => {
									const key = `review-${review.author.slice(-10)}-${idx}`;
									return (
										<div
											key={key}
											className="flex flex-col gap-2 border-b border-border pb-4 last:border-0"
										>
											<div className="flex items-center gap-2">
												<span className="font-medium text-foreground">
													{review.author}
												</span>
												<span className="text-sm text-muted-foreground">
													{review.date}
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												{review.comment}
											</p>
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-muted-foreground">{t.product.noReviews}</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
