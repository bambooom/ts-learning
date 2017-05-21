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

class App extends React.Component<{}, null> {
  render() {
    return (
      <div>
        <AppBar />
        <section className="container grid-960">
          <section className="columns content-container">
            <div className="column col-sm-12 col-6">
              <PriceBoard />
            </div>
            <div className="column col-sm-12 col-6">
              <HoldingPos />
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
