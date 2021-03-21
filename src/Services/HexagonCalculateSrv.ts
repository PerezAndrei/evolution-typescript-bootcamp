import { hexagonMargin, HexagonOrientation, hexagonSize } from "../Helpers/Constants";
import { HexagonPoint, HexagonPoints } from "../Types/HexagonTypes";

function getPointySize(size: number = hexagonSize): number {
    return 2 * size;
}

function getFlatSize(size: number = hexagonSize): number {
    return Math.sqrt(3) * size;
}

export function getSizeByFlatSize(flatSize: number): number {
    return flatSize / Math.sqrt(3);
}

export function initHexagonPoints(): HexagonPoints {
    return {
        point1: { x: 0, y: 0 },
        point2: { x: 0, y: 0 },
        point3: { x: 0, y: 0 },
        point4: { x: 0, y: 0 },
        point5: { x: 0, y: 0 },
        point6: { x: 0, y: 0 },
    }
}

function getPointyPointsAndMargin(containerWidth: number, containerHeight: number, size: number): [points: HexagonPoints, margin: number] {
    const [width, height, offsetX, offsetY, margin] = getHexagonParams(containerWidth, containerHeight, size, HexagonOrientation.Pointy);
    const points: HexagonPoints = {
        point1: {
            x: width / 2,
            y: 0
        },
        point2: {
            x: width,
            y: height / 4
        },
        point3: {
            x: width,
            y: height * 3 / 4
        },
        point4: {
            x: width / 2,
            y: height
        },
        point5: {
            x: 0,
            y: height * 3 / 4
        },
        point6: {
            x: 0,
            y: height / 4
        }
    };
    addOffset(points, offsetX, offsetY);

    return [points, margin];
}

export function getFlatPointsAndMargin(containerWidth: number, containerHeight: number, size: number): [points: HexagonPoints, margin: number] {
    const [width, height, offsetX, offsetY, margin] = getHexagonParams(containerWidth, containerHeight, size, HexagonOrientation.Flat);
    const points: HexagonPoints = {
        point1: {
            x: 0,
            y: height / 2
        },
        point2: {
            x: width / 4,
            y: 0
        },
        point3: {
            x: width * 3 / 4,
            y: 0
        },
        point4: {
            x: width,
            y: height / 2
        },
        point5: {
            x: width * 3 / 4,
            y: height
        },
        point6: {
            x: width / 4,
            y: height
        }
    };
    addOffset(points, offsetX, offsetY);

    return [points, margin];
}

function addOffset(points: HexagonPoints, offsetX: number, offsetY: number) {
    for (const point of Object.values(points)) {
        point.x += offsetX;
        point.y += offsetY;
    }
}

/**
* This is the foo function
* @param size initial size of a hex in px (length from center to any corner)
* @returns returns a tuple with params
*/
function getHexagonParams(
    containerWidth: number,
    containerHeight: number,
    size: number,
    orientation: HexagonOrientation
): [width: number, height: number, offsetX: number, offsetY: number, margin: number] {
    let margin = size * hexagonMargin / 100;
    let pointyMargin = (margin / 2) / (Math.cos(Math.PI / 6));
    let newSize = size - pointyMargin; // the size without margin
    let [width, height] = getHexagonSize(newSize, orientation);
    let offsetX = (containerWidth - width) / 2;
    let offsetY = (containerHeight - height) / 2;
    // fill in empty spaces because of svg stroke calculation inaccuracy
    margin = margin + 1;
    return [width, height, offsetX, offsetY, margin];
}

function getHexagonSize(size: number, orientation: HexagonOrientation): [width: number, height: number] {
    let result: [width: number, height: number];
    switch (orientation) {
        case HexagonOrientation.Flat:
            result = [getPointySize(size), getFlatSize(size)];
            break;
        case HexagonOrientation.Pointy:
            result = [getFlatSize(size), getPointySize(size)];
            break;
        default:
            throw new Error(`Unknown hex orientation: "${HexagonOrientation[orientation]}: ${orientation}"`);
    }
    return result;
}

export function getViewBoxValue(width: number, height: number): string {
    return `0 0 ${width} ${height}`;
}

export function getPointsStringify(points: HexagonPoints): string {
    const pointsStringify = Object.values(points).map(p => `${p.x},${p.y}`);
    return pointsStringify.join(" ");
}

export const getFlatWidth = getPointySize;
export const getFlatHeight = getFlatSize;
export const getPointyWidth = getFlatSize;
export const getPointyHeight = getPointySize;

export default { getFlatWidth, getFlatHeight, getPointyWidth, getPointyHeight, initHexagonPoints, getFlatPointsAndMargin, getViewBoxValue, getPointsStringify, getSizeByFlatSize };