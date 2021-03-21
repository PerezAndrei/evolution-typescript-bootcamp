import hexCalcSrv from '../Services/HexagonCalculateSrv';
import { HexagonPoints } from '../Types/HexagonTypes';
import { toBeHexagon } from '../Services/TestService';

expect.extend({ toBeHexagon });

it('Calculate a width of a flat hex', () => {
    expect(hexCalcSrv.getFlatWidth(5)).toEqual(10);
    expect(hexCalcSrv.getFlatWidth(7)).toEqual(14);
});

it('Calculate a height of a flat hex', () => {
    expect(hexCalcSrv.getFlatHeight(5)).toEqual(8.660254037844386);
    expect(hexCalcSrv.getFlatHeight(7)).toEqual(12.12435565298214);
});

it('Calculate a width of a pointy hex', () => {
    expect(hexCalcSrv.getPointyWidth(5)).toEqual(8.660254037844386);
    expect(hexCalcSrv.getPointyWidth(7)).toEqual(12.12435565298214);
});

it('Calculate a height of a pointy hex', () => {
    expect(hexCalcSrv.getPointyHeight(5)).toEqual(10);
    expect(hexCalcSrv.getPointyHeight(7)).toEqual(14);
});

it('Get a hex size by a height of a flat hex', () => {
    expect(hexCalcSrv.getSizeByFlatSize(8.660254037844386)).toEqual(5);
    expect(hexCalcSrv.getSizeByFlatSize(12.12435565298214)).toEqual(7);
});

it('Get points stringify', () => {
    let hexPoints: HexagonPoints = {
        point1: { x: 11, y: 12 },
        point2: { x: 21, y: 22 },
        point3: { x: 31, y: 32 },
        point4: { x: 41, y: 42 },
        point5: { x: 51, y: 52 },
        point6: { x: 61, y: 62 },
    };
    let hexPointsStringify = '11,12 21,22 31,32 41,42 51,52 61,62';
    expect(hexCalcSrv.getPointsStringify(hexPoints)).toEqual(hexPointsStringify);
});

it('Get a viewBox value of a svg element', () => {
    let width = 50;
    let height = 100;
    let expectedRes = `0 0 ${width} ${height}`;
    expect(hexCalcSrv.getViewBoxValue(width, height)).toEqual(expectedRes);

    let width1 = 50.4589;
    let height1 = 100.125;
    let expectedRes1 = `0 0 ${width1} ${height1}`;
    expect(hexCalcSrv.getViewBoxValue(width1, height1)).toEqual(expectedRes1);
});

it('Get flex hex points', () => {
    let hexSize = 7;
    let containerWidth = 14;
    let containerHeight = 12.12435565298214;
    expect(hexCalcSrv.getFlatPointsAndMargin(containerWidth, containerHeight, hexSize)).toBeHexagon();
})