import './FooterFilter.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class FooterFilter extends Component {
  render() {
    const { setFilter, activeFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => setFilter('all')}
            className={activeFilter === 'all' ? 'selected' : ''}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter('active')}
            className={activeFilter === 'active' ? 'selected' : ''}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => setFilter('completed')}
            className={activeFilter === 'completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
