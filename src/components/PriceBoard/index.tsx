import * as React from 'react';
import DealList, { DealRow } from './DealList';
import AskBid, { PriceRow } from './AskBid';
import StockInfo from './StockInfo';

export interface Props {
    stockInfo: {
        code: string | null;
        name: string | null;
        current: number | null
    };
    askPrice5: PriceRow[];
    bidPrice5: PriceRow[];
    dealList: DealRow[];
}

class PriceBoard extends React.Component<Props, object> {
    render() {
        const { stockInfo, askPrice5, bidPrice5, dealList } = this.props;
        return (
            <div>
                <StockInfo
                    name={stockInfo.name}
                    code={stockInfo.code}
                    current={stockInfo.current} />
                <AskBid asks={askPrice5} bids={bidPrice5} />
                <DealList dealList={dealList} />
            </div>
        );
    }
}

export default PriceBoard;