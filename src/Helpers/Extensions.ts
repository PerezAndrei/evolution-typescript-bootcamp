import { unit } from "./Constants";

export { }

declare global {
    interface Number {
        toPixels(): string;
        toPercent(): string;
    }

    interface String {
        toPixels(): string;
        toPercent(): string;
    }
}

Number.prototype.toPixels = function (this: number) {
    return `${this}${unit.pixel}`;
}

Number.prototype.toPercent = function (this: number) {
    return `${this}${unit.percent}`;
}

String.prototype.toPixels = function (this: string) {
    return `${this}${unit.pixel}`;
}
String.prototype.toPercent = function (this: string) {
    return `${this}${unit.percent}`;
}



