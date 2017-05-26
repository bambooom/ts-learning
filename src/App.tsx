/// <reference path="./interface.d.ts"/>

import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import { v4 as uuid } from 'uuid';
import notification from './components/notification';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
import PriceBoard from './components/PriceBoard/index';
// why cannot import from './components/PriceBoard' directly 
// implicit import index.tsx file;
import Position from './components/Position/index';
// import { showSuccess, showError } from './components/notification';
import { calulateAvgPrice, calulateCost, calulateQuantity } from './util/util';

// const initDataURL = 'https://jsonbin.org/bambooom/ts-trading-demo-data';
// backup 2: https://jsonblob.com/05710ed2-40f5-11e7-ae4c-390e75c055b2
const initDataURL = 'https://api.myjson.com/bins/10o6t1';

interface StateData {
  // maby null or an init data from data.json
  // kindof hard to define and waste of time?
  // tslint:disable-next-line
  data: any;
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

  executeBuyBid = (price: number, quantity: number, bidPrice5: PriceRow[]) => {
    const maybeBid = bidPrice5.filter(b => b.price <= price);
    let leftQuantity = quantity;
    const dealDones: Transaction[] = [];
    for (let i = 0; i < maybeBid.length; i++) {
      const quantityBidRow = maybeBid[i].lots * 100;
      const bidPrice = maybeBid[i].price;
      if (quantityBidRow >= leftQuantity) {
        const deal: Transaction = {
          time: new Date(),
          dealPrice: bidPrice,
          dealQuantity: leftQuantity,
        };
        dealDones.push(deal);
        if (quantityBidRow === leftQuantity) {
          bidPrice5.shift();
        } else {
          bidPrice5[0].lots = (quantityBidRow - leftQuantity) / 100;
        }
        leftQuantity = 0;
        break;
      } else {
        const deal: Transaction = {
          time: new Date(),
          dealPrice: bidPrice,
          dealQuantity: quantityBidRow,
        };
        dealDones.push(deal);
        leftQuantity -= quantityBidRow;
        bidPrice5.shift();
      }
    }
    return { dealDones, leftQuantity, leftBid: bidPrice5 };
  }

  onTrading: OnTrading = ({ price, quantity, direction, code, time }) => {
    const data = { ...this.state.data };
    const { askPrice5, bidPrice5, stockInfo, asset, orderList } = data;
    let transactionRecord = data.transactionRecord;
    const newOrder: Order = {
      orderId: uuid(),
      time,
      code,
      name: stockInfo.name,
      orderPrice: price,
      orderQuantity: quantity,
      direction,
      status: 'WAITING',
      dealedQuantity: 0,
      dealedAvgPrice: 0,
    };
    let buyRes: any;
    // 买入
    if (direction === 'BUY') {
      const ask5p = askPrice5.map((p: PriceRow) => p.price);
      const idx = ask5p.indexOf(price);
      if (idx > -1) {
        askPrice5[idx].lots += (quantity / 100);
        askPrice5[idx].brokers += 1;
        asset.cash -= price * quantity;
        asset.locked = price * quantity;
      } else if (price < ask5p[4].price) {
        asset.cash -= price * quantity;
        asset.locked = price * quantity;
      } else {
        buyRes = this.executeBuyBid(price, quantity, bidPrice5);
        newOrder.dealedAvgPrice = calulateAvgPrice(buyRes.dealDones);
        newOrder.dealedQuantity = calulateQuantity(buyRes.dealDones);
        asset.cash -= calulateCost(buyRes.dealDones);
        stockInfo.current = buyRes.dealDones[buyRes.dealDones.length - 1].dealPrice;
        asset.security[0].avgCostPrice = (asset.security[0].avgCostPrice * asset.security[0].quantity
          + calulateCost(buyRes.dealDones)) / (asset.security[0].quantity + calulateQuantity(buyRes.dealDones));
        asset.security[0].quantity += calulateQuantity(buyRes.dealDones);
        if (buyRes.leftQuantity === 0) {
          newOrder.status = 'DEAL_DONE';
        } else {
          asset.locked = price * buyRes.leftQuantity;
          askPrice5.unshift({
            price,
            lots: buyRes.leftQuantity / 100,
            brokers: 1,
          });
        }
        transactionRecord = buyRes.dealDones.concat(data.transactionRecord);
      }
    }
    orderList.push(newOrder);
    return this.setState({
      data: {
        askPrice5, bidPrice5: buyRes.leftBid, stockInfo, asset, orderList, transactionRecord
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
