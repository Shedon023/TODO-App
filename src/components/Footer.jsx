import './Footer.css';
import FooterFilter from './FooterFilter';
import { Component } from 'react';

export default class Footer extends Component {
  render() {
    const { toDo, clearCompleted, setFilter, activeFilter } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{toDo} left</span>
        <FooterFilter setFilter={setFilter} activeFilter={activeFilter} />
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
