import { createHexagonGridItems } from '../Services/HexagonGridCalculateSrv';
import { toBeHexGridItems } from '../Services/TestService';

expect.extend({ toBeHexGridItems });

it('Check axes values', () => {
    let gridSize = 5;
    let hexWidth = 14;
    let hexHeight = 12.12435565298214;
    let containerWidth = 1000;
    let containerHeight = 1000;
    expect(createHexagonGridItems(gridSize, hexWidth, hexHeight, containerWidth, containerHeight)).toBeHexGridItems(gridSize);
}) 