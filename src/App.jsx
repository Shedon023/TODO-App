import './App.css';
import NewTaskForm from './components/NewTaskFor';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class App extends Component {
  maxId = 100;

  state = {
    tasks: [
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Drink Cum'),
    ],
    filter: '',
  };

  setFilter = (filter) => {
    this.setState(() => {
      return {
        filter,
      };
    });
  };

  createTodoItem(label) {
    return {
      id: this.maxId++,
      description: label,
      created: formatDistanceToNow(new Date()) + ' ago',
      completed: false,
    };
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const oldItem = tasks[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1),
      ];
      return {
        tasks: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  addItem = (text) => {
    const newTask = this.createTodoItem(text);
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((el) => el.completed === false),
    }));
  };

  render() {
    const doneCount = this.state.tasks.filter(
      (el) => el.completed === true
    ).length;
    const todoCount = this.state.tasks.length - doneCount;

    return (
      <div className="app-wrapper">
        <section className="todoapp">
          <NewTaskForm onItemAdded={this.addItem} />
          <section className="main">
            <TaskList
              tasks={this.state.tasks}
              onDelete={this.deleteItem}
              onToggleCompleted={this.onToggleCompleted}
              activeFilter={this.state.filter}
            />
            <Footer
              toDo={todoCount}
              clearCompleted={this.clearCompleted}
              setFilter={this.setFilter}
              activeFilter={this.state.filter}
            />
          </section>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

App.defaultProps = {
  tasks: [],
  filter: '',
};
