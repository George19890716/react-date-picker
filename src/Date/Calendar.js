import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedDate } from 'react-intl';
import Arrow from '../Icon/Arrow';
import { getNumberOfDaysInMonth, getNameOfFirstWeekDayInMonth, getNumberOfWeeksInMonth, getWeekDays, getYears } from '../utils/Date';
import './date.scss';

export default class Calendar extends Component {
  static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  static propTypes = {
    calenderDate: PropTypes.object,
    // calenderDate: PropTypes.number,
    clickDay: PropTypes.func
  }

  static defaultProps = {
    calenderDate: new Date(),
    // calenderDate: 0,
    clickDay: null
  }

  constructor(props) {
    super(props);
    this.state = {
      panel: 'day',
      year: 2020,
      month: 1,
      day: 1,
      calenderYear: 2020,
      calenderMonth: 1,
      years: []
    };
    this._renderPanel = this._renderPanel.bind(this);
    this._renderWeekCalendar = this._renderWeekCalendar.bind(this);
    this._renderWeeks = this._renderWeeks.bind(this);
    this._renderWeekDay = this._renderWeekDay.bind(this);
    this._renderMonth = this._renderMonth.bind(this);
    this._renderWeekCalendar = this._renderYearCalendar.bind(this);
    this._setDate = this._setDate.bind(this);
    this._changePanel = this._changePanel.bind(this);
    this._changeMonth = this._changeMonth.bind(this);
    this._clickArrow = this._clickArrow.bind(this);
  }

  componentDidMount() {
    const { calenderDate } = this.props;
    const date = this.props.calenderDate || new Date();
    // const date = calenderDate ? new Date(calenderDate) : new Date();
    this._setDate(date);
  }

  componentWillReceiveProps(nextProps) {
    const { calenderDate } = this.props;
    const date = this.props.calenderDate || new Date();
    // const date = calenderDate ? new Date(calenderDate) : new Date();
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

  _renderYearCalendar() {
    const { years } = this.state;
  }

  _renderMonthCalendar() {
    const months = Calendar.months;
    return (
      <div className='calendar_content calendar_month-content'>
        <div className='calendar_line'>
          {months.slice(0, 4).map(this._renderMonth)}
        </div>
        <div className='calendar_line'>
          {months.slice(4, 8).map(this._renderMonth)}
        </div>
        <div className='calendar_line'>
          {months.slice(8).map(this._renderMonth)}
        </div>
      </div>
    );
  }

  _renderMonth(month, index) {
    const months = Calendar.months;
    const { calenderMonth, calenderYear, year } = this.state;
    const selected = months.indexOf(month) + 1 === calenderMonth && year === calenderYear;
    return (
      <div
        key={index}
        className='calendar_month-box'
      >
        <span
          className={classNames('calendar_month', {'calendar_month-selected': selected})}
          onClick={() => this._changeMonth(months.indexOf(month) + 1)}
        >
          {month}
        </span>
      </div>
    );
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
    const { day: calendarDay, month, year, calenderYear, calenderMonth } = this.state;
    const selected = calendarDay === day && calenderMonth === month && calenderYear === year;
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
      calenderYear: date.getFullYear(),
      calenderMonth: date.getMonth() + 1 
    });
  }

  _changePanel() {
    const { panel } = this.state;
    if (panel === 'month') {
      const { year } = this.state;
      const years = getYears(year);
      this.setState({years});
    }
    this.setState({
      panel: panel === 'day' ? 'month' : 'year'
    });
  }

  _changeMonth(month) {
    this.setState({
      panel: 'day',
      month
    });
  }

  _clickArrow(year, month, direction) {
    const { panel } = this.state;
    switch(panel) {
      case 'year':
      case 'month':
        year = year + direction
        this.setState({
          year
        });
        break;
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
        break;
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
              onClick={() => this._clickArrow(year, month, -1)}
            />
          </div>
          <div className='calendar_panel' onClick={this._changePanel}>
            {this._renderPanel()}
          </div>
          <div className='calendar_arrow-box'>
            <Arrow
              rotation={180}
              width={18}
              onClick={() => this._clickArrow(year, month, 1)}
            />
          </div>
        </div>
        {panel === 'day' && this._renderWeekCalendar()}
        {panel === 'month' && this._renderMonthCalendar()}
      </div>
    );
  }
}