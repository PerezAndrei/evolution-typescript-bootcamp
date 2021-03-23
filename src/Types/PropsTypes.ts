import { GameStatusValue } from '../Helpers/Constants'
import { HexagonParams } from './HexagonTypes'

export type HexagonGameProps = {}

export type GameControlProps = {
    onHexGridSizeChange: (hexagonGridSize: number) => void;
}

export type HexagonGridProps = {
    hexagonGridSize: number;
    onHexGridItemsChange: (gridItems: Array<HexagonParams>) => void;
}

export type GameStatusProps = {
    status: GameStatusValue;
}

export type HexagonProps = {
    viewBox: string;
    width: number;
    height: number;
    strokeWidth: number;
    points: string;
    valuable: boolean;
    params: HexagonParams;
}

export type ErrorBoundaryProps = {}
