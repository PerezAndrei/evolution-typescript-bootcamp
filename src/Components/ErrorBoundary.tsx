import React from "react";
import { ErrorBoundaryProps } from "../Types/PropsTypes";
import { ErrorBoundaryState } from "../Types/StateTypes";

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    //test dev changes
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("hexagonGame ErrorBoundary", { error, info });
    }

    render() {
        if (this.state.hasError) {
            return <div className="game-error">
                <div>
                    <i className="fas fa-bug fa-10x"></i>
                </div>
                <div>
                    <h3>Something went wrong</h3>
                </div>
            </div>;
        }
        else {
            return this.props.children;
        }
    }
}