import { GameStatusValue } from "../Helpers/Constants"
import { HexagonParams } from "./HexagonTypes"

export type HexagonGameState = {
    hexagonGridSize: number;
    gameStatus: GameStatusValue;
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
export type ErrorBoundaryState = {
    hasError: boolean;
}

