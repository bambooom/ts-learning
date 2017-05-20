import * as React from 'react';

interface CapitalPos {
    totalAsset: number; // 总资产
    cash: number; // 现金
    security: number;  // 证券市值
    locked: number; // 冻结金额
}

interface Holding {
    code: string;
    name: string;
    quantity: number; // 持有股数
    avgCostPrice: number; // 成本价
    ProfitAndLossNum: number; // 盈亏金额
    ProfitAndLossPct: string; // 盈亏比例 n%
    marketValue: number; // 市值 
}

export interface Props {
    capital?: CapitalPos;
    security?: Holding[];
}

export default class HoldingPos extends React.Component<Props, object> {
    renderCapitalSection() {
        return (
            <div className="capital card-body">
                <div className="columns">
                    <div className="column col-6">
                        总资产: 103125
                        </div>
                    <div className="column col-6">
                        证券市值: 0
                        </div>
                    <div className="column col-6">
                        现金: 103125
                        </div>
                    <div className="column col-6">
                        冻结金额: 0
                        </div>
                </div>
            </div>
        );
    }

    render() {
        // const { capital, security } = this.props;
        const security: Holding[] = [
            {
                code: '00700.HK',
                name: '腾讯控股',
                quantity: 200,
                avgCostPrice: 229.4,
                ProfitAndLossNum: +480,
                ProfitAndLossPct: '+1.05%',
                marketValue: 46360,
            }
        ];
        const rows = security.map(stock => (
            <tr key={Math.random()}>
                <td>{stock.code}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.avgCostPrice}</td>
                <td>{stock.ProfitAndLossNum}</td>
                <td>{stock.ProfitAndLossPct}</td>
                <td>{stock.marketValue}</td>
            </tr>
        ));
        return (
            <div className="card holdings">
                <div className="card-header">
                    <div className="card-title">资产及持仓</div>
                </div>
                {this.renderCapitalSection()}
                <div className="security">
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
}