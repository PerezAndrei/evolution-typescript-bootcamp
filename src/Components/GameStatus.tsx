import {FunctionComponent, PureComponent, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { getAlertVariant } from '../Services/GameStatusService';
import { GameStatusProps } from '../Types/PropsTypes';
import { memo } from 'react';


const GameStatus: FunctionComponent<GameStatusProps> = (props: GameStatusProps) => {
    const variant = (): string => {
        return getAlertVariant(props.status);
    }

    return (
        <Alert
            data-status={props.status}
            variant={variant()}
            className="game-status-alert">
            <span>{props.status}</span>
        </Alert >
    );
}

export default memo(GameStatus); 