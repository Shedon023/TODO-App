import './Task.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    isEditing: false,
    editedDescription: this.props.description, // исходное описание
  };

  // переключение режима редактирования
  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  // сохранение изменений при  нажатии enter
  handleSave = () => {
    const { id, onEdit } = this.props;
    const { editedDescription } = this.state;

    // сохранить
    if (editedDescription !== this.props.description) {
      onEdit(id, editedDescription);
    }

    this.setState({ isEditing: false });
  };

  handleChange = (event) => {
    this.setState({ editedDescription: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSave();
    } else if (event.key === 'Escape') {
      this.setState({
        isEditing: false,
        editedDescription: this.props.description, // отмена редактирования при  "escape"
      });
    }
  };

  render() {
    const { description, created, completed, onDeleted, onToggleCompleted } =
      this.props;
    const { isEditing, editedDescription } = this.state;

    const taskCn = `todo-list-item ${completed ? 'completed' : ''}`;

    return (
      <li className={taskCn}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(this.props.id)}
          />
          <label>
            {isEditing ? (
              <input
                type="text"
                className="editing"
                value={editedDescription}
                onChange={this.handleChange}
                onBlur={this.handleSave} // cохраняем при потере фокуса
                onKeyDown={this.handleKeyPress} // cохраняем при нажатии Enter
                autoFocus
              />
            ) : (
              <>
                <span className="description">{description}</span>
                <span className="created">{created}</span>
              </>
            )}
          </label>
          <button
            className="icon icon-edit"
            onClick={this.handleEditClick}
          ></button>
          <button
            onClick={() => onDeleted(this.props.id)}
            className="icon icon-destroy"
          ></button>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Task.defaultProps = {
  description: '',
  created: '',
  completed: false,
};
