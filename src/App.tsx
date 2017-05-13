import * as React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PriceBoard from './components/PriceBoard/index';
// why cannot import from './components/PriceBoard' directly 
// implicit import index.tsx file;

class App extends React.Component<{}, null> {
  render() {
    return (
      <div>
        <AppBar />
        <section className="container grid-960">
          <section className="columns">
            <div className="column col-xs-12 col-md-6">
              <SearchBar />
              <PriceBoard />
            </div>
            <div className="column col-xs-12 col-md-6">
              <p>World</p>
            </div>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
