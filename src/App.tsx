/// <reference path="./interface.d.ts"/>

import * as React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
import PriceBoard from './components/PriceBoard/index';
import HoldingPos from './components/HoldingPos';
import Trading from './components/Trading';
import OrderList from './components/OrderList';
// why cannot import from './components/PriceBoard' directly 
// implicit import index.tsx file;

const initDataURL = 'https://jsonbin.org/bambooom/ts-trading-demo-data';

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

  componentDidMount() {
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
    return (
      <div>
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
              <HoldingPos
                stockInfo={data ? data.stockInfo : {}}
                asset={data ? data.asset : {}} />
              <Trading />
              <OrderList />
            </div>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
