import React from "react";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";
import { GameControlProps } from "../Types/PropsTypes";
import { GameControlState } from "../Types/StateTypes";
import routeSrv from "../Services/RouteSrv";
import { hexagonGridSizeMax, hexagonGridSizeMin } from "../Helpers/Constants";

export class GameControl extends React.PureComponent<GameControlProps, GameControlState>{
    decreaseButtonDisabled = false;
    increaseButtonDisabled = false;

    constructor(props: GameControlProps) {
        super(props);
        this.state = {
            hexagonGridSize: routeSrv.getCurrentGridSize()
        }
        this.onIncreaseSize = this.onIncreaseSize.bind(this);
        this.onDecreaseSize = this.onDecreaseSize.bind(this);
        this.validateHexGridSizeButtons();
    }

    componentDidMount() {
        console.log("GameControl componentDidMount")
        this.props.onHexGridSizeChange(this.state.hexagonGridSize);
    }

    componentDidUpdate() {
        console.log("GameControl componentDidUpdate")
        this.props.onHexGridSizeChange(this.state.hexagonGridSize);
    }

    onIncreaseSize() {
        this.setState(state => {
            let newHexGridSize = state.hexagonGridSize + 1;
            this.validateHexGridSizeButtons(newHexGridSize);
            return { hexagonGridSize: newHexGridSize };
        });
    }

    onDecreaseSize() {
        this.setState(state => {
            let newHexGridSize = state.hexagonGridSize - 1;
            this.validateHexGridSizeButtons(newHexGridSize);
            return { hexagonGridSize: newHexGridSize };
        });
    }

    validateHexGridSizeButtons(hexagonGridSize: number = this.state.hexagonGridSize) {
        this.increaseButtonDisabled = hexagonGridSize < hexagonGridSizeMax ? false : true;
        this.decreaseButtonDisabled = hexagonGridSize > hexagonGridSizeMin ? false : true;
    }

    render() {
        let { hexagonGridSize } = this.state;
        return (
            <Form inline>
                <Form.Group>
                    <Col>
                        <Form.Label>Size:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            className="input-small"
                            type="number"
                            value={hexagonGridSize} readOnly></Form.Control>
                    </Col>
                    <Col>
                        <ButtonGroup>
                            <Button
                                onClick={this.onIncreaseSize}
                                variant="secondary"
                                disabled={this.increaseButtonDisabled}><i className="fas fa-plus"></i></Button>
                            <Button
                                onClick={this.onDecreaseSize}
                                variant="secondary"
                                disabled={this.decreaseButtonDisabled}>
                                <i className="fas fa-minus"></i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
}