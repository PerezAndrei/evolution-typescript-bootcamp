import { colorComponentRange, colorHSLValue } from "../Helpers/Constants";

export interface IColorHSL {
    color: colorHSLValue;
    colorStringify: string;
    init(hexValue: number): void;
}