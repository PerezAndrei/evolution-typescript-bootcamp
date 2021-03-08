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
): [griditems: Array<HexagonParams>, hexagonItems: Array<HexagonParams>] {
    let gridItemsNew = [...gridItems];
    let hexagonItemsNew = [...hexagonItems];
    switch (direction) {
        case ShiftDirection.Top:
            shiftItemsTop(gridSize, gridItemsNew, hexagonItemsNew);
            break;
        case ShiftDirection.TopLeft:
            break;
        case ShiftDirection.TopRight:
            break;
        case ShiftDirection.Bottom:
            shiftItemsBottom(gridSize, gridItemsNew, hexagonItemsNew)
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
    console.log(gridSize);
    console.log(gridItems);
    console.log(hexagonItems);
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
                else{
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
                }
            }
        }
    }
}

function shiftItemsTopLeft(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): void {
    console.log(gridSize);
    console.log(gridItems);
    console.log(hexagonItems);
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
                else{
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
                }
            }
        }
    }
}

function shiftItemsBottom(
    gridSize: number,
    gridItems: Array<HexagonParams>,
    hexagonItems: Array<HexagonParams>
): void {
    console.log(gridSize);
    console.log(gridItems);
    console.log(hexagonItems);
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
                else{
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
                }
            }
        }
    }
}