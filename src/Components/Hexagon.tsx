import React from 'react';
import { HexagonProps } from '../Types/PropsTypes';
import { HexagonState } from '../Types/StateTypes';

export class Hexagon extends React.Component<HexagonProps, HexagonState>{

    constructor(props: HexagonProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    get style(): object {
        return { top: this.props.params.top, left: this.props.params.left };
    }

    render() {
        return (
            <div className="hex-item"
                style={this.style}
                data-value={this.props.params.value}
                data-x={this.props.params.x}
                data-y={this.props.params.y}
                data-z={this.props.params.z}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width={this.props.width.toPixels()}
                    height={this.props.height.toPixels()}
                    viewBox={this.props.viewBox}>
                    <polygon
                        fill="none"
                        stroke="#d9d9d9"
                        strokeWidth={this.props.strokeWidth}
                        points={this.props.points} />
                    <text
                        x="50%"
                        y="50%"
                        dominant-baseline="middle"
                        text-anchor="middle"
                        className="heavy">{this.props.params.value||"00"}</text>
                </svg>
            </div>
        )
    }
}