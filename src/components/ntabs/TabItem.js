import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={this.props.selectedId == this.props.id? 'active' : ''} 
        id={this.props.id} key={this.props.id} onClick={this.props.onTabFocus} >
        <span>{this.props.title}</span>
        <i className="fa fa-times" onClick={this.props.onTabRemove}></i>
      </li>
    );
  }
}
