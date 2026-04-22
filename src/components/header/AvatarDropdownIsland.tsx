"use client";

import { useNavigate } from "@tanstack/react-router";
import { LogOut, Moon, Package, Sun, User } from "lucide-react";
import * as React from "react";
import {
	AvatarFallback,
	AvatarImage,
	AvatarRoot,
} from "@/components/ui/avatar";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRoot,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import type { Usuario } from "@/data/usuarios/usuarios";
import { useTheme } from "@/hooks/useTheme";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

interface AvatarDropdownIslandProps {
	user: Usuario;
	locale: Locale;
	isLoading?: boolean;
}

export function AvatarDropdownIsland({
	user,
	locale,
	isLoading = false,
}: AvatarDropdownIslandProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const { isDark, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const t = translations[locale];
	const initials = user.nombre.charAt(0).toUpperCase();

	function handleProfile() {
		navigate({ to: "/profile" });
	}

	function handleOrders() {
		navigate({ to: "/orders" });
	}

	function handleSignOut() {
		// sign out logic
	}

	if (isLoading) {
		return (
			<AvatarRoot className="cursor-pointer">
				<Skeleton className="h-8 w-8 rounded-full" />
			</AvatarRoot>
		);
	}

	return (
		<DropdownMenuRoot open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					aria-label={`${user.nombre} — ${t.menu}`}
					aria-expanded={isOpen}
					aria-haspopup="menu"
					className="cursor-pointer rounded-full hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<AvatarRoot>
						<AvatarImage src={user.avatarUrl} alt="" />
						<AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
					</AvatarRoot>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				{/* User info header */}
				<div className="flex items-center gap-3 px-2 py-1.5">
					<AvatarRoot className="size-9">
						<AvatarImage src={user.avatarUrl} alt={user.nombre} />
						<AvatarFallback>{initials}</AvatarFallback>
					</AvatarRoot>
					<div className="flex flex-col">
						<span className="text-sm font-medium">{user.nombre}</span>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleProfile}>
						<User className="mr-2 size-4" aria-hidden="true" />
						<span>{t.profile.title}</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleOrders}>
						<Package className="mr-2 size-4" aria-hidden="true" />
						<span>{t.orders.title}</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				{/* Theme toggle */}
				<DropdownMenuItem onClick={toggleTheme}>
					{isDark ? (
						<Sun className="mr-2 size-4" aria-hidden="true" />
					) : (
						<Moon className="mr-2 size-4" aria-hidden="true" />
					)}
					<span>{isDark ? t.lightMode : t.darkMode}</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				{/* Sign out */}
				<DropdownMenuItem onClick={handleSignOut} className="text-destructive">
					<LogOut className="mr-2 size-4" aria-hidden="true" />
					<span>{t.signOut}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	);
}
