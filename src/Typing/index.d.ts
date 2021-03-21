import { HexagonPoints } from '../Types/HexagonTypes'

export { }

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeHexagon(): R;
            toBeHexGridItems(gridSize: number): R;
        }
    }
}