export type HexagonCoordinates = {
    x: number;
    y: number;
    z: number;
}

export type HexagonValue = {
    value: number;
}

export type HexagonCell = HexagonCoordinates & HexagonValue;

export type HexagonLocation = {
    top: number;
    left: number;
}

export type HexagonParams = HexagonCoordinates & HexagonLocation & HexagonValue;

export type HexagonPoint = {
    x: number;
    y: number;
}

export type HexagonPoints = {
    point1: HexagonPoint,
    point2: HexagonPoint,
    point3: HexagonPoint,
    point4: HexagonPoint,
    point5: HexagonPoint,
    point6: HexagonPoint,
}