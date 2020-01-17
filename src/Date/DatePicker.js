import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BlurWrapper from '../Event/BlurWrapper';
import Calendar from './Calendar';
import CalendarIcon from '../Icon/Calendar';
import './date.scss';
import { formatNumber } from '../utils/Commen';

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    value: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this._onClick = this._onClick.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onClick() {
    this.setState(prev => ({
      expand: !prev.expand
    }));
  }

  _onBlur() {
    this.setState({
      expand: false
    });
  }

  _onSelect(date) {
    this.props.onChange(date);
    this.setState({
      expand: false
    });
  }

  render() {
    const { value } = this.props;
    const { expand } = this.state;

    const date = !!value ? `${new Date(value).getFullYear()}/${formatNumber(new Date(value).getMonth() + 1)}/${formatNumber(new Date(value).getDate())}` : '-';

    return (
      <BlurWrapper
        onBlur={this._onBlur}
        className='date-picker_container'
      >
        <div className='date-picker_content' onClick={this._onClick}>
          {date}
          <CalendarIcon className='date-picker_calendar-icon' />
        </div>
        {expand && (
          <div className='date-picker_calendar-box'>
            <Calendar
              calenderDate={!!value ? new Date(value) : ''}
              clickDay={date => this._onSelect(date)}
            />
            <div className='date-picker_arrow1'></div>
            <div className='date-picker_arrow2'></div>
          </div>
        )}
      </BlurWrapper>
    );
  }
}