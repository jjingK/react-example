import React from 'react';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dialog">
        <header className="dialog-header">
          <i className="fa fa-times" onClick={this.props.onClose}></i>
          <h4 className="title">Title</h4>
        </header>
        <div className="dialog-body">
          This is content.
        </div>
        <footer className="dialog-footer">
          <button onClick={this.props.onClose}>Close</button>
          <button>Save</button>
        </footer>
      </div>
    );
  }
}
export default Dialog;
