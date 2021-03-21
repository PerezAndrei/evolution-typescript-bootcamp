import React from "react";
import constants, { RefreshGrid } from "../Helpers/Constants";
import * as hexagonCalculateSrv from "../Services/HexagonCalculateSrv";
import * as hexagonGridCalculateSrv from "../Services/HexagonGridCalculateSrv";
import { HexagonCell, HexagonPoints } from "../Types/HexagonTypes";
import { HexagonGridProps } from "../Types/PropsTypes";
import { HexagonGridState } from "../Types/StateTypes";
import { Hexagon } from "./Hexagon";
import { getRandomData } from '../Services/DataService';
import { getItems, hexParamsToCells, shifttMergeItems } from "../Services/HexagonItemsService";

export class HexagonGrid extends React.Component<HexagonGridProps, HexagonGridState>{
    hexagonSize: number = 0;
    hexagonWidth: number = 0;
    hexagonHeight: number = 0;
    points: HexagonPoints = hexagonCalculateSrv.initHexagonPoints();
    hexagonStrokeWidth: number = 0;
    viewBoxValue: string = "";
    pointsStringify: string = "";

    constructor(props: HexagonGridProps) {
        super(props);
        this.state = {
            gridItems: [],
            hexagonItems: [],
            isShifting: false
        };
        this.initHexParams();
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    initHexParams() {
        if (this.props.hexagonGridSize === 0) return;
        this.hexagonSize = hexagonGridCalculateSrv.getHexagonSize(this.props.hexagonGridSize);
        this.hexagonWidth = hexagonCalculateSrv.getFlatWidth(this.hexagonSize);
        this.hexagonHeight = hexagonCalculateSrv.getFlatHeight(this.hexagonSize);
        [this.points, this.hexagonStrokeWidth] = hexagonCalculateSrv.getFlatPointsAndMargin(this.hexagonWidth, this.hexagonHeight, this.hexagonSize);
        this.viewBoxValue = hexagonCalculateSrv.getViewBoxValue(this.hexagonWidth, this.hexagonHeight);
        this.pointsStringify = hexagonCalculateSrv.getPointsStringify(this.points);
    }

    componentDidMount() {
        console.log("HexagonGrid componentDidMount");
        document.addEventListener("keydown", this.onKeyDown);
        this.refreshGrid(RefreshGrid.Init);
    }

    componentDidUpdate(prevProps: HexagonGridProps, prevState: HexagonGridState) {
        console.log("HexagonGrid componentDidUpdate");
        if (prevProps.hexagonGridSize !== this.props.hexagonGridSize) {
            this.refreshGrid(RefreshGrid.Init);
        }
        if (this.state.isShifting) {
            this.refreshGrid(RefreshGrid.Update);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    onKeyDown(event: KeyboardEvent) {
        let direction = constants.keyboardCodeDirection.get(event.code);
        if (!!direction) {
            console.log(constants.ShiftDirection[direction]);
            let [gridItems, hexagonItems, wasShifted] = shifttMergeItems(direction, this.props.hexagonGridSize, this.state.gridItems, this.state.hexagonItems);
            if (wasShifted) {
                this.setState({
                    hexagonItems,
                    gridItems,
                    isShifting: wasShifted
                });
            }
        }
    }

    initHexGrid(result: HexagonCell[]) {
        this.initHexParams();
        let gridItems = hexagonGridCalculateSrv.createHexagonGridItems(
            this.props.hexagonGridSize,
            this.hexagonWidth,
            this.hexagonHeight,
            constants.containerWidth,
            constants.contentHeight
        );
        let [gridItemsNew, hexagonItemsNew] = getItems(gridItems, [], result);
        this.setState({
            gridItems: gridItemsNew,
            hexagonItems: hexagonItemsNew,
        }, () => {
            this.props.onHexGridItemsChange(this.state.gridItems);
        });
    }

    updateHexGrid(result: HexagonCell[]) {
        let [gridItemsNew, hexagonItemsNew] = getItems(this.state.gridItems, this.state.hexagonItems, result);
        this.setState({
            gridItems: gridItemsNew,
            hexagonItems: hexagonItemsNew,
            isShifting: false
        }, () => {
            this.props.onHexGridItemsChange(this.state.gridItems);
        });
    }

    refreshGrid(refreshType: RefreshGrid) {
        if (this.props.hexagonGridSize !== 0) {
            switch (refreshType) {
                case RefreshGrid.Init:
                    getRandomData([], this.props.hexagonGridSize).then(result => {
                        this.initHexGrid(result);
                    });
                    break;
                case RefreshGrid.Update:
                    let hexCells = hexParamsToCells(this.state.hexagonItems);
                    getRandomData(hexCells, this.props.hexagonGridSize).then(result => {
                        this.updateHexGrid(result);
                    });
                    break;
                default:
                    throw new Error(`Unknown RefreshGrid type: "${RefreshGrid[refreshType]}: ${refreshType}"`);
            }
        }
    }

    render() {
        let { gridItems, hexagonItems } = this.state;
        return (
            <div>
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
        )
    }
}