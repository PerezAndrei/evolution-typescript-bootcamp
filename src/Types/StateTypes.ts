import { HexagonParams } from "./HexagonTypes"

export type HexagonState = {}

export type HexagonGridState = {
    hexagonGridSize: number;
    gridItems:  Array<HexagonParams>;
    hexagonItems: Array<HexagonParams>;
    isShifting: boolean;
}