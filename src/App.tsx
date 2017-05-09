import * as React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer';

class App extends React.Component<{}, null> {
  render() {
    return (
      <div>
        <AppBar />
        <section className="container grid-960">
          <section className="columns">
            <p>hello world</p>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
