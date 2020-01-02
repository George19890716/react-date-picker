import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['submit', 'button']),
    onClick: PropTypes.func,
    children: PropTypes.node,
    black: PropTypes.bool
  }

  static defaultProps = {
    type: 'button',
    black: false
  }

  render() {
    const { type, onClick, children, black } = this.props;
    return (
      <button
        type={type}
        onClick={onClick}
        className={classNames('button_normal', {'button_black': black})}
      >
        {children}
      </button>
    );
  }
}