import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
    console.log('props', props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log('checkbox click --', this.state.done);

    this.props.onCompleted(e.target.checked);
    this.setState({done: e.target.checked});
  }
  render() {
    const doneStyle = {
      textDecoration: 'line-through',
      color: '#cdcdcd'
    };
    return (
      <li key={this.props.id} style={this.state.done ? doneStyle : {}}>
        <label htmlFor={'chk' + this.props.idx}>
          <input type="checkbox" id={'chk' + this.props.idx} onClick={this.handleClick}/>
          {this.props.todo}
        </label>
      </li>
    );
  }
}
export default TodoList;
