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
        return (
            <div>
                <AskBid />
                <DealList dataSource={dataSource} />
            </div>
        );
    }
}

export default PriceBoard;