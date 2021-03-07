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
import { getRandomData } from "../Services/DataService";
import { getItems } from "../Services/HexagonItemsService";

export class HexagonGrid extends React.Component<HexagonGridProps, HexagonGridState>{
    hexagonSize: number = constants.hexagonSize;
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
        this.hexagonWidth = hexagonCalculateSrv.getFlatWidth(this.hexagonSize);
        this.hexagonHeight = hexagonCalculateSrv.getFlatHeight(this.hexagonSize);
        [this.points, this.hexagonStrokeWidth] = hexagonCalculateSrv.getFlatPointsAndMargin(this.hexagonWidth, this.hexagonHeight, this.hexagonSize);
        this.viewBoxValue = hexagonCalculateSrv.getViewBoxValue(this.hexagonWidth, this.hexagonHeight);
        this.pointsStringify = hexagonCalculateSrv.getPointsStringify(this.points);
        this.onSizeIncreasing = this.onSizeIncreasing.bind(this);
        this.onSizeDecreasing = this.onSizeDecreasing.bind(this);
        this.state = {
            hexagonGridSize: routeSrv.getCurrentGridSize(),
            gridItems: [],
            hexagonItems: []
        };
        // this.state = {
        //     hexagonGridSize: this.hexagonGridSize,
        //     gridItems: hexagonGridCalculateSrv.createHexagonGridItems(this.hexagonGridSize, this.hexagonWidth, this.hexagonHeight, constants.containerWidth, constants.contentHeight),
        //     hexagonItems: []
        // };
        this.validateHexGridSizeButtons();
    }

    componentDidMount() {
        console.log("componentDidMount");
        getRandomData(this.state.hexagonItems, this.state.hexagonGridSize).then(result => {
            this.initHexGrid(result);
        });
    }

    componentDidUpdate(prevProps: HexagonGridProps, prevState: HexagonGridState) {
        console.log("componentDidUpdate: prev state");
        console.log(prevState);
        if (prevState.hexagonGridSize !== this.state.hexagonGridSize) {
            getRandomData([], this.state.hexagonGridSize).then(result => {
                this.initHexGrid(result);
            });
        }
    }

    shouldComponentUpdate(nextProps: HexagonGridProps, nextState: HexagonGridState) {
        console.log("shouldComponentUpdate");
        return true;
    }

    onSizeIncreasing() {
        this.setState(state => {
            const newHexGridSize = state.hexagonGridSize + 1;
            this.validateHexGridSizeButtons(newHexGridSize);
            return { hexagonGridSize: newHexGridSize };
        });
    }

    onSizeDecreasing() {
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
    
    initHexGrid(result: HexagonCell[]){
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
            hexagonItems: hexagonItemsNew
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
                                        onClick={this.onSizeIncreasing}
                                        variant="secondary"
                                        disabled={this.increaseButtonDisabled}><i className="fas fa-plus"></i></Button>
                                    <Button
                                        onClick={this.onSizeDecreasing}
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
                    <div>
                        {hexagonItems.map((item, index) => {
                            return (<Hexagon
                                key={index}
                                viewBox={this.viewBoxValue}
                                points={this.pointsStringify}
                                height={this.hexagonHeight}
                                width={this.hexagonWidth}
                                strokeWidth={0}
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
                            params={item} />)
                    })}
                </div>
                <div style={this.footerStyle} className="footer">

                </div>
            </div>
        )
    }
}