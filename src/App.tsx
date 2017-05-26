/// <reference path="./interface.d.ts"/>

import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import notification from './components/notification';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import PriceBoard from './components/PriceBoard/index';
import Position from './components/Position/index';
import { showSuccess } from './components/notification';
import { matchOrder, updateAsset } from './util/handlers';

// const initDataURL = 'https://jsonbin.org/bambooom/ts-trading-demo-data';
// backup 2: https://jsonblob.com/05710ed2-40f5-11e7-ae4c-390e75c055b2
const initDataURL = 'https://api.myjson.com/bins/1hfrz1';

interface StateData {
  data: any; // tslint:disable-line
}

class App extends React.Component<{}, object> {

  state: StateData = {
    data: null,
  };

  private notificationSystem: NotificationSystem.System;

  componentDidMount() {
    notification.init(this.notificationSystem);
    fetch(initDataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
        });
      });
  }

  onTrading: OnTrading = (order: Order) => {
    const data = { ...this.state.data };
    const { askPrice5, bidPrice5, stockInfo, asset, orderList, transactionRecord } = data;
    const result = matchOrder(order, bidPrice5, askPrice5);
    const dealed = result.order.dealed;
    const hasDeal = dealed.length > 0;
    if (hasDeal) {
      stockInfo.current = dealed[dealed.length - 1].dealPrice;
      dealed.forEach(deal => {
        transactionRecord.unshift(deal);
      });
    }
    const newAsset = updateAsset(result.order, asset);
    orderList.push(result.order);

    showSuccess('下单成功!');
    return this.setState({
      data: {
        askPrice5: result.askPrice5,
        bidPrice5: result.bidPrice5,
        stockInfo,
        asset: newAsset,
        orderList,
        transactionRecord
      }
    });
  }

  render() {
    const { data } = this.state;
    const notiStyle = {
      ActionWrapper: {
        DefaultStyle: {
          textAlign: 'center',
        }
      }
    };
    return (
      <div>
        <NotificationSystem
          ref={(ref: NotificationSystem.System) => this.notificationSystem = ref}
          style={notiStyle} />
        <AppBar />
        <section className="container grid-960">
          <section className="columns content-container">
            <div className="column col-sm-12 col-6">
              <PriceBoard
                stockInfo={data ? data.stockInfo : {}}
                askPrice5={data ? data.askPrice5 : []}
                bidPrice5={data ? data.bidPrice5 : []}
                transactionRecord={data ? data.transactionRecord : []}
              />
            </div>
            <div className="column col-sm-12 col-6">
              <Position
                onTrading={this.onTrading}
                orderList={data ? data.orderList : []}
                stockInfo={data ? data.stockInfo : {}}
                asset={data ? data.asset : {}} />
            </div>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
