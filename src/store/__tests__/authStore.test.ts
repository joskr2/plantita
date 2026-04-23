import { authActions, authStore } from "@/store/authStore";

describe("authStore", () => {
	beforeEach(() => {
		authStore.setState({
			user: null,
			isAuthenticated: false,
		});
	});

	describe("login", () => {
		it("authenticates user with valid credentials (juan)", () => {
			const result = authActions.login("juan@example.com", "password123");
			expect("message" in result).toBe(false);
			if (!("message" in result)) {
				expect(result.nombre).toBe("Juan");
				expect(result.email).toBe("juan@example.com");
			}
			expect(authStore.get().isAuthenticated).toBe(true);
			expect(authStore.get().user?.nombre).toBe("Juan");
		});

		it("authenticates user with valid credentials (maria)", () => {
			const result = authActions.login("maria@example.com", "password123");
			expect("message" in result).toBe(false);
			if (!("message" in result)) {
				expect(result.nombre).toBe("Maria");
				expect(result.email).toBe("maria@example.com");
			}
			expect(authStore.get().isAuthenticated).toBe(true);
			expect(authStore.get().user?.nombre).toBe("Maria");
		});

		it("returns error for non-existent email", () => {
			const result = authActions.login("notexist@example.com", "password123");
			expect("message" in result).toBe(true);
			if ("message" in result) {
				expect(result.message).toBe("Invalid email or password");
			}
			expect(authStore.get().isAuthenticated).toBe(false);
			expect(authStore.get().user).toBeNull();
		});

		it("returns error for wrong password", () => {
			const result = authActions.login("juan@example.com", "wrongpassword");
			expect("message" in result).toBe(true);
			if ("message" in result) {
				expect(result.message).toBe("Invalid email or password");
			}
			expect(authStore.get().isAuthenticated).toBe(false);
			expect(authStore.get().user).toBeNull();
		});
	});

	describe("logout", () => {
		it("clears authentication state", () => {
			authActions.login("juan@example.com", "password123");
			expect(authStore.get().isAuthenticated).toBe(true);

			authActions.logout();

			expect(authStore.get().isAuthenticated).toBe(false);
			expect(authStore.get().user).toBeNull();
		});
	});

	describe("initial state", () => {
		it("starts unauthenticated", () => {
			expect(authStore.get().isAuthenticated).toBe(false);
			expect(authStore.get().user).toBeNull();
		});
	});
});
