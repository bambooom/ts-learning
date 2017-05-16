import * as React from 'react';
import DealList from './DealList';
import AskBid from './AskBid';

class PriceBoard extends React.Component<{}, null> {
    render() {
        // 假数据
        const dataSource = [
            { time: '09:41', dealPrice: 231.4, dealQuantity: 200 },
            { time: '09:45', dealPrice: 231.5, dealQuantity: 300 },
            { time: '09:47', dealPrice: 231.6, dealQuantity: 100 },
        ];
        const askpricemock = [
            { price: 231.8, lots: 1, brokers: 3 },
            { price: 231.7, lots: 2, brokers: 1 },
            { price: 231.6, lots: 5, brokers: 2 },
            { price: 231.5, lots: 4, brokers: 1 },
            { price: 231.4, lots: 8, brokers: 3 }];
        const bidpricemock = [
            { price: 231.9, lots: 5, brokers: 3 },
            { price: 232.0, lots: 3, brokers: 1 },
            { price: 232.2, lots: 2, brokers: 2 },
            { price: 232.3, lots: 4, brokers: 1 },
            { price: 232.4, lots: 7, brokers: 2 }];
        return (
            <div>
                <AskBid asks={askpricemock} bids={bidpricemock} />
                <DealList dataSource={dataSource} />
            </div>
        );
    }
}

export default PriceBoard;