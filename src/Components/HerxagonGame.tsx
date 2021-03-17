import React from "react";
import constants from "../Helpers/Constants";
import { HexagonParams } from "../Types/HexagonTypes";
import { HexagonGameProps } from "../Types/PropsTypes";
import { HexagonGameState } from "../Types/StateTypes";
import { GameControl } from "./GameControl";
import { GameStatus } from "./GameStatus";
import { HexagonGrid } from "./HexagonGrid";

export class HexagonGame extends React.Component<HexagonGameProps, HexagonGameState> {
    headerStyle: object = { height: constants.headerHeight, width: constants.containerWidth };
    contentStyle: object = { height: constants.contentHeight, width: constants.containerWidth };
    footerStyle: object = { height: constants.footerrHeight, width: constants.containerWidth };

    componentDidMount() {
        console.log("HexagonGame componentDidMount");
    }

    componentDidUpdate() {
        console.log("HexagonGame componentDidUpdate");
    }

    constructor(props: HexagonGameProps) {
        super(props);
        this.state = {
            gridItems: [],
            hexagonGridSize: 0
        }
        this.hexGridSizeChangeHandler = this.hexGridSizeChangeHandler.bind(this);
        this.hexGridItemsChangeHandler = this.hexGridItemsChangeHandler.bind(this);
    }

    hexGridSizeChangeHandler(hexagonGridSize: number) {
        console.log("onHexGridSizeChange", hexagonGridSize);
        if (this.state.hexagonGridSize !== hexagonGridSize)
            this.setState({ hexagonGridSize });
    }

    hexGridItemsChangeHandler(gridItems: Array<HexagonParams>) {
        console.log("hexGridItemsChangeHandler", gridItems);
        this.setState({ gridItems });
    }

    render() {
        let { gridItems, hexagonGridSize } = this.state;
        return (
            <div className="hexagon-container">
                <div style={this.headerStyle} className="header">
                    <GameControl onHexGridSizeChange={this.hexGridSizeChangeHandler} />
                </div>
                <div style={this.contentStyle} className="content">
                    <HexagonGrid
                        onHexGridItemsChange={this.hexGridItemsChangeHandler}
                        hexagonGridSize={hexagonGridSize}
                    />
                </div>
                <div style={this.footerStyle} className="footer">
                    <GameStatus gridItems={gridItems} />
                </div>
            </div>
        )
    }
}