import React from 'react';

/**
 * Tab component
 */
module.exports = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Tab.componentDidUpdate', prevProps, prevState);
  }
  handleClick(e) {
    console.log('handleClick', e.target, this.props.id);
    this.props.onTabContentChange(this.props.id);
  }
  handleRemove(e) {
    console.log('handleRemove', e);
    e.stopPropagation();
    this.props.onTabRemove(this.props.id);
  }
  render() {
    // console.log('Tab.render', this.props, this.state);
    return (
      <li
        className={this.state.selected ? 'active' : '' }
        key={this.props.id}
        id={this.props.idx}
        onClick={this.handleClick}
      >
        <span>{this.props.title}</span>
        <i className="fa fa-times" onClick={this.handleRemove}></i>
      </li>
    );
  }
};
