import { Link } from "@tanstack/react-router";
import * as React from "react";

import type { Locale } from "@/i18n/translations";
import { AvatarDropdownIsland } from "./AvatarDropdownIsland";
import { CartSheetIsland } from "./CartSheetIsland";
import { CategoryBar } from "./CategoryBar";
import { MenuDropdownIsland } from "./MenuDropdownIsland";
import { SearchIsland } from "./SearchIsland";

interface HeaderProps {
	locale: Locale;
}

export function Header({ locale }: HeaderProps) {
	const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<>
			{/* Mobile menu backdrop blur - renders above CategoryBar */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
					aria-hidden="true"
					onClick={() => setIsMenuOpen(false)}
				/>
			)}

			<div className="sticky top-0 z-50">
				{/* Main Header */}
				<header className="relative flex h-14 w-full items-center bg-background px-4">
					{/* Logo - hidden when search expanded on mobile */}
					{!isSearchExpanded && (
						<Link
							to="/"
							className="shrink-0 font-heading text-xl font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
						>
							Tiendita
						</Link>
					)}

					{/* Desktop: search always expanded, cart sheet + avatar dropdown */}
					<div className="hidden lg:flex lg:ml-6 lg:flex-1 lg:items-center lg:gap-4">
						<SearchIsland
							locale={locale}
							alwaysExpanded={true}
							className="flex-1"
						/>
						<CartSheetIsland locale={locale} />
						<AvatarDropdownIsland locale={locale} />
					</div>

					{/* Mobile: search collapsed, cart sheet, hamburger */}
					{!isSearchExpanded && (
						<div className="ml-auto flex shrink-0 items-center gap-1 lg:hidden">
							<SearchIsland
								locale={locale}
								isExpanded={isSearchExpanded}
								onExpandChange={setIsSearchExpanded}
							/>
							<CartSheetIsland locale={locale} />
							<MenuDropdownIsland
								locale={locale}
								isOpen={isMenuOpen}
								onOpenChange={setIsMenuOpen}
							/>
						</div>
					)}

					{/* Mobile search expanded: full width overlay */}
					{isSearchExpanded && (
						<div className="absolute inset-x-0 top-0 flex h-14 items-center px-4 lg:hidden">
							<SearchIsland
								locale={locale}
								isExpanded={true}
								onExpandChange={setIsSearchExpanded}
								className="w-full"
							/>
						</div>
					)}
				</header>
			</div>
			{/* Category Bar - sticky on mobile and desktop */}
			<div className="bg-background sticky top-14 z-30">
				<CategoryBar locale={locale} />
			</div>
		</>
	);
}
