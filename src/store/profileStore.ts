import { createStore } from "@tanstack/react-store";

export type UserProfile = {
	id: string;
	nombre: string;
	email: string;
	telefono: string;
	avatarUrl: string;
	direccionCasa: string;
	direccionSecundaria: string;
	dni: string;
};

const STORAGE_KEY = "tiendita-profile";

const DEFAULT_PROFILE: UserProfile = {
	id: "",
	nombre: "",
	email: "",
	telefono: "",
	avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
	direccionCasa: "",
	direccionSecundaria: "",
	dni: "",
};

// SSR guard for localStorage
function loadFromStorage(): UserProfile {
	if (typeof window === "undefined") return DEFAULT_PROFILE;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as UserProfile;
			// Ensure avatarUrl has a default if empty
			if (!parsed.avatarUrl) {
				parsed.avatarUrl = DEFAULT_PROFILE.avatarUrl;
			}
			return parsed;
		}
		return DEFAULT_PROFILE;
	} catch {
		return DEFAULT_PROFILE;
	}
}

function saveToStorage(profile: UserProfile) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
	} catch {
		// ignore
	}
}

const initialState: UserProfile = loadFromStorage();

export const profileStore = createStore(initialState);

// Profile actions
function updateProfile(data: Partial<UserProfile>) {
	const current = profileStore.get();
	const newProfile = { ...current, ...data };
	profileStore.setState(() => newProfile);
}

function resetProfile() {
	profileStore.setState(() => DEFAULT_PROFILE);
}

// Export actions for use in event handlers
export const profileActions = { updateProfile, resetProfile };

// Persistence - single subscription
if (typeof window !== "undefined") {
	profileStore.subscribe((state) => {
		saveToStorage(state);
	});
}
