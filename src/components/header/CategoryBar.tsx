import { Link } from "@tanstack/react-router";

import { CATEGORIAS } from "@/data/categorias/categorias";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

interface CategoryBarProps {
	locale: Locale;
}

export function CategoryBar({ locale }: CategoryBarProps) {
	const t = translations[locale];

	return (
		<div className="relative w-full bg-white dark:bg-black rounded-bl-2xl rounded-br-2xl shadow-md border border-white/5 dark:shadow-white/20 dark:border-white/10 md:rounded-bl-none md:rounded-br-none md:shadow-none md:border-0">
			{/* Fade gradient on right edge - mobile hint for scroll */}
			<div
				className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-linear-to-l from-background to-transparent lg:hidden"
				aria-hidden="true"
			/>
			{/* Mobile: centered scroll | Desktop: full row */}
			<nav
				className="flex w-full gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:justify-center lg:overflow-visible snap-x snap-mandatory scroll-px-4 hide-scrollbar justify-center"
				aria-label={t.categoriesLabel}
			>
				<ul className="flex gap-2">
					{CATEGORIAS.map((cat) => (
						<li key={cat.id}>
							<Link
								to="/$categoria"
								params={{ categoria: cat.slug }}
								className="shrink-0 snap-start rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/80 sm:text-sm lg:bg-transparent lg:text-sm lg:font-normal"
								activeProps={{
									className: "bg-primary text-primary-foreground",
								}}
							>
								{t.categories[cat.slug as keyof typeof t.categories] ??
									cat.nombre}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
