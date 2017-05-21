import * as React from 'react';

interface order {
    status: string;
    direction: string;
    code: string;
    name: string;
    orderPrice: number;
    orderQuantity: number;
    dealed: string;
    orderTime: string;
}

export interface Props {
    orderList?: order[];
}

export default class TradingHistory extends React.Component<Props, object> {
    render() {
        const { orderList } = this.props;
        const rows = orderList && orderList.length > 0 ?
            orderList.map(order => (
                <tr key={Math.random()}>
                    <td>{order.status}</td>
                    <td>{order.direction}</td>
                    <td>{order.code}</td>
                    <td>{order.name}</td>
                    <td>{order.orderPrice}</td>
                    <td>{order.orderQuantity}</td>
                    <td>{order.dealed}</td>
                    <td>{order.orderTime}</td>
                </tr>
            )) : [];
        return (
            <div className="card history">
                <div className="card-header">
                    <div className="card-title">
                        交易记录
                    </div>
                </div>
                <div className="history-table">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>交易状态</th>
                                <th>方向</th>
                                <th>代码</th>
                                <th>名称</th>
                                <th>订单价格</th>
                                <th>订单数量</th>
                                <th>已成交@均价</th>
                                <th>下单时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}