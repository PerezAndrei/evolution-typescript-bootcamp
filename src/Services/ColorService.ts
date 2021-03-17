import { colorComponentRange, colorHSLValue, maxHexValue, hueRange, saturationRange, lightnessRange } from "../Helpers/Constants";
import { IColorHSL } from "../Interfaces/interfaces";
import unitPostfix from '../Helpers/UnitPostfix';

class ColorHSL implements IColorHSL {
    private maxHexValue: number;
    private hueRange: colorComponentRange;
    private saturationRange: colorComponentRange;
    private lightnessRange: colorComponentRange;
    private hueSize: number = 0;
    private saturationSize: number = 0;
    private lightnessSize: number = 0;
    private colorHSLValue: colorHSLValue = { h: 0, s: 0, l: 0 };

    constructor(
        maxHexValue: number,
        hueRange: colorComponentRange,
        saturationRange: colorComponentRange,
        lightnessRange: colorComponentRange
    ) {
        this.maxHexValue = maxHexValue;
        this.hueRange = hueRange;
        this.saturationRange = saturationRange;
        this.lightnessRange = lightnessRange;
        this.initSizes();
    }
    get color(): colorHSLValue {
        return this.colorHSLValue;
    }

    get colorStringify(): string {
        return `hsl(${this.colorHSLValue.h}, ${unitPostfix.addPercent(this.colorHSLValue.s)}, ${unitPostfix.addPercent(this.colorHSLValue.l)})`;;
    };

    init(hexValue: number) {
        this.colorHSLValue.h = this.hueRange.min + hexValue * this.hueSize;
        this.colorHSLValue.s = this.saturationRange.min + hexValue * this.saturationSize;
        this.colorHSLValue.l = this.getLightnessValue(hexValue);

    }

    private initSizes() {
        this.hueSize = Math.abs(this.hueRange.min - this.hueRange.max) / this.maxHexValue;
        let numberByHue = this.maxHexValue / Math.abs(this.hueRange.min - this.hueRange.max);
        this.lightnessSize = Math.abs(this.lightnessRange.min - this.lightnessRange.max) / numberByHue;
    }

    private getLightnessValue(hexValue: number): number {
        return this.lightnessRange.min - hexValue % (Math.abs(this.lightnessRange.min - this.lightnessRange.max)) * this.lightnessSize;
    }
}

// export const HueRange: colorComponentRange = { min: 156, max: 360 };
// export const SaturationRange: colorComponentRange = { min: 60, max: 60 };
// export const LightnessRange: colorComponentRange = { min: 80, max: 50 };

export function getColorHSL(): IColorHSL {
    return new ColorHSL(maxHexValue, hueRange, saturationRange, lightnessRange);
}