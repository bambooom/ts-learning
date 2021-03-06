import * as React from 'react';
import { isTradingTime } from '../../util/util';

export default class StockInfo extends React.Component<StockBaseInfo, object> {
    render() {
        const now = new Date();
        const time = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        let label;
        if (isTradingTime(now)) {
            label = <span className="label label-primary">正在交易</span>;
        } else {
            label = <span className="label">已结束交易</span>;
        }
        const { name, code, current } = this.props;
        const displayName: string = name ? name : '';
        const displayCode: string = code ? code : '';
        const displayCurrent: string = (current ? current : 0).toFixed(2);
        return (
            <div className="card stock-info">
                <div className="card-header">
                    <div className="card-title col-oneline columns">
                        <div className="col-9">
                            {`${displayName} (${displayCode})`}
                        </div>
                        <div className="col-3">{displayCurrent}</div>
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