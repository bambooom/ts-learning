import * as React from 'react';

export interface Props {
    code?: string;
    name?: string;
    current?: number;
}

export default class StockInfo extends React.Component<Props, object> {
    render() {
        const now = new Date();
        const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        let label;
        if (isTradingTime(now)) {
            label = <span className="label label-primary">正在交易</span>;
        } else {
            label = <span className="label">已结束交易</span>;
        }
        return (
            <div className="card stock-info">
                <div className="card-header">
                    <div className="card-title col-oneline columns">
                        <div className="col-9">
                            {`${this.props.name} (${this.props.code})`}
                        </div>
                        <div className="col-3">{this.props.current}</div>
                    </div>
                    <div className="card-subtitle">
                        {time}
                        {label}
                    </div>
                </div>
            </div>
        );
    }
}

function isTradingTime(now: Date): boolean {
    const day: number = now.getDay();
    if (day === 6 || day === 7) {
        return false;
    }
    const hour: number = now.getHours();
    if (hour < 9 || hour > 16 || hour === 12) {
        return false;
    }
    return true;
}