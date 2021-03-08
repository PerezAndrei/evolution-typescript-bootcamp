import { HexagonCoordinates, HexagonParams, HexagonLocation } from "../Types/HexagonTypes";

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

function setHexagonLocation(
    items: Array<HexagonCoordinates>,
    hexagonWidth: number,
    hexagonHeight: number,
    containerWidth: number,
    containerHeight: number
): Array<HexagonParams> {
    const params: Array<HexagonParams> = new Array<HexagonParams>();
    const hexGridCenterLocation: HexagonLocation = {
        left: containerWidth / 2,
        top: containerHeight / 2
    };
    const hexCenterOffset: HexagonLocation = {
        left: hexagonWidth / 2,
        top: hexagonWidth / 2
    }

    for (const item of items) {
        const hexCenterleftFromHexGridCenter = item.x * hexagonWidth * 3 / 4;
        const hexCentertopFromHexGridCenter = (-item.z + item.y) * hexagonHeight / 2;
        const left = hexGridCenterLocation.left + hexCenterleftFromHexGridCenter - hexCenterOffset.left;
        const top = hexGridCenterLocation.top + hexCentertopFromHexGridCenter - hexCenterOffset.top;
        params.push({ ...item, left, top, value: 0 });
    }
    return params;
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
            let hexCentertopFromHexGridCenter = (z-y) * hexagonHeight / 2;
            let left = hexGridCenterLocation.left + hexCenterleftFromHexGridCenter - hexCenterOffset.left;
            let top = hexGridCenterLocation.top + hexCentertopFromHexGridCenter - hexCenterOffset.top;
            result.push({ x, y, z, left, top, value: 0 });
        }
    }
    return result;
}

export { createHexagonGrid, setHexagonLocation, createHexagonGridItems }