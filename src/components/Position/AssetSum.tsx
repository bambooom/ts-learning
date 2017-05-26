import * as React from 'react';

export interface Props {
    asset: Asset;
    stockInfo: StockBaseInfo;
}

function sumSecuritiesMarketValue(securities: HoldingSecurity[], current: number | null): number {
    if (!securities || !current || securities.length === 0) {
        return 0;
    }
    return securities.reduce((pv, cv) => pv + current * cv.quantity, 0);
}

export default class AssetSum extends React.Component<Props, object> {
    renderCapitalSection() {
        const { asset, stockInfo } = this.props;
        const cash = asset.cash ? asset.cash : 0;
        const locked = asset.locked ? asset.locked : 0;
        const securityInTotal = sumSecuritiesMarketValue(asset.security, stockInfo.current);
        const totalAsset = cash + securityInTotal;
        return (
            <div className="card capital">
                <div className="card-header">
                    <div className="card-title">资产</div>
                </div>
                <div className="card-body">
                    <div className="columns">
                        <div className="column col-6">
                            总资产: {totalAsset.toFixed(2)}
                        </div>
                        <div className="column col-6">
                            证券市值: {securityInTotal.toFixed(2)}
                        </div>
                        <div className="column col-6">
                            现金: {cash.toFixed(2)}
                        </div>
                        <div className="column col-6">
                            冻结金额: {locked.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSecuritySection() {
        const { asset, stockInfo } = this.props;
        const security = asset.security || [];
        const rows = security.map(stock => {
            const current = stockInfo.current || 0;
            const profitAndLossNum = (current - stock.avgCostPrice) * stock.quantity;
            const profitAndLossPct = (current - stock.avgCostPrice) / stock.avgCostPrice;
            const marketValue = current * stock.quantity;
            return (
                <tr key={Math.random()}>
                    <td>{stock.code}</td>
                    <td>{stock.name}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.avgCostPrice.toFixed(2)}</td>
                    <td>{profitAndLossNum.toFixed(2)}</td>
                    <td>{`${(profitAndLossPct * 100).toFixed(2)} %`}</td>
                    <td>{marketValue.toFixed(2)}</td>
                </tr>
            );
        });
        return (
            <div className="card security">
                <div className="card-header">
                    <div className="card-title">持仓</div>
                </div>
                <div className="security-table">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>代号</th>
                                <th>名称</th>
                                <th>持有数量</th>
                                <th>成本价</th>
                                <th>盈亏金额</th>
                                <th>盈亏比例</th>
                                <th>市值</th>
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

    render() {
        return (
            <div className="card holdings">
                {this.renderCapitalSection()}
                {this.renderSecuritySection()}
            </div>
        );
    }
}