type Unit = {
    pixel: string;
    percent: string;
}

export enum HexagonOrientation {
    Flat,
    Pointy
}

export const unit: Unit = {
    pixel: "px",
    percent: "%"
}

export const gameLevel = new Map<string, number>()
    .set("#test2", 2)
    .set("#test3", 3)
    .set("#test4", 4);

export enum BootstrapAlertType {
    Secondary = "secondary",
    Success = "success",
    Danger = "danger",
    None = ""
}

export enum GameStatusValue {
    Playing = "playing",
    Win = "win",
    GameOver = "game-over"
}

export enum ShiftDirection {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
    TopLeft = Top | Left,
    TopRight = Top | Right,
    BottomLeft = Bottom | Left,
    BottomRight = Bottom | Right
}

export const KeyboardCode = {
    Q: "KeyQ",
    W: "KeyW",
    E: "KeyE",
    A: "KeyA",
    S: "KeyS",
    D: "KeyD"
}

export const keyboardCodeDirection = new Map<string, ShiftDirection>()
    .set(KeyboardCode.Q, ShiftDirection.TopLeft)
    .set(KeyboardCode.W, ShiftDirection.Top)
    .set(KeyboardCode.E, ShiftDirection.TopRight)
    .set(KeyboardCode.A, ShiftDirection.BottomLeft)
    .set(KeyboardCode.S, ShiftDirection.Bottom)
    .set(KeyboardCode.D, ShiftDirection.BottomRight);



const containerHeight = 800 // unit: pixel
export const contentHeight = containerHeight * 0.8 // unit: pixel
export const headerHeight = containerHeight * 0.1 // unit: pixel
export const footerrHeight = containerHeight * 0.1 // unit: pixel
export const containerWidth = 600 // unit: pixel
export const hexagonMargin = 6; // unit: per cent
export const hexagonSize = 40; // unit: pixel
export const hexagonGridSizeMin = 2;
export const hexagonGridSizeMax = 5;
export const randomCellsURL = "http://51.15.207.127:13337/";
export const maxHexValue = 2048;
//export const maxHexValue = 4;

export type colorHSLValue = {
    h: number;
    s: number;
    l: number;
}

export type colorComponentRange = { min: number, max: number };

export const hueRange: colorComponentRange = { min: 155.2, max: 360 };
export const saturationRange: colorComponentRange = { min: 60, max: 60 };
export const lightnessRange: colorComponentRange = { min: 80, max: 50 };

export default {
    unit,
    hexagonMargin,
    hexagonSize,
    containerWidth,
    HexagonOrientation,
    contentHeight,
    headerHeight,
    footerrHeight,
    gameLevel,
    hexagonGridSizeMax,
    hexagonGridSizeMin,
    KeyboardCode,
    ShiftDirection,
    keyboardCodeDirection,
    GameStatusValue,
    maxHexValue,
    BootstrapAlertType,
    HueRange: hueRange,
    SaturationRange: saturationRange,
    LightnessRange: lightnessRange
};