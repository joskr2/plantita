import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function getIsMobile(): boolean {
	return typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
}

export function useIsMobile() {
	// Start with undefined so SSR and initial CSR match (both treat as desktop)
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		// Set the actual value after mount
		setIsMobile(getIsMobile());

		let timeoutId: ReturnType<typeof setTimeout>;

		const handleResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setIsMobile(getIsMobile());
			}, 200);
		};

		window.addEventListener("resize", handleResize, { passive: true });
		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(timeoutId);
		};
	}, []);

	return isMobile ?? false;
}
