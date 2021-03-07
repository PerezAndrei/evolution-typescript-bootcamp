import { HexagonCoordinates, HexagonParams, HexagoonLocation } from "../Types/HexagonTypes";

function createHexagonGrid(size: number): Array<HexagonCoordinates> {
    console.log(`createHexagonGrid: size = "${size}"`);
    const result: Array<HexagonCoordinates> = new Array<HexagonCoordinates>();
    const stepCount = size - 1;
    for (let x = -stepCount; x <= stepCount; x++) {
        for (let y = Math.max(-stepCount, -x - stepCount); y <= Math.min(stepCount, -x + stepCount); y++) {
            const z = -x - y;
            result.push({ x, y, z });
        }
    }
    console.log(`createHexagonGrid: result.length = "${result.length}"`);
    result.forEach(item => console.log(item));
    return result;
}

function setHexagonLocation(
    items: Array<HexagonCoordinates>,
    hexagonWidth: number,
    hexagonHeight: number,
    containerWidth: number,
    containerHeight: number
): Array<HexagonParams> {
    console.log('createHexagonGrid');
    const params: Array<HexagonParams> = new Array<HexagonParams>();
    const hexGridCenterLocation: HexagoonLocation = {
        left: containerWidth / 2,
        top: containerHeight / 2
    };
    const hexCenterOffset: HexagoonLocation = {
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
    params.forEach(item => console.log(item));
    return params;
}

function createHexagonGridItems(
    size: number,
    hexagonWidth: number,
    hexagonHeight: number,
    containerWidth: number,
    containerHeight: number
): Array<HexagonParams> {
    console.log(`createHexagonGridItems: size = "${size}"`);
    let hexGridCenterLocation: HexagoonLocation = {
        left: containerWidth / 2,
        top: containerHeight / 2
    };
    let hexCenterOffset: HexagoonLocation = {
        left: hexagonWidth / 2,
        top: hexagonWidth / 2
    }
    let result: Array<HexagonParams> = new Array<HexagonParams>();
    let stepCount = size - 1;
    for (let x = -stepCount; x <= stepCount; x++) {
        for (let y = Math.max(-stepCount, -x - stepCount); y <= Math.min(stepCount, -x + stepCount); y++) {
            let z = -x - y;
            let hexCenterleftFromHexGridCenter = x * hexagonWidth * 3 / 4;
            let hexCentertopFromHexGridCenter = (-z + y) * hexagonHeight / 2;
            let left = hexGridCenterLocation.left + hexCenterleftFromHexGridCenter - hexCenterOffset.left;
            let top = hexGridCenterLocation.top + hexCentertopFromHexGridCenter - hexCenterOffset.top;
            result.push({ x, y, z, left, top, value: 0 });
        }
    }
    console.log(`createHexagonGridItems: result.length = "${result.length}"`);
    return result;
}

export { createHexagonGrid, setHexagonLocation, createHexagonGridItems }