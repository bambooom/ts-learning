import * as React from 'react';

export interface Props {
    asks?: {
        price: number,
        lots: number,
    }[];
    bids?: {
        price: number,
        lots: number,
    }[];
}

export default class AskBid extends React.Component<Props, object> {
    render() {
        return (
            <div className="columns col-oneline" style={{ margin: 0 }}>
                <div className="card col-6">
                    <div className="card-subtitle">
                        Ask Price
                    </div>
                    <div className="card-title ask-bid ask">
                        231.8
                    </div>
                </div>
                <div className="card col-6">
                    <div className="card-subtitle">
                        Bid prices
                    </div>
                    <div className="card-title ask-bid bid">
                        231.9
                    </div>
                </div>
            </div>
        );
    }
}