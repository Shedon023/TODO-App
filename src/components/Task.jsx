import './Task.css';
import { Component } from 'react';

export default class Task extends Component {
  state = {};

  render() {
    const {
      id,
      description,
      created,
      onDeleted,
      onToggleCompleted,
      completed,
    } = this.props;

    const classNames = `todo-list-item ${completed ? 'completed' : ''}`;

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            onClick={() => onDeleted(id)}
            className="icon icon-destroy"
          ></button>
        </div>
      </li>
    );
  }
}
