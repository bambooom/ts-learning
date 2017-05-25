/// <reference path="./interface.d.ts"/>

import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';
import notification from './components/notification';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
import PriceBoard from './components/PriceBoard/index';
// why cannot import from './components/PriceBoard' directly 
// implicit import index.tsx file;
import Position from './components/Position/index';

// const initDataURL = 'https://jsonbin.org/bambooom/ts-trading-demo-data';
// backup 2: https://jsonblob.com/05710ed2-40f5-11e7-ae4c-390e75c055b2
const initDataURL = 'https://api.myjson.com/bins/1bm2l9';

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
    // fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(initDataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
        });
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
