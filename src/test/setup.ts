import "@testing-library/jest-dom";

// Mock localStorage for tests
const localStorageMock = {
	getItem: vi.fn(() => null),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};
Object.defineProperty(globalThis, "localStorage", {
	value: localStorageMock,
	writable: true,
});

// Mock window.matchMedia for tests
Object.defineProperty(globalThis, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Clean up after each test
afterEach(() => {
	// Clear document body
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
	// Reset any global state
	document.documentElement.classList.remove("dark");
	// Reset localStorage mocks
	vi.clearAllMocks();
});
