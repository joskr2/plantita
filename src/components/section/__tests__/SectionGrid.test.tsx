import { screen } from "@testing-library/react";
import type { SeccionMock } from "@/data/plantas/plantas";
import { render } from "@/test/providers";
import { SectionGrid } from "../SectionGrid";

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
		{
			id: "espatifilo",
			nombre: "Espatifilo",
			slug: "espatifilo",
			precio: 15.99,
			imagenUrl: "https://picsum.photos/seed/espatifilo/400/400",
			categoriaId: "1",
			isActive: true,
		},
	],
};

describe("SectionGrid", () => {
	it("renders section title", () => {
		render(<SectionGrid seccion={mockSeccion} locale="es" />);
		expect(screen.getByText("Plantas de Interior")).toBeInTheDocument();
	});

	it("renders all active plant cards", () => {
		render(<SectionGrid seccion={mockSeccion} locale="es" />);
		expect(screen.getByText("Potus")).toBeInTheDocument();
		expect(screen.getByText("Sanchezia")).toBeInTheDocument();
		expect(screen.getByText("Cinta")).toBeInTheDocument();
		expect(screen.getByText("Espatifilo")).toBeInTheDocument();
	});

	it("does not render inactive plants", () => {
		const inactiveSeccion: SeccionMock = {
			...mockSeccion,
			plantas: [
				{ ...mockSeccion.plantas[0], isActive: false },
				{ ...mockSeccion.plantas[1], isActive: true },
			],
		};
		render(<SectionGrid seccion={inactiveSeccion} locale="es" />);
		expect(screen.getByText("Sanchezia")).toBeInTheDocument();
		expect(screen.queryByText("Potus")).not.toBeInTheDocument();
	});

	it("respects columns prop", () => {
		render(<SectionGrid seccion={mockSeccion} locale="es" columns={2} />);
		const grid = document.querySelector(".grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveStyle({
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		});
	});

	it("respects rows prop", () => {
		render(<SectionGrid seccion={mockSeccion} locale="es" rows={1} />);
		const grids = document.querySelectorAll(".grid");
		expect(grids.length).toBe(1);
	});
});
