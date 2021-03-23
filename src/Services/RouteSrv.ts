import { gameLevel, hexagonGridSizeMin } from "../Helpers/Constants";

export function getCurrentGridSize(): number {
    let level: number | undefined = hexagonGridSizeMin;
    const hash = window.location.hash;
    if(gameLevel.has(hash)){
        level = gameLevel.get(hash) as number;
    }
    return level;
}

const all = { 
    getCurrentGridSize 
}

export default all;