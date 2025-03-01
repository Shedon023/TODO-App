import './App.css';
import NewTaskForm from './components/NewTaskFor';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    tasks: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Drink Tea'),
      this.createTodoItem('Drink Milk'),
    ],
    filter: '',
  };

  // загружает сохраненный стейт из ЛС при монтировании
  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem('todoAppState'));
    if (savedState) {
      this.setState(savedState);
    }
    window.addEventListener('storage', this.handleStorageChange); // добавляем слушатель эвентов для авто синхронизации
  }
  // сохраняет стейтс в ЛС
  componentWillUnmount() {
    this.saveStateToLocalStorage();
    window.removeEventListener('storage', this.handleStorageChange); // убираем слушатель изменений
  }

  // Хэндл для синхронизации состояния
  handleStorageChange = (event) => {
    if (event.key === 'todoAppState') {
      const savedState = JSON.parse(event.newValue);
      if (savedState) {
        this.setState(savedState);
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      this.saveStateToLocalStorage();
    }
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem('todoAppState', JSON.stringify(this.state));
  };

  ///////////////////////////////////////////////////////////////////////////

  setFilter = (filter) => {
    this.setState({ filter });
  };

  createTodoItem(label) {
    return {
      id: nanoid(),
      description: label,
      created: formatDistanceToNow(new Date()) + ' ago',
      completed: false,
    };
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks];
      newTasks[idx] = { ...newTasks[idx], completed: !newTasks[idx].completed };
      return { tasks: newTasks };
    });
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  addItem = (text) => {
    const newTask = this.createTodoItem(text);
    this.setState(
      (prevState) => ({
        tasks: [...prevState.tasks, newTask],
      })
      // this.saveStateToLocalStorage
    );
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }));
  };

  onEditTask = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const updatedTasks = [...tasks];
      updatedTasks[idx] = { ...updatedTasks[idx], description: newDescription };
      return { tasks: updatedTasks };
    });
  };

  render() {
    const doneCount = this.state.tasks.filter((el) => el.completed).length;
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
              onEdit={this.onEditTask}
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
