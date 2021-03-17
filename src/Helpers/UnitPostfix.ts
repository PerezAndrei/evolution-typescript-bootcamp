import { unit } from "./Constants";

export function addPixel(value: number | string): string {
    return `${value}${unit.pixel}`;
}

export function addPercent(value: number | string): string {
    return `${value}${unit.percent}`;
}

export default {
    addPixel,
    addPercent
}