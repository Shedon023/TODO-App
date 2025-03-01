import './Task.css';
import { Component } from 'react';

export default class Task extends Component {
  state = {
    isEditing: false,
    editedDescription: this.props.description, // начальное описание
  };

  // переключение режима редактирования
  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  // сохранение изменений при потере фокуса или нажатии enter
  handleSave = () => {
    const { id, onEdit } = this.props;
    const { editedDescription } = this.state;

    // Сохраняем изменения, если они есть
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
        editedDescription: this.props.description,
      });
    }
  };

  render() {
    const { description, created, completed, onDeleted, onToggleCompleted } =
      this.props;
    const { isEditing, editedDescription } = this.state;

    const classNames = `todo-list-item ${completed ? 'completed' : ''}`;

    return (
      <li className={classNames}>
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
