import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import {
	AvatarFallback,
	AvatarImage,
	AvatarRoot,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { profileActions, profileStore } from "@/store/profileStore";

function ProfileAvatarInner() {
	const avatarUrl = useStore(profileStore, (state) => state.avatarUrl);
	const [previewUrl, setPreviewUrl] = useState(avatarUrl);

	const handleUrlChange = (value: string) => {
		setPreviewUrl(value || avatarUrl);
	};

	const handleUrlBlur = () => {
		if (avatarUrl !== previewUrl) {
			profileActions.updateProfile({ avatarUrl: previewUrl });
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="relative">
				<AvatarRoot className="size-32">
					<AvatarImage src={previewUrl} alt="Avatar" />
					<AvatarFallback>
						<svg
							aria-hidden="true"
							className="size-12 text-muted-foreground"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
								fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
							/>
						</svg>
					</AvatarFallback>
				</AvatarRoot>
			</div>

			<div className="flex w-full max-w-xs flex-col gap-1.5">
				<label
					htmlFor="avatar-url-input"
					className="text-sm font-medium leading-none"
				>
					URL del Avatar
				</label>
				<Input
					id="avatar-url-input"
					placeholder="https://example.com/avatar.jpg"
					value={previewUrl}
					onChange={(e) => handleUrlChange(e.target.value)}
					onBlur={handleUrlBlur}
				/>
			</div>
		</div>
	);
}

// Wrapper to ensure component only renders on client
export function ProfileAvatar() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="flex flex-col items-center gap-4">
				<div className="bg-muted size-32 animate-pulse rounded-full" />
				<div className="bg-muted h-10 w-full max-w-xs animate-pulse rounded" />
			</div>
		);
	}

	return <ProfileAvatarInner />;
}
