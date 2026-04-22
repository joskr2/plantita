import type { Categoria } from "@/data/categorias/categorias";
import type { Planta, SeccionMock } from "./plantas";

/**
 * Groups plantas by categoriaId into an array of SeccionMock.
 * Uses the provided categorias to enrich section names.
 */
export function mapPlantasToSecciones(
	plantas: Planta[],
	categorias: Categoria[],
): SeccionMock[] {
	const seccionesMap = new Map<string, SeccionMock>();

	for (const planta of plantas) {
		const existing = seccionesMap.get(planta.categoriaId);
		if (existing) {
			existing.plantas.push(planta);
		} else {
			const categoria = categorias.find((c) => c.id === planta.categoriaId);
			seccionesMap.set(planta.categoriaId, {
				id: `seccion-${planta.categoriaId}`,
				nombre: categoria?.nombre ?? "Sin categoría",
				slug: categoria?.slug ?? planta.categoriaId,
				categoriaId: planta.categoriaId,
				plantas: [planta],
			});
		}
	}

	return Array.from(seccionesMap.values());
}
