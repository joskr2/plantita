import { screen } from "@testing-library/react";
import type { SeccionMock } from "@/data/plantas/plantas";
import { render } from "@/test/providers";
import { SectionCarousel } from "../SectionCarousel";

const mockSeccion: SeccionMock = {
	id: "seccion-interior",
	nombre: "Plantas de Interior",
	slug: "interior",
	categoriaId: "1",
	plantas: [
		{
			id: "potus",
			nombre: "Potus",
			slug: "potus",
			precio: 12.99,
			imagenUrl: "https://picsum.photos/seed/potus/400/400",
			categoriaId: "1",
			isActive: true,
		},
		{
			id: "sanchezia",
			nombre: "Sanchezia",
			slug: "sanchezia",
			precio: 18.5,
			imagenUrl: "https://picsum.photos/seed/sanchezia/400/400",
			categoriaId: "1",
			isActive: true,
		},
		{
			id: "cinta",
			nombre: "Cinta",
			slug: "cinta",
			precio: 9.99,
			imagenUrl: "https://picsum.photos/seed/cinta/400/400",
			categoriaId: "1",
			isActive: true,
		},
	],
};

describe("SectionCarousel", () => {
	it("renders section title", () => {
		render(<SectionCarousel seccion={mockSeccion} locale="es" />);
		expect(screen.getByText("Plantas de Interior")).toBeInTheDocument();
	});

	it("renders all plant cards", () => {
		render(<SectionCarousel seccion={mockSeccion} locale="es" />);
		expect(screen.getByText("Potus")).toBeInTheDocument();
		expect(screen.getByText("Sanchezia")).toBeInTheDocument();
		expect(screen.getByText("Cinta")).toBeInTheDocument();
	});

	it("uses CSS scroll-snap on the carousel container", () => {
		render(<SectionCarousel seccion={mockSeccion} locale="es" />);
		const carousel = document.querySelector(
			".flex.overflow-x-auto.snap-x.snap-mandatory",
		);
		expect(carousel).toBeInTheDocument();
	});

	it("renders dot indicators when there are more cards than columnsVisible", () => {
		render(
			<SectionCarousel seccion={mockSeccion} locale="es" columnsVisible={2} />,
		);
		// 3 cards / 2 columns = 2 dots (ceil)
		const dots = document.querySelectorAll('[role="tablist"] button');
		expect(dots.length).toBe(2);
	});

	it("does not render dot indicators when only one dot is needed", () => {
		const firstPlant = mockSeccion.plantas.at(0);
		if (!firstPlant) return;
		const singleCardSeccion: SeccionMock = {
			...mockSeccion,
			plantas: [firstPlant],
		};
		render(
			<SectionCarousel
				seccion={singleCardSeccion}
				locale="es"
				columnsVisible={2}
			/>,
		);
		expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
	});
});
