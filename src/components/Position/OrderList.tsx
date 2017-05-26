import * as React from 'react';

export interface Props {
    orderList?: Order[];
}

export default class OrderList extends React.Component<Props, object> {
    readonly ORDER_STATUS = {
        'WAITING': '等待成交',
        'DEAL_DONE': '已完成',
        'CANCELED': '已取消',
        'EXPIRED': '已过期'
    };

    readonly DIRECTION = {
        'BUY': '买入',
        'SELL': '卖出',
    };

    render() {
        const { orderList } = this.props;
        const rows = orderList && orderList.length > 0 ?
            orderList.map(order => (
                <tr key={order.orderId}>
                    <td>{this.ORDER_STATUS[order.status]}</td>
                    <td>{this.DIRECTION[order.direction]}</td>
                    <td>{order.code}</td>
                    <td>{order.name}</td>
                    <td>{order.orderPrice}</td>
                    <td>{order.orderQuantity}</td>
                    <td>{`${order.dealedQuantity}@${order.dealedAvgPrice.toFixed(2)}`}</td>
                    <td>{order.time.toLocaleTimeString()}</td>
                </tr>
            )) : [];
        return (
            <div className="card order">
                <div className="card-header">
                    <div className="card-title">
                        交易记录
                    </div>
                </div>
                <div className="order-table">
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