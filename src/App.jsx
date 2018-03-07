import React, { Component } from 'react';
import {Column} from './Column';

class App extends Component {
  render() {
    return (
      <div>
        <Column headerName="Todo" />
        <Column headerName="In Progress" />
        <Column headerName="Done" />
      </div>
    );
  }
}

export default App;
