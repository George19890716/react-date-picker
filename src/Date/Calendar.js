import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './date.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: 'day'
    };
  }

  render() {
    return (
      <div className='calendar_container'></div>
    );
  }
}