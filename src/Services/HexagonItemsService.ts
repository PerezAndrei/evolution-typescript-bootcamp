import { HexagonCell, HexagonParams } from "../Types/HexagonTypes";

export function getItems(
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>,
    hexagonCells: Array<HexagonCell>
): [gridItems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>] {
    let hexagonItemsNew: Array<HexagonParams> = [...hexagonItems];
    let gridItemsNew: Array<HexagonParams> = [...gridItems];
    for (let cell of hexagonCells) {
        let gridItem = gridItemsNew.find(i => i.x === cell.x && i.y === cell.y && i.z === cell.z);
        if (gridItem) {
            gridItem.value = cell.value;
            hexagonItemsNew.push({ ...gridItem });
        }
    }
    return [gridItemsNew, hexagonItemsNew];
}