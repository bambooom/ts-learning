import * as React from 'react';
import TransactionRecord from './TransactionRecord';
import AskBid from './AskBid';
import StockInfo from './StockInfo';

export interface Props {
    stockInfo: StockBaseInfo;
    askPrice5: PriceRow[];
    bidPrice5: PriceRow[];
    transactionRecord: Transaction[];
}

class PriceBoard extends React.Component<Props, object> {
    render() {
        const { stockInfo, askPrice5, bidPrice5, transactionRecord } = this.props;
        return (
            <div>
                <StockInfo
                    name={stockInfo.name}
                    code={stockInfo.code}
                    current={stockInfo.current} />
                <AskBid asks={askPrice5} bids={bidPrice5} />
                <TransactionRecord transactionRecord={transactionRecord} />
            </div>
        );
    }
}

export default PriceBoard;