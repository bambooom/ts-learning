import * as React from 'react';
import { lastTradingTime } from '../../util/util';

export interface Props {
    transactionRecord: Transaction[];
}

export default class TransactionRecord extends React.Component<Props, object> {
    render() {
        const { transactionRecord } = this.props;
        const now = new Date();
        let lastTrading: Date = lastTradingTime(now);
        const rows = transactionRecord.map(ds => {
            lastTrading.setSeconds(lastTrading.getSeconds() - 1);
            return (
                <tr key={Math.random()}>
                    <td>{lastTrading.toLocaleTimeString()}</td>
                    <td>{ds.dealPrice}</td>
                    <td>{ds.dealQuantity}</td>
                </tr>
            );
        });
        return (
            <div className="card deal-list">
                <div className="card-header">
                    <div className="card-title">
                        逐笔成交记录
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>成交时间</th>
                            <th>成交价格</th>
                            <th>成交股数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}