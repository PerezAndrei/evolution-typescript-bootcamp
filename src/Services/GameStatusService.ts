import { BootstrapAlertType, GameStatusValue, maxHexValue } from "../Helpers/Constants";
import { HexagonParams } from "../Types/HexagonTypes";

export function getAlertVariant(gameStatusValue: GameStatusValue): BootstrapAlertType {
    let bootstrapAlertType: BootstrapAlertType;
    switch (gameStatusValue) {
        case GameStatusValue.Playing:
            bootstrapAlertType = BootstrapAlertType.Secondary;
            break;
        case GameStatusValue.Win:
            bootstrapAlertType = BootstrapAlertType.Success;
            break;
        case GameStatusValue.GameOver:
            bootstrapAlertType = BootstrapAlertType.Danger;
            break;
        case GameStatusValue.Init:
            bootstrapAlertType = BootstrapAlertType.Info;
            break;
        default:
            bootstrapAlertType = BootstrapAlertType.None;
            throw new Error(`Unknown GameStatusValue: "${gameStatusValue}"`);
    }
    return bootstrapAlertType;
}

export function getGameStatus(gridItems: Array<HexagonParams>): GameStatusValue {
    let result: GameStatusValue;
    let valuesAll = gridItems.map(i => i.value);
    let maxValue = Math.max(...valuesAll);
    if (gridItems.length === 0) {
        result = GameStatusValue.Playing;
    }
    else if (maxValue === maxHexValue) {
        result = GameStatusValue.Win;
    }
    else if (valuesAll.find(val => val === 0) !== undefined) {
        result = GameStatusValue.Playing;
    }
    else {
        result = GameStatusValue.GameOver;
    }
    return result;
}