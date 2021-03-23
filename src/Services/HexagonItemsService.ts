import { ShiftDirection } from "../Helpers/Constants";
import { HexagonCell, HexagonCoordinates, HexagonParams } from "../Types/HexagonTypes";

export function getItems(
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>,
    hexagonCells: Array<HexagonCell>
): [gridItems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>] {
    let gridItemsNew: Array<HexagonParams> = [...gridItems];
    let hexagonItemsNew: Array<HexagonParams> = [...hexagonItems];
    for (let cell of hexagonCells) {
        let gridItem = gridItemsNew.find(i => i.x === cell.x && i.y === cell.y && i.z === cell.z);
        if (gridItem) {
            gridItem.value = cell.value;
            hexagonItemsNew.push({ ...gridItem });
        }
    }
    return [gridItemsNew, hexagonItemsNew];
}

export function shifttMergeItems(
    direction: ShiftDirection,
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): [griditems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>, wasShifted: boolean] {
    let wasShifted: boolean;
    [gridItems, hexagonItems, wasShifted] = shiftItems(direction, gridSize, gridItems, hexagonItems);
    if (wasShifted) {
        let wasMerged: boolean;
        [wasMerged, hexagonItems] = mergeItems(direction, gridSize, gridItems, hexagonItems);
        if (wasMerged) {
            [gridItems, hexagonItems] = shiftItems(direction, gridSize, gridItems, hexagonItems);
        }
    }
    return [gridItems, hexagonItems, wasShifted];
}

export function shiftItems(
    direction: ShiftDirection,
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): [griditems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>, wasShifted: boolean] {
    let gridItemsNew = [...gridItems];
    let hexagonItemsNew = [...hexagonItems];
    let wasShifted = false;
    switch (direction) {
        case ShiftDirection.Top:
            wasShifted = shiftItemsTop(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.TopLeft:
            wasShifted = shiftItemsTopLeft(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.TopRight:
            wasShifted = shiftItemsTopRight(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.Bottom:
            wasShifted = shiftItemsBottom(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.BottomLeft:
            wasShifted = shiftItemsBottomLeft(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.BottomRight:
            wasShifted = shiftItemsBottomRight(gridSize, gridItemsNew, hexagonItemsNew);
            break;
    }
    return [gridItemsNew, hexagonItemsNew, wasShifted];
}

export function mergeItems(
    direction: ShiftDirection,
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): [wasMerged: boolean, hexagonitems: Array<HexagonParams>] {
    let wasMerged = false;
    switch (direction) {
        case ShiftDirection.Top:
            [wasMerged, hexagonItems] = mergeItemsTop(gridSize, gridItems, hexagonItems);
            break;
        case ShiftDirection.TopLeft:
            [wasMerged, hexagonItems] = mergeItemsTopLeft(gridSize, gridItems, hexagonItems);
            break;
        case ShiftDirection.TopRight:
            [wasMerged, hexagonItems] = mergeItemsTopRight(gridSize, gridItems, hexagonItems);
            break;
        case ShiftDirection.Bottom:
            [wasMerged, hexagonItems] = mergeItemsBottom(gridSize, gridItems, hexagonItems);
            break;
        case ShiftDirection.BottomLeft:
            [wasMerged, hexagonItems] = mergeItemsBottomLeft(gridSize, gridItems, hexagonItems);
            break;
        case ShiftDirection.BottomRight:
            [wasMerged, hexagonItems] = mergeItemsBottomRight(gridSize, gridItems, hexagonItems);
            break;
    }
    return [wasMerged, hexagonItems];
}

export function hexParamsToCells(hexParams: Array<HexagonParams>):Array<HexagonCell>{
    return hexParams.map<HexagonCell>(i => {
        return { x: i.x, y: i.y, z: i.z, value: i.value };
    });
}

function shiftItemsTop(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let yz = gridSize - 2; yz > -gridSize; yz--) {
        let y = yz;
        let z = -yz;
        let rowItems = hexagonItems.filter(i => (i.x <= 0 && i.y === y) || (i.x > 0 && i.z === z));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y < gridSize && newLocation.x <= 0) ||
                (newLocation.z > -gridSize && newLocation.x > 0)) {
                let gridItemNext = gridItems.find(i => i.x === newLocation.x && i.y === newLocation.y + 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.y = gridItemNext.y;
                    newLocation.z = gridItemNext.z;
                }
                else {
                    break;
                }
            }
            if (rowItem.y !== newLocation.y) {
                let gridItemTo = gridItems.find(i => i.x === newLocation.x && i.y === newLocation.y);
                let gridItemFrom = gridItems.find(i => i.x === rowItem.x && i.y === rowItem.y);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function shiftItemsTopLeft(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let xy = gridSize - 2; xy > -gridSize; xy--) {
        let x = -xy;
        let y = xy;
        let rowItems = hexagonItems.filter(i => (i.z >= 0 && i.x === x) || (i.z < 0 && i.y === y));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y < gridSize && newLocation.z <= 0) ||
                (newLocation.x > -gridSize && newLocation.z > 0)) {
                let gridItemNext = gridItems.find(i => i.z === newLocation.z && i.y === newLocation.y + 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.x = gridItemNext.x;
                    newLocation.y = gridItemNext.y;
                }
                else {
                    break;
                }
            }
            if (rowItem.y !== newLocation.y) {
                let gridItemTo = gridItems.find(i => i.z === newLocation.z && i.y === newLocation.y);
                let gridItemFrom = gridItems.find(i => i.z === rowItem.z && i.y === rowItem.y);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function shiftItemsTopRight(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let zx = gridSize - 2; zx > -gridSize; zx--) {
        let z = -zx;
        let x = zx;
        let rowItems = hexagonItems.filter(i => (i.y >= 0 && i.z === z) || (i.y < 0 && i.x === x));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.x < gridSize && newLocation.y <= 0) ||
                (newLocation.z > -gridSize && newLocation.y > 0)) {
                let gridItemNext = gridItems.find(i => i.y === newLocation.y && i.x === newLocation.x + 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.x = gridItemNext.x;
                    newLocation.z = gridItemNext.z;
                }
                else {
                    break;
                }
            }
            if (rowItem.x !== newLocation.x) {
                let gridItemTo = gridItems.find(i => i.y === newLocation.y && i.x === newLocation.x);
                let gridItemFrom = gridItems.find(i => i.y === rowItem.y && i.x === rowItem.x);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function shiftItemsBottom(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let yz = gridSize - 2; yz > -gridSize; yz--) {
        let y = -yz;
        let z = yz;
        let rowItems = hexagonItems.filter(i => (i.x <= 0 && i.y === y) || (i.x > 0 && i.z === z));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.z < gridSize && newLocation.x <= 0) ||
                (newLocation.y > -gridSize && newLocation.x > 0)) {
                let gridItemNext = gridItems.find(i => i.x === newLocation.x && i.y === newLocation.y - 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.y = gridItemNext.y;
                    newLocation.z = gridItemNext.z;
                }
                else {
                    break;
                }
            }
            if (rowItem.y !== newLocation.y) {
                let gridItemTo = gridItems.find(i => i.x === newLocation.x && i.y === newLocation.y);
                let gridItemFrom = gridItems.find(i => i.x === rowItem.x && i.y === rowItem.y);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function shiftItemsBottomRight(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let xy = gridSize - 2; xy > -gridSize; xy--) {
        let x = xy;
        let y = -xy;
        let rowItems = hexagonItems.filter(i => (i.z >= 0 && i.x === x) || (i.z < 0 && i.y === y));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y > -gridSize && newLocation.z <= 0) ||
                (newLocation.x < gridSize && newLocation.z > 0)) {
                let gridItemNext = gridItems.find(i => i.z === newLocation.z && i.y === newLocation.y - 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.x = gridItemNext.x;
                    newLocation.y = gridItemNext.y;
                }
                else {
                    break;
                }
            }
            if (rowItem.y !== newLocation.y) {
                let gridItemTo = gridItems.find(i => i.z === newLocation.z && i.y === newLocation.y);
                let gridItemFrom = gridItems.find(i => i.z === rowItem.z && i.y === rowItem.y);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function shiftItemsBottomLeft(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let zx = gridSize - 2; zx > -gridSize; zx--) {
        let z = zx;
        let x = -zx;
        let rowItems = hexagonItems.filter(i => (i.y >= 0 && i.x === x) || (i.y < 0 && i.z === z));
        for (let rowItem of rowItems) {
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.x > -gridSize && newLocation.y >= 0) ||
                (newLocation.z < gridSize && newLocation.y < 0)) {
                let gridItemNext = gridItems.find(i => i.y === newLocation.y && i.x === newLocation.x - 1);
                if (!!gridItemNext && !gridItemNext.value) {
                    newLocation.x = gridItemNext.x;
                    newLocation.z = gridItemNext.z;
                }
                else {
                    break;
                }
            }
            if (rowItem.x !== newLocation.x) {
                let gridItemTo = gridItems.find(i => i.y === newLocation.y && i.x === newLocation.x);
                let gridItemFrom = gridItems.find(i => i.y === rowItem.y && i.x === rowItem.x);
                if (!!gridItemTo && !!gridItemFrom) {
                    gridItemFrom.value = 0;
                    gridItemTo.value = rowItem.value;
                    Object.assign(rowItem, gridItemTo);
                    if (!isShifting) {
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}

function mergeItemsTop(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let x = -gridSize + 1; x < gridSize; x++) {
        let sortedItems = hexagonItems.filter(i => i.x === x).sort(sortYDesc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeItemsTopLeft(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let z = -gridSize + 1; z < gridSize; z++) {
        let sortedItems = hexagonItems.filter(i => i.z === z).sort(sortYDesc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeItemsTopRight(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let y = -gridSize + 1; y < gridSize; y++) {
        let sortedItems = hexagonItems.filter(i => i.y === y).sort(sortXDesc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeItemsBottom(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let x = -gridSize + 1; x < gridSize; x++) {
        let sortedItems = hexagonItems.filter(i => i.x === x).sort(sortYAsc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeItemsBottomLeft(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let y = -gridSize + 1; y < gridSize; y++) {
        let sortedItems = hexagonItems.filter(i => i.y === y).sort(sortXAsc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeItemsBottomRight(
    gridSize: number,
    gridItems: HexagonParams[],
    hexagonItems: HexagonParams[]
): [wasMerged: boolean, hexagonItems: Array<HexagonParams>] {
    let wasMerged = false;
    for (let z = -gridSize + 1; z < gridSize; z++) {
        let sortedItems = hexagonItems.filter(i => i.z === z).sort(sortXDesc);
        let wasMergedCurrent = mergeSortedItems(gridItems, sortedItems);
        if (!wasMerged && wasMergedCurrent) {
            wasMerged = true;
        }
    }
    if (wasMerged) {
        hexagonItems = hexagonItems.filter(i => i.value !== 0);
    }
    return [wasMerged, hexagonItems];
}

function mergeSortedItems(gridItems: Array<HexagonParams>, sortedItems: Array<HexagonParams>): boolean {
    let wasMerged = false;
    if (sortedItems.length > 1) {
        for (let index = 0; index < sortedItems.length - 1; index++) {
            let firstItem = sortedItems[index];
            let secondItem = sortedItems[index + 1];
            let wasMergedCurrent = mergeHexagons(firstItem, secondItem);
            if (wasMergedCurrent) {
                updateGridItems(gridItems, firstItem, secondItem);
                index++;
            }
            if (!wasMerged && wasMergedCurrent) {
                wasMerged = true;
            }
        }
    }
    return wasMerged;
}

function mergeHexagons(first: HexagonParams, second: HexagonParams): boolean {
    let wasMerged = false;
    if (first.value === second.value) {
        first.value += second.value;
        second.value = 0;
        wasMerged = true;
    }
    return wasMerged;
}

function updateGridItems(gridItems: Array<HexagonParams>, ...hexagonItems: Array<HexagonParams>) {
    for (let hexagonItem of hexagonItems) {
        let gridItem = gridItems.find(
            i => i.x === hexagonItem.x &&
                i.y === hexagonItem.y &&
                i.z === hexagonItem.z);
        if (!!gridItem) {
            gridItem.value = hexagonItem.value
        }
    }
}

let sortYAsc = (hex1: HexagonParams, hex2: HexagonParams) => hex1.y - hex2.y;
let sortYDesc = (hex1: HexagonParams, hex2: HexagonParams) => hex2.y - hex1.y;

let sortXAsc = (hex1: HexagonParams, hex2: HexagonParams) => hex1.x - hex2.x;
let sortXDesc = (hex1: HexagonParams, hex2: HexagonParams) => hex2.x - hex1.x;
