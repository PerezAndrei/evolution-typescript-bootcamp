import React, { useEffect, useState, FunctionComponent } from 'react';
import { HexagonParams } from '../Types/HexagonTypes';
import { GameStatusValue, BootstrapAlertType } from '../Helpers/Constants';
import { getGameStatus, getAlertVariant } from '../Services/GameStatusService';
import { Alert } from 'react-bootstrap';
import { GameStatusProps } from '../Types/PropsTypes';

export const GameStatus: FunctionComponent<GameStatusProps> = (props: GameStatusProps) => {
    const [gameStatus, setGameStatus] = useState({ value: GameStatusValue.Playing });
    useEffect(() => { 
        console.log("GameStatus useEffect");           
        let gameStatusValue = getGameStatus(props.gridItems);
        setGameStatus({value: gameStatusValue});
    }, [gameStatus.value, props.gridItems]);

    const variant = (): string => {
        return getAlertVariant(gameStatus.value);
    }

    return (
        <Alert
            data-status={gameStatus.value}
            variant={variant()}
            className="game-status-alert">
            <span>{gameStatus.value}</span>
        </Alert >
    );
}