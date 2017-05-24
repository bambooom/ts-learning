import * as React from 'react';

export interface Props {
    asks: PriceRow[];
    bids: PriceRow[];
}

export default class AskBid extends React.Component<Props, object> {
    renderHalf(data: PriceRow[], isAsk: boolean = true) {
        const title: string = isAsk ? '买盘五档' : '卖盘五档';
        let className: string = 'card-body ask-bid ';
        if (isAsk) {
            className += 'ask';
        } else {
            className += 'bid';
        }
        const rows = data.map(ds => {
            const price = ds.price ? ds.price.toFixed(2) : '-';
            const quantity = ds.lots ? ds.lots * 100 : 0;
            return (
                <tr key={Math.random()}>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td className="brokers">{ds.brokers}</td>
                </tr>
            );
        });
        return (
            <div className="card col-6">
                <div className="card-subtitle">
                    {title}
                </div>
                <div className={className}>
                    <table className="table table-striped table-hover">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        const { asks, bids } = this.props;
        return (
            <div className="columns col-oneline" style={{ margin: 0 }}>
                {this.renderHalf(asks)}
                {this.renderHalf(bids, false)}
            </div>
        );
    }
}