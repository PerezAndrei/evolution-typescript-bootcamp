import React from 'react';
import { IColorHSL } from '../Interfaces/interfaces';
import { HexagonProps } from '../Types/PropsTypes';
import { HexagonState } from '../Types/StateTypes';
import { getColorHSL } from '../Services/ColorService';
import unitPostfix from '../Helpers/UnitPostfix'

export class Hexagon extends React.Component<HexagonProps, HexagonState>{
    colorHSL: IColorHSL;

    constructor(props: HexagonProps) {
        super(props);
        this.colorHSL = getColorHSL();
    }

    get style(): object {
        return { top: this.props.params.top, left: this.props.params.left };
    }

    get color(): string {
        this.colorHSL.init(this.props.params.value);
        return this.props.valuable ? this.colorHSL.colorStringify : "none";
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
                    width={unitPostfix.addPixel(this.props.width)}
                    height={unitPostfix.addPixel(this.props.height)}
                    viewBox={this.props.viewBox}>
                    <polygon
                        fill={this.color}
                        stroke="#d9d9d9"
                        strokeWidth={this.props.strokeWidth}
                        points={this.props.points} />
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        display={this.props.valuable ? "block" : "none"}
                        className="heavy">{this.props.params.value}</text>
                </svg>
            </div>
        )
    }
}