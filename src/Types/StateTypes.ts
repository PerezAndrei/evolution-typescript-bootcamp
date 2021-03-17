import { HexagonParams } from "./HexagonTypes"

export type HexagonGameState = {
    hexagonGridSize: number;
    gridItems: Array<HexagonParams>;
}

export type GameControlState = {
    hexagonGridSize: number;
}

export type HexagonGridState = {
    gridItems: Array<HexagonParams>;
    hexagonItems: Array<HexagonParams>;
    isShifting: boolean;
}

export type HexagonState = {}

