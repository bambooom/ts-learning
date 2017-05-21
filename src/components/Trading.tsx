import * as React from 'react';

export interface Props {

}

export default class Trading extends React.Component<Props, object> {
    state = {
        price: 0,
        quantity: 0,
    };

    render() {
        return (
            <div className="card trading">
                <div className="card-header">
                    <div className="card-title">
                        交易
                    </div>
                </div>
                <div className="card-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="stock-code">代码</label>
                            </div>
                            <div className="col-9">
                                <select className="form-select" id="stock-code">
                                    <option>选择股票代码</option>
                                    <option value="700">00700.HK 腾讯控股</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="trading-price">价格</label>
                            </div>
                            <div className="col-9">
                                <input
                                    onChange={(e) => this.setState({ price: e.target.value })}
                                    className="form-input" type="number"
                                    id="trading-price" step={0.2} min={0} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="trading-quantity">数量</label>
                            </div>
                            <div className="col-9">
                                <div className="input-group">
                                    <input
                                        onChange={(e) => this.setState({ quantity: e.target.value })}
                                        className="form-input" type="number"
                                        min={0} id="trading-quantity" step={100} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" >金额</label>
                            </div>
                            <div className="col-9">
                                <p className="trading-sum">HK$ {(this.state.price * this.state.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3" />
                            <div className="col-9">
                                <button className="btn btn-primary" type="submit">买入</button>
                                <button className="btn btn-primary" type="submit">卖出</button>
                                <button className="btn btn-link" type="reset">取消</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}