import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedDate } from 'react-intl';
import Arrow from '../Icon/Arrow';
import { getNumberOfDaysInMonth, getNameOfFirstWeekDayInMonth, getNumberOfWeeksInMonth, getWeekDays } from '../utils/Date';
import './date.scss';

export default class Calendar extends Component {
  static propTypes = {
    calenderDate: PropTypes.object,
    clickDay: PropTypes.func
  }

  static defaultProps = {
    calenderDate: new Date(),
    clickDay: null
  }

  constructor(props) {
    super(props);
    this.state = {
      panel: 'day',
      year: 2020,
      month: 1,
      day: 1,
      calendarYear: 2020,
      calenderMonth: 1
    };
    this._renderPanel = this._renderPanel.bind(this);
    this._renderWeekCalendar = this._renderWeekCalendar.bind(this);
    this._renderWeeks = this._renderWeeks.bind(this);
    this._renderWeekDay = this._renderWeekDay.bind(this);
    this._setDate = this._setDate.bind(this);
    this._changePanel = this._changePanel.bind(this);
    this._clcikArrow = this._clcikArrow.bind(this);
  }

  componentDidMount() {
    const date = this.props.calenderDate || new Date();
    this._setDate(date);
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.calenderDate || new Date();
    this._setDate(date);
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
    const firstDayInMonth = getNameOfFirstWeekDayInMonth(year, month);
    const daysInMonth = getNumberOfDaysInMonth(year, month);
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
    const { day: calendarDay, month, year, calendarYear, calenderMonth } = this.state;
    const selected = calendarDay === day && calenderMonth === month && calendarYear === year;
    const className = classNames('calendar_week-day', {
      'calendar_weekend-day': index === 0 || index === 6,
      'calendar_week-day-selected': selected
    });
    return (
      <div key={index} className='calendar_week-day-box'>
        {day !== 0 && (
          <span 
            className={className}
            onClick={() => this.props.clickDay(new Date(year, month - 1, day))}
          >
            {day}
          </span>
        )}
      </div>
    );
  }

  _setDate(date) {
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      calendarYear: date.getFullYear(),
      calenderMonth: date.getMonth() + 1 
    });
  }

  _changePanel() {
    const { panel } = this.state;
    this.setState({
      panel: panel === 'day' ? 'month' : 'year'
    });
  }

  _clcikArrow(year, month, direction) {
    const { panel } = this.state;
    switch(panel) {
      case 'year':
      case 'month':
      default: 
        if (month === 1 && direction === -1) {
          month = 12;
          year--;
        } else if (month === 12 && direction === 1) {
          month = 0;
          year++;
        } else {
          month = month + direction;
        }
        this.setState({
          year,
          month
        });
    }
  }

  render() {
    const { year, month, panel } = this.state;
    return (
      <div className='calendar_container'>
        <div className='calendar_head'>
          <div className='calendar_arrow-box'>
            <Arrow
              width={18}
              onClick={() => this._clcikArrow(year, month, -1)}
            />
          </div>
          <div className='calendar_panel' onClick={this._changePanel}>
            {this._renderPanel()}
          </div>
          <div className='calendar_arrow-box'>
            <Arrow
              rotation={180}
              width={18}
              onClick={() => this._clcikArrow(year, month, 1)}
            />
          </div>
        </div>
        {panel === 'day' && this._renderWeekCalendar()}
      </div>
    );
  }
}