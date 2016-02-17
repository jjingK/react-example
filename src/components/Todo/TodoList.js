import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   done: false
    // };
    // console.log('props', props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log('checkbox click --', e.target.id);
    const checkedId = e.target.id;
    this.props.onCompleted(checkedId);
    // this.setState({done: e.target.checked});
  }
  render() {
    console.log('TodoList.render', this.state, this.props);
    const doneStyle = {
      textDecoration: 'line-through',
      color: '#cdcdcd'
    };
    return (
      <li
        key={this.props.id}
        id={this.props.idx}
        style={this.props.completed ? doneStyle : {}}
        onClick={this.handleClick}
      >
          {this.props.todo}
      </li>
    );
  }
}
export default TodoList;
