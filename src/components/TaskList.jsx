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
  render() {
    const { tasks, onDelete, onToggleCompleted, activeFilter, onEdit } =
      this.props;
    const contentToRender = getFilteredTasks(tasks, activeFilter);

    return (
      <ul className="todo-list">
        {contentToRender.map(({ id, description, created, completed }) => (
          <Task
            key={id}
            id={id}
            description={description}
            created={created}
            completed={completed}
            onDeleted={onDelete}
            onToggleCompleted={onToggleCompleted}
            onEdit={onEdit}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
  activeFilter: '',
};
