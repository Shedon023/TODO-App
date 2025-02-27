import './TaskList.css';
import Task from './Task';
import { Component } from 'react';
import PropTypes from 'prop-types';

const getFilteredTasks = (tasks, currentFilter) => {
  switch (currentFilter) {
    case 'active':
      return tasks.filter((el) => !el.completed);
    case 'completed':
      return tasks.filter((el) => el.completed);
    default:
      return tasks;
  }
};

export default class TaskList extends Component {
  static defaultProps = {
    onDelete: (id) => {},
  };
  static propTypes = {
    onDelete: PropTypes.number, // Prop Types
  };

  render() {
    const { tasks, onDelete, onToggleCompleted, activeFilter } = this.props;
    const contentToRender = getFilteredTasks(tasks, activeFilter);

    return (
      <>
        <ul className="todo-list">
          {contentToRender.map(
            ({ id, description, created, completed, editingValue }) => (
              <Task
                key={id}
                id={id}
                description={description}
                created={created}
                completed={completed}
                editingValue={editingValue || ''}
                onDeleted={onDelete}
                onToggleCompleted={onToggleCompleted}
              />
            )
          )}
        </ul>
      </>
    );
  }
}
