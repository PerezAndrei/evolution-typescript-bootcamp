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
    gridItems: Array<HexagonParams>;
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
