import { unit } from "./Constants";

export function addPixel(value: number | string): string {
    return `${value}${unit.pixel}`;
}

export function addPercent(value: number | string): string {
    return `${value}${unit.percent}`;
}

const all = {
    addPixel,
    addPercent
}

export default all;