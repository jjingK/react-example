import React from 'react';
import TodoList from './TodoList';
import DefaultProps from './item';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      visible: 'All'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleVisible = this.handleVisible.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const datas = this.state.data;
    const newTodo = this.refs.todo.value;

    if (!newTodo) {
      return;
    }

    datas.push({todo: newTodo, completed: false});
    this.setState({data: datas});

    this.refs.todo.value = '';
  }

  handleComplete(idx) {
    console.log('handleComplete', idx);
    const todo = this.state.data[idx];
    todo.completed = !todo.completed;

    console.log(this.state.data);
    this.setState({data: this.state.data});
  }

  handleVisible(e) {
    console.log('handleVisible', e.target.id);
    this.setState({visible: e.target.id});
  }

  render() {
    console.log('Todo.render', this.state);
    const btnActive = {
      background: '#1da1df',
      color: 'white'
    };
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={`todo`}/>
          <button type="submit">Submit</button>
        </form>
        <div className="btn">
          <button
            id={`All`}
            onClick={this.handleVisible}
            style={this.state.visible === 'All' ? btnActive : {}}
          >
            All
          </button>
          <button
            id={`Active`}
            onClick={this.handleVisible}
            style={this.state.visible === 'Active' ? btnActive : {}}
          >
            Active
          </button>
          <button
            id={`Completed`}
            onClick={this.handleVisible}
            style={this.state.visible === 'Completed' ? btnActive : {}}
          >
            Completed
          </button>
          <button>Clear Completed</button>
        </div>
        {
          this.state.data.filter((data) => {
            switch (this.state.visible) {
              case 'Active':
                return !data.completed;
              case 'Completed':
                return data.completed;
              default:
                return data;
            }
          }).map((data, idx) => (
            <TodoList
              key={`todo${idx}`}
              idx={idx}
              todo={data.todo}
              completed={data.completed}
              onCompleted={this.handleComplete}
            />
          ))
        }
      </div>
    );
  }
}
Todo.defaultProps = DefaultProps;
export default Todo;
