import React from 'react';
import TodoList from './TodoList';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      completed: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const datas = this.state.data;
    const newTodo = this.refs.todo.value;

    if (!newTodo) {
      return;
    }

    datas.push({todo: newTodo});
    this.setState({data: datas});

    this.refs.todo.value = '';
  }

  handleComplete(checked) {
    let completed = this.state.completed;
    if (checked) {
      completed = completed + 1;
    } else {
      completed = completed - 1;
    }
    this.setState({completed});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={`todo`}/>
          <button type="submit">Submit</button>
        </form>
        <div className="btn">
          <button>All Lists: {this.state.data.length}</button>
          <button>Completed: {this.state.completed}</button>
        </div>
        {
          this.state.data.map((data, idx) => (
            <TodoList
              key={`todo${idx}`}
              idx={idx}
              todo={data.todo}
              onCompleted={this.handleComplete}
            />
          ))
        }
      </div>
    );
  }
}
Todo.propTypes = {
  todo: React.PropTypes.String
};

Todo.defaultProps = {
  data: [
    {todo: 'first todo'}
  ]
};

export default Todo;
