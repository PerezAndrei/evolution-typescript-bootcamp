import React from "react";
import constants from "../Helpers/Constants";
import * as hexagonCalculateSrv from "../Services/HexagonCalculateSrv";
import * as hexagonGridCalculateSrv from "../Services/HexagonGridCalculateSrv";
import { HexagonCell, HexagonCoordinates, HexagonParams, HexagonPoints } from "../Types/HexagonTypes";
import { HexagonGridProps } from "../Types/PropsTypes";
import { HexagonGridState } from "../Types/StateTypes";
import { Hexagon } from "./Hexagon";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import routeSrv from "../Services/RouteSrv";
import { getRandomData } from '../Services/DataService';
import { getItems, hexParamsToCells, mergeItems, shiftItems, shifttMergeItems } from "../Services/HexagonItemsService";
import { GameStatus } from "./GameStatus";

export class HexagonGrid extends React.Component<HexagonGridProps, HexagonGridState>{
    hexagonSize: number;
    hexagonWidth: number;
    hexagonHeight: number;
    points: HexagonPoints;
    hexagonStrokeWidth: number;
    viewBoxValue: string;
    pointsStringify: string;
    contentStyle: object = { height: constants.contentHeight, width: constants.containerWidth };
    headerStyle: object = { height: constants.headerHeight, width: constants.containerWidth };
    footerStyle: object = { height: constants.footerrHeight, width: constants.containerWidth };
    decreaseButtonDisabled = false;
    increaseButtonDisabled = false;

    constructor(props: HexagonGridProps) {
        super(props);
        this.state = {
            hexagonGridSize: routeSrv.getCurrentGridSize(),
            gridItems: [],
            hexagonItems: [],
            isShifting: false
        };
        this.hexagonSize = hexagonGridCalculateSrv.getHexagonSize(this.state.hexagonGridSize);
        this.hexagonWidth = hexagonCalculateSrv.getFlatWidth(this.hexagonSize);
        this.hexagonHeight = hexagonCalculateSrv.getFlatHeight(this.hexagonSize);
        [this.points, this.hexagonStrokeWidth] = hexagonCalculateSrv.getFlatPointsAndMargin(this.hexagonWidth, this.hexagonHeight, this.hexagonSize);
        this.viewBoxValue = hexagonCalculateSrv.getViewBoxValue(this.hexagonWidth, this.hexagonHeight);
        this.pointsStringify = hexagonCalculateSrv.getPointsStringify(this.points);
        this.initHexParams();
        this.onIncreaseSize = this.onIncreaseSize.bind(this);
        this.onDecreaseSize = this.onDecreaseSize.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);        
        this.validateHexGridSizeButtons();
    }

    initHexParams(){
        this.hexagonSize = hexagonGridCalculateSrv.getHexagonSize(this.state.hexagonGridSize);
        this.hexagonWidth = hexagonCalculateSrv.getFlatWidth(this.hexagonSize);
        this.hexagonHeight = hexagonCalculateSrv.getFlatHeight(this.hexagonSize);
        [this.points, this.hexagonStrokeWidth] = hexagonCalculateSrv.getFlatPointsAndMargin(this.hexagonWidth, this.hexagonHeight, this.hexagonSize);
        this.viewBoxValue = hexagonCalculateSrv.getViewBoxValue(this.hexagonWidth, this.hexagonHeight);
        this.pointsStringify = hexagonCalculateSrv.getPointsStringify(this.points);
    }

    componentDidMount() {
        console.log("componentDidMount");
        document.addEventListener("keydown", this.onKeyDown);
        getRandomData([], this.state.hexagonGridSize).then(result => {
            this.initHexGrid(result);
        });
    }

    componentDidUpdate(prevProps: HexagonGridProps, prevState: HexagonGridState) {
        console.log("componentDidUpdate");
        if (prevState.hexagonGridSize !== this.state.hexagonGridSize) {
            getRandomData([], this.state.hexagonGridSize).then(result => {
                this.initHexGrid(result);
            });
        }
        if (this.state.isShifting) {
            let hexCells = hexParamsToCells(this.state.hexagonItems);
            getRandomData(hexCells, this.state.hexagonGridSize).then(result => {
                this.updateHexGrid(result);
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    onKeyDown(event: KeyboardEvent) {
        let direction = constants.keyboardCodeDirection.get(event.code);
        if (!!direction) {
            console.log(constants.ShiftDirection[direction]);
            let [gridItems, hexagonItems, wasShifted] = shifttMergeItems(direction, this.state.hexagonGridSize, this.state.gridItems, this.state.hexagonItems);
            if (wasShifted) {
                this.setState({
                    hexagonItems,
                    gridItems,
                    isShifting: wasShifted
                });
            }
        }
    }

    onIncreaseSize() {
        this.setState(state => {
            const newHexGridSize = state.hexagonGridSize + 1;
            this.validateHexGridSizeButtons(newHexGridSize);
            return { hexagonGridSize: newHexGridSize };
        });
    }

    onDecreaseSize() {
        this.setState(state => {
            const newHexGridSize = state.hexagonGridSize - 1;
            this.validateHexGridSizeButtons(newHexGridSize);
            return { hexagonGridSize: newHexGridSize };
        });
    }

    validateHexGridSizeButtons(hexagonGridSize: number = this.state.hexagonGridSize) {
        this.increaseButtonDisabled = hexagonGridSize < constants.hexagonGridSizeMax ? false : true;
        this.decreaseButtonDisabled = hexagonGridSize > constants.hexagonGridSizeMin ? false : true;
    }

    initHexGrid(result: HexagonCell[]) {
        this.initHexParams();
        let gridItems = hexagonGridCalculateSrv.createHexagonGridItems(
            this.state.hexagonGridSize,
            this.hexagonWidth,
            this.hexagonHeight,
            constants.containerWidth,
            constants.contentHeight
        );
        let [gridItemsNew, hexagonItemsNew] = getItems(gridItems, [], result);
        this.setState({
            gridItems: gridItemsNew,
            hexagonItems: hexagonItemsNew,
        });
    }

    updateHexGrid(result: HexagonCell[]) {        
        let [gridItemsNew, hexagonItemsNew] = getItems(this.state.gridItems, this.state.hexagonItems, result);
        this.setState({
            gridItems: gridItemsNew,
            hexagonItems: hexagonItemsNew,
            isShifting: false
        });
    }

    render() {
        let { hexagonGridSize, gridItems, hexagonItems } = this.state;
        return (
            <div className="hexagon-container">
                <div style={this.headerStyle} className="header">
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
                </div>
                <div style={this.contentStyle} className="content">
                    <div className="hex-items">
                        {hexagonItems.map((item, index) => {
                            return (<Hexagon
                                key={index}
                                viewBox={this.viewBoxValue}
                                points={this.pointsStringify}
                                height={this.hexagonHeight}
                                width={this.hexagonWidth}
                                strokeWidth={0}
                                valuable={true}
                                params={item} />)
                        })}
                    </div>
                    {gridItems.map((item, index) => {
                        return (<Hexagon
                            key={index}
                            viewBox={this.viewBoxValue}
                            points={this.pointsStringify}
                            height={this.hexagonHeight}
                            width={this.hexagonWidth}
                            strokeWidth={this.hexagonStrokeWidth}
                            valuable={false}
                            params={item} />)
                    })}
                </div>
                <div style={this.footerStyle} className="footer">
                    <GameStatus gridItems={gridItems} />
                </div>
            </div>
        )
    }
}