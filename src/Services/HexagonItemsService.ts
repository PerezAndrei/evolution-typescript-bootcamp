import { ShiftDirection } from "../Helpers/Constants";
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

export function shiftItems(
    direction: ShiftDirection,
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): [griditems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>] {
    let gridItemsNew = [...gridItems];
    let hexagonItemsNew = [...hexagonItems];
    switch (direction) {
        case ShiftDirection.Top:
            break;
        case ShiftDirection.TopLeft:
            break;
        case ShiftDirection.TopRight:
            break;
        case ShiftDirection.Bottom:
            break;
        case ShiftDirection.BottomLeft:
            break;
        case ShiftDirection.BottomRight:
            break;


    }
    return [gridItemsNew, hexagonItemsNew];
}

function shiftItemsTop(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): void {
    for(let x = gridSize-2; x<)
}