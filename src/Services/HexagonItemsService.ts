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

export function shiftItems(
    direction: ShiftDirection,
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): [griditems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>, isShifting: boolean] {
    let gridItemsNew = [...gridItems];
    let hexagonItemsNew = [...hexagonItems];
    let isShifting = false;
    switch (direction) {
        case ShiftDirection.Top:
            isShifting = shiftItemsTop(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.TopLeft:
            isShifting = shiftItemsTopLeft(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.TopRight:
            isShifting = shiftItemsTopRight(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.Bottom:
            isShifting = shiftItemsBottom(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.BottomLeft:
            isShifting = shiftItemsBottomLeft(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.BottomRight:
            isShifting = shiftItemsBottomRight(gridSize, gridItemsNew, hexagonItemsNew);
            break;
    }
    return [gridItemsNew, hexagonItemsNew, isShifting];
}

function shiftItemsTop(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): boolean {
    let isShifting = false;
    for (let yz = gridSize - 2; yz > -gridSize; yz--) {
        console.log(`yz: ${yz}`);
        let y = yz;
        let z = -yz;
        let rowItems = hexagonItems.filter(i => (i.x <= 0 && i.y === y) || (i.x > 0 && i.z === z));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y < gridSize && newLocation.x <= 0) ||
                (newLocation.z > -gridSize && newLocation.x > 0)) {
                console.log("while");
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
                    if(!isShifting){
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
        console.log(`xy: ${xy}`);
        let x = -xy;
        let y = xy;
        let rowItems = hexagonItems.filter(i => (i.z >= 0 && i.x === x) || (i.z < 0 && i.y === y));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y < gridSize && newLocation.z <= 0) ||
                (newLocation.x > -gridSize && newLocation.z > 0)) {
                console.log("while");
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
                    if(!isShifting){
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
        console.log(`zx: ${zx}`);
        let z = -zx;
        let x = zx;
        let rowItems = hexagonItems.filter(i => (i.y >= 0 && i.z === z) || (i.y < 0 && i.x === x));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.x < gridSize && newLocation.y <= 0) ||
                (newLocation.z > -gridSize && newLocation.y > 0)) {
                console.log("while");
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
                    if(!isShifting){
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
        console.log(`yz: ${yz}`);
        let y = -yz;
        let z = yz;
        let rowItems = hexagonItems.filter(i => (i.x <= 0 && i.y === y) || (i.x > 0 && i.z === z));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.z < gridSize && newLocation.x <= 0) ||
                (newLocation.y > -gridSize && newLocation.x > 0)) {
                console.log("while");
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
                    if(!isShifting){
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
        console.log(`xy: ${xy}`);
        let x = xy;
        let y = -xy;
        let rowItems = hexagonItems.filter(i => (i.z >= 0 && i.x === x) || (i.z < 0 && i.y === y));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.y > -gridSize && newLocation.z <= 0) ||
                (newLocation.x < gridSize && newLocation.z > 0)) {
                console.log("while");
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
                    if(!isShifting){
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
        console.log(`zx: ${zx}`);
        let z = zx;
        let x = -zx;
        let rowItems = hexagonItems.filter(i => (i.y >= 0 && i.x === x) || (i.y < 0 && i.z === z));
        console.log("rowItems");
        console.log(rowItems);
        for (let rowItem of rowItems) {
            console.log("let rowItem of rowItems");
            console.log(rowItem);
            let newLocation: HexagonCoordinates = {
                x: rowItem.x,
                y: rowItem.y,
                z: rowItem.z
            }
            while ((newLocation.x > -gridSize && newLocation.y >= 0) ||
                (newLocation.z < gridSize && newLocation.y < 0)) {
                console.log("while");
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
                    if(!isShifting){
                        isShifting = true;
                    }
                }
            }
        }
    }
    return isShifting;
}