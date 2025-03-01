import './FooterFilter.css';
import { Component } from 'react';

export default class FooterFilter extends Component {
  render() {
    const { setFilter, activeFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <label>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={activeFilter === 'all'}
              onChange={() => setFilter('all')}
            />
            All
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="filter"
              value="active"
              checked={activeFilter === 'active'}
              onChange={() => setFilter('active')}
            />
            Active
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="filter"
              value="completed"
              checked={activeFilter === 'completed'}
              onChange={() => setFilter('completed')}
            />
            Completed
          </label>
        </li>
      </ul>
    );
  }
}
