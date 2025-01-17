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
    Info = "info",
    None = ""
}

export enum GameStatusValue {
    Init = "initialization",
    Playing = "playing",
    Win = "win",
    GameOver = "game-over",
    Error = "error"
}

export enum RefreshGrid{
    Init,
    Update
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



const containerHeight = 600 // unit: pixel
export const contentHeight = containerHeight * 0.8 // unit: pixel
export const headerHeight = containerHeight * 0.1 // unit: pixel
export const footerrHeight = containerHeight * 0.1 // unit: pixel
export const containerWidth = 450 // unit: pixel
export const hexagonMargin = 6; // unit: per cent
export const hexagonSize = 40; // unit: pixel
export const hexagonGridSizeMin = 2;
export const randomCellsURL = "https://68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud/";
export const hexagonGridSizeMax = 20;
export const maxHexValue = 2048;
export const pointsTestPrecision = 5;
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

const all = {
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
    LightnessRange: lightnessRange,
    pointsTestPrecision
};

export default all; 