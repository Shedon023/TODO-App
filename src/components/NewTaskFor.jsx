import './NewTaskFor.css';
import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.label}
            onChange={this.onLabelChange}
            autoFocus
          ></input>
        </form>
      </header>
    );
  }
}
