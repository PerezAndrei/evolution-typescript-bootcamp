import { HexagonParams } from './HexagonTypes'

export type HexagonProps = {
    viewBox: string,
    width: number,
    height: number,
    strokeWidth: number,
    points: string,
    valuable: boolean,
    params: HexagonParams
}

export type HexagonGridProps = {
}

export type GameStatusProps  = {
    gridItems: Array<HexagonParams>
}