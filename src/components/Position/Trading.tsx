import * as React from 'react';
import { showError } from '../notification';
import { orderConstructor } from '../../util/util';

export interface Props {
    asset: Asset;
    stockInfo: StockBaseInfo;
    onTrading: OnTrading;
}

export default class Trading extends React.Component<Props, object> {
    state = {
        code: '',
        price: 0,
        quantity: 0,
    };

    validate = (): string => {
        const { price, quantity, code } = this.state;
        if (!code || !price || !quantity) {
            return '表单没填完整呐!';
        }
        const { current } = this.props.stockInfo;
        if (Math.abs(current - price) > 0.2 * 10) {
            return '不能超过现价 10 个价位呐! (此处一个价位 0.2)';
        }

        return '';
    }

    onSubmitBuy = () => {
        const invalidInput = this.validate();
        if (invalidInput) {
            showError(invalidInput);
            return;
        }
        const { price, quantity, code } = this.state;
        const { cash } = this.props.asset;
        const need = price * quantity;
        if (need > cash) {
            showError('不够钱买呐! 减少数量或者降低价格吧~');
            return;
        }
        const order = orderConstructor(price, quantity, code, 'BUY');
        this.props.onTrading(order);
    }

    onSubmitSell = () => {
        const invalidInput = this.validate();
        if (invalidInput) {
            showError(invalidInput);
            return;
        }
        const { price, quantity, code } = this.state;
        const quantityHolding = this.props.asset.security[0].quantity;
        if (quantity > quantityHolding) {
            showError('你持有的股数不够呐!');
            return;
        }
        const order = orderConstructor(price, quantity, code, 'SELL');
        this.props.onTrading(order);
    }

    render() {

        return (
            <div className="card trading">
                <div className="card-header">
                    <div className="card-title">
                        交易
                    </div>
                </div>
                <div className="card-body">
                    <form className="form-horizontal" id="trading-action">
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="stock-code">代码</label>
                            </div>
                            <div className="col-9">
                                <select className="form-select" id="stock-code"
                                    onChange={(e) => this.setState({ code: e.target.value })}>
                                    <option>选择股票代码</option>
                                    <option value="00700.HK">00700.HK 腾讯控股</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="trading-price">价格</label>
                            </div>
                            <div className="col-9">
                                <input
                                    onChange={(e) => this.setState({ price: parseFloat(e.target.value) })}
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
                                        onChange={(e) => this.setState({ quantity: parseFloat(e.target.value) })}
                                        className="form-input" type="number"
                                        min={100} id="trading-quantity" step={100} />
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
                                <button
                                    className="btn btn-primary" type="button"
                                    onClick={this.onSubmitBuy}>买入</button>
                                <button
                                    className="btn btn-primary" type="button"
                                    onClick={this.onSubmitSell}>卖出</button>
                                <button className="btn btn-link" type="reset">取消</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}