/*
 * Created by zhuzi on Wed May 24 2017
 */

import * as React from 'react';
import AssetSum from './AssetSum';
import Trading from './Trading';
import OrderList from './OrderList';

export interface Props {
    asset: Asset;
    stockInfo: StockBaseInfo;
    onTrading: OnTrading;
    orderList: Order[];
}

export default class Position extends React.Component<Props, object> {

    render() {
        const { asset, stockInfo, orderList } = this.props;
        return (
            <div>
                <AssetSum asset={asset} stockInfo={stockInfo} />
                <Trading asset={asset} stockInfo={stockInfo} onTrading={this.props.onTrading} />
                <OrderList orderList={orderList} />
            </div>
        );
    }
}