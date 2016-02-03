'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Todo from './components/Todo';
// import TabLayout from './components/ntabs';
import Dialog from './components/Dialog';
import Overlay from './components/Dialog/Overlay';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleDialogToggle = this.handleDialogToggle.bind(this);
  }
  handleDialogToggle() {
    this.setState({show: !this.state.show});
  }
  render() {
    return (
      <div>
        <button onClick={this.handleDialogToggle}>Open Dialog</button>
        {
          this.state.show && (
            <Dialog
              onClose={this.handleDialogToggle}
            />
          )
        }
        { this.state.show && <Overlay /> }
      </div>
    );
  }
}

ReactDOM.render(
  <Root />
, document.getElementById('app'));
