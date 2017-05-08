import * as React from 'react';
import AppBar from './components/AppBar';

class App extends React.Component<{}, null> {
  render() {
    return (
      <div>
        <AppBar/>
        <p>Hello World</p>
      </div>
    );
  }
}

export default App;
