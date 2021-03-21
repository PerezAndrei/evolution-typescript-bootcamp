import { pointsTestPrecision as precision } from "../Helpers/Constants";
import { round } from "../Helpers/MathUtil";
import { HexagonParams, HexagonPoints } from "../Types/HexagonTypes";

export function toBeHexagon(
    recieved: [points: HexagonPoints, margin: number]
): jest.CustomMatcherResult {
    let errorMessages: string[] = [];
    let [points] = recieved;
    let width = points.point4.x - points.point1.x;
    let height = points.point6.y - points.point2.y;
    let widthHeightRatioActual = round(width / height, precision);
    let widthHeightRatioExpected = round(2 / (Math.sqrt(3)), precision);
    let heightHalf = round(height / 2, precision);
    let width14th = round(width / 4, precision);
    let width34ths = round(width * 3 / 4, precision);
    let xDiff43 = round(points.point4.x - points.point3.x, precision);
    let xDiff42 = round(points.point4.x - points.point2.x, precision);
    let yDiff61 = round(points.point6.y - points.point1.y, precision);
    let yDiff12 = round(points.point1.y - points.point2.y, precision);

    if (points.point2.y !== points.point3.y) {
        errorMessages.push(`point2.y: "${points.point2.y}" must equal point3.y: "${points.point3.y}"`);
    }

    if (points.point1.y !== points.point4.y) {
        errorMessages.push(`point1.y: "${points.point1.y}" must equal point4.y: "${points.point4.y}"`);
    }

    if (points.point6.y !== points.point5.y) {
        errorMessages.push(`point6.y: "${points.point6.y}" must equal point5.y: "${points.point5.y}"`);
    }

    if (points.point2.x !== points.point6.x) {
        errorMessages.push(`point2.x: "${points.point2.x}" must equal point6.x: "${points.point6.x}"`);
    }

    if (points.point3.x !== points.point5.x) {
        errorMessages.push(`point3.x: "${points.point3.x}" must equal point5.x: "${points.point5.x}"`);
    }

    if (xDiff43 !== width14th) {
        errorMessages.push(`xDiff43: "${xDiff43}" must equal width/4: "${width14th}"`);
    }

    if (xDiff42 !== width34ths) {
        errorMessages.push(`xDiff42: "${xDiff42}" must equal width*3/4: "${width34ths}"`);
    }

    if (yDiff61 !== heightHalf) {
        errorMessages.push(`yDiff61: "${yDiff61}" must equal height/2: "${heightHalf}"`);
    }

    if (yDiff12 !== heightHalf) {
        errorMessages.push(`yDiff12: "${yDiff12}" must equal height/2: "${heightHalf}"`);
    }

    if (widthHeightRatioActual !== widthHeightRatioExpected) {
        errorMessages.push(`widthHeightRatioActual: "${widthHeightRatioActual}" must equal widthHeightRatioExpected: "${widthHeightRatioExpected}"`);
    }

    return {
        pass: errorMessages.length > 0 ? false : true,
        message: () => errorMessages.join(";")
    }
}

export function toBeHexGridItems(gridItems: Array<HexagonParams>, gridSize: number): jest.CustomMatcherResult {
    let errorMessages: string[] = [];
    let maxItemsInRow = 2 * gridSize - 1;

    for (let hexParams of gridItems) {
        if (hexParams.x + hexParams.y + hexParams.z !== 0) {
            errorMessages.push(`A sum of all axes of any hex grid item must equal zero`)
        }
    }

    for (let xyz = 0; xyz < gridSize; xyz++) {       
        let itemsX = gridItems.filter(i => i.x === xyz);
        if (itemsX.length !== maxItemsInRow) {
            errorMessages.push(`Number of x = "${xyz}" items equals "${itemsX.length}", but expexted value must be "${maxItemsInRow}"`);
        }

        let itemsY = gridItems.filter(i => i.y === xyz);
        if (itemsX.length !== maxItemsInRow) {
            errorMessages.push(`Number of y = "${xyz}" items equals "${itemsY.length}", but expexted value must be "${maxItemsInRow}"`);
        }

        let itemsZ = gridItems.filter(i => i.z === xyz);
        if (itemsZ.length !== maxItemsInRow) {
            errorMessages.push(`Number of z = "${xyz}" items equals "${itemsZ.length}", but expexted value must be "${maxItemsInRow}"`);
        }

        maxItemsInRow--;
    }

    return {
        pass: errorMessages.length > 0 ? false : true,
        message: () => errorMessages.join(";")
    }
}