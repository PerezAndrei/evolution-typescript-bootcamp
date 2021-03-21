import { HexagonCoordinates, HexagonParams, HexagonLocation } from "../Types/HexagonTypes";
import { contentHeight } from '../Helpers/Constants';
import { getSizeByFlatSize } from "./HexagonCalculateSrv";

function createHexagonGrid(size: number): Array<HexagonCoordinates> {
    const result: Array<HexagonCoordinates> = new Array<HexagonCoordinates>();
    const stepCount = size - 1;
    for (let x = -stepCount; x <= stepCount; x++) {
        for (let y = Math.max(-stepCount, -x - stepCount); y <= Math.min(stepCount, -x + stepCount); y++) {
            const z = -x - y;
            result.push({ x, y, z });
        }
    }
    return result;
}

function createHexagonGridItems(
    size: number,
    hexagonWidth: number,
    hexagonHeight: number,
    containerWidth: number,
    containerHeight: number
): Array<HexagonParams> {
    let hexGridCenterLocation: HexagonLocation = {
        left: containerWidth / 2,
        top: containerHeight / 2
    };
    let hexCenterOffset: HexagonLocation = {
        left: hexagonWidth / 2,
        top: hexagonWidth / 2
    }
    let result: Array<HexagonParams> = new Array<HexagonParams>();
    let stepCount = size - 1;
    for (let x = -stepCount; x <= stepCount; x++) {
        for (let y = Math.max(-stepCount, -x - stepCount); y <= Math.min(stepCount, -x + stepCount); y++) {
            let z = -x - y;
            let hexCenterleftFromHexGridCenter = x * hexagonWidth * 3 / 4;
            let hexCentertopFromHexGridCenter = (z - y) * hexagonHeight / 2;
            let left = hexGridCenterLocation.left + hexCenterleftFromHexGridCenter - hexCenterOffset.left;
            let top = hexGridCenterLocation.top + hexCentertopFromHexGridCenter - hexCenterOffset.top;
            result.push({ x, y, z, left, top, value: 0 });
        }
    }
    return result;
}

function getHexagonSize(gridSize: number): number {
    let hexagonHeight = (contentHeight - 40) / (gridSize * 2 - 1);
    return getSizeByFlatSize(hexagonHeight);
}

export { createHexagonGrid, createHexagonGridItems, getHexagonSize }