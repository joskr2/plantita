"use client";

import { useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, Moon, Package, Sun, User } from "lucide-react";
import {
	AvatarFallback,
	AvatarImage,
	AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRoot,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Usuario } from "@/data/usuarios/usuarios";
import { useTheme } from "@/hooks/useTheme";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";

interface MenuDropdownIslandProps {
	user: Usuario;
	locale: Locale;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function MenuDropdownIsland({
	user,
	locale,
	isOpen,
	onOpenChange,
}: MenuDropdownIslandProps) {
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

	return (
		<div className="flex items-center gap-1">
			<DropdownMenuRoot open={isOpen} onOpenChange={onOpenChange}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						aria-label={t.menu}
						aria-expanded={isOpen}
					>
						<Menu className="size-5" aria-hidden="true" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 z-50">
					{/* User info header */}
					<div className="flex items-center gap-3 px-2 py-1.5">
						<AvatarRoot className="size-9">
							<AvatarImage src={user.avatarUrl} alt={user.nombre} />
							<AvatarFallback>{initials}</AvatarFallback>
						</AvatarRoot>
						<span className="text-sm font-medium">{user.nombre}</span>
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

					{/* Theme toggle inside menu */}
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
					<DropdownMenuItem
						onClick={handleSignOut}
						className="text-destructive"
					>
						<LogOut className="mr-2 size-4" aria-hidden="true" />
						<span>{t.signOut}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuRoot>
		</div>
	);
}
