import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { FormattedDate } from 'react-intl';
import PropTypes from 'prop-types';
import Arrow from '../Icon/Arrow';
import { getNumberOfDaysInMonth, getNameOfFirstWeekDayInMonth, getNumberOfWeeksInMonth, getWeekDays } from '../utils/Date';
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
    this._renderWeekCalendar = this._renderWeekCalendar.bind(this);
    this._renderWeeks = this._renderWeeks.bind(this);
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

  _renderWeekCalendar() {
    return (
      <div className='calendar_content'>
        {this._renderWeekName()}
        {this._renderWeeks()}
      </div>
    );
  }

  _renderWeekName() {
    const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className='calendar_line'>
        {
          weekNames.map((weekName, index) => <div key={index} className='calendar_week-name'>{weekName}</div>)
        }
      </div>
    );
  }

  _renderWeeks() {
    const { year, month } = this.state;
    const firstDayInMonth = getNameOfFirstWeekDayInMonth(year, month - 1);
    const daysInMonth = getNumberOfDaysInMonth(year, month - 1);
    const weeks = getNumberOfWeeksInMonth(firstDayInMonth, daysInMonth);

    return weeks.map((week, index) => this._renderWeek(firstDayInMonth, daysInMonth, week, index));
  }

  _renderWeek(firstDayInMonth, daysInMonth, week, index) {
    const weekdays = getWeekDays(firstDayInMonth, daysInMonth, week);
    return (
      <div key={index} className='calendar_line'>
        {weekdays.map(this._renderWeekDay)}
      </div>
    );
  }

  _renderWeekDay(day, index) {
    const className = classNames('calendar_week-day', {'calendar_weekend-day': index === 0 || index === 6});
    return (
      <div key={index} className='calendar_week-day-box'>
        {day !== 0 && (
          <span 
            className={className}
          >
            {day}
          </span>
        )}
      </div>
    );
  }

  _changePanel() {
    const { panel } = this.state;
    this.setState({
      panel: panel === 'day' ? 'month' : 'year'
    });
  }

  render() {
    const { panel } = this.state;
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
        {panel === 'day' && this._renderWeekCalendar()}
      </div>
    );
  }
}