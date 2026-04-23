import { createStore } from "@tanstack/react-store";
import { MOCK_USERS, type MockUser } from "@/data/usuarios/usuarios";

export type AuthUser = Pick<MockUser, "id" | "nombre" | "email" | "avatarUrl">;

export type AuthState = {
	user: AuthUser | null;
	isAuthenticated: boolean;
};

const STORAGE_KEY = "tiendita-auth-session";
const USERS_STORAGE_KEY = "tiendita-users";

const DEFAULT_STATE: AuthState = {
	user: null,
	isAuthenticated: false,
};

function loadFromStorage(): AuthState {
	if (typeof window === "undefined") return DEFAULT_STATE;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored) as AuthState;
		}
		return DEFAULT_STATE;
	} catch {
		return DEFAULT_STATE;
	}
}

function saveToStorage(state: AuthState) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// ignore
	}
}

function loadUsers(): MockUser[] {
	if (typeof window === "undefined") return MOCK_USERS;
	try {
		const stored = localStorage.getItem(USERS_STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored) as MockUser[];
		}
		return MOCK_USERS;
	} catch {
		return MOCK_USERS;
	}
}

function saveUsers(users: MockUser[]) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
	} catch {
		// ignore
	}
}

const initialState: AuthState = loadFromStorage();

export const authStore = createStore(initialState);

export type LoginError = {
	message: string;
};

export type RegisterError = {
	message: string;
};

export function login(email: string, password: string): AuthUser | LoginError {
	const users = loadUsers();
	const user = users.find((u) => u.email === email && u.password === password);
	if (!user) {
		return { message: "Invalid email or password" };
	}
	const { password: _, ...authUser } = user;
	const newState: AuthState = { user: authUser, isAuthenticated: true };
	authStore.setState(() => newState);
	return authUser;
}

export function register(
	email: string,
	password: string,
	nombre: string,
	apellido: string,
	_telefono: string,
): AuthUser | RegisterError {
	const users = loadUsers();

	if (users.some((u) => u.email === email)) {
		return { message: "This email is already registered" };
	}

	const newUser: MockUser = {
		id: crypto.randomUUID(),
		nombre: `${nombre} ${apellido}`,
		email,
		password,
		avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
	};

	users.push(newUser);
	saveUsers(users);

	const { password: _, ...authUser } = newUser;
	const newState: AuthState = { user: authUser, isAuthenticated: true };
	authStore.setState(() => newState);
	return authUser;
}

export function logout() {
	authStore.setState(() => DEFAULT_STATE);
}

export const authActions = { login, logout, register };

if (typeof window !== "undefined") {
	authStore.subscribe((state) => {
		saveToStorage(state);
	});
}
