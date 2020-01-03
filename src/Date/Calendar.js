import React, { Component, Fragment } from 'react';
import { FormattedDate } from 'react-intl';
import PropTypes from 'prop-types';
import Arrow from '../Icon/Arrow';
import './date.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = this.props.calenderDate || new Date();
    this.state = {
      panel: 'day',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      calendarYear: date.getFullYear(),
      calenderMonth: date.getMonth() + 1 
    };
    this._renderPanel = this._renderPanel.bind(this);
    this._changePanel = this._changePanel.bind(this);
  }

  _renderPanel() {
    const { panel, month, year } = this.state;
    switch(panel) {
      case 'day':
        return (
          <Fragment>
            <FormattedDate 
              value={new Date(1970, month - 1, 4)} 
              month='long'
            />
            &nbsp;
            {year}
          </Fragment>
        );
      case 'month':
        return (
          <span>{year}</span>
        );
      default: return null;
    }
  }

  _changePanel() {
    const { panel } = this.state;
    this.setState({
      panel: panel === 'day' ? 'month' : 'year'
    });
  }

  render() {
    return (
      <div className='calendar_container'>
        <div className='calendar_head'>
          <Arrow />
          <div className='calendar_panel' onClick={this._changePanel}>
            {this._renderPanel()}
          </div>
          <Arrow
            rotation={180}
          />
        </div>
      </div>
    );
  }
}