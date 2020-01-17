import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Svg from './Svg';

export default class Calendar extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    width: 24,
    color: '#757575',
    className: '',
    onClick: null
  }

  render() {
    const { width, color, className, onClick } = this.props;

    return (
      <Svg
        width={width}
        height={width}
        className={className}
        onClick={onClick}
        viewBox='0 0 24 24'
      >
        <path 
          id="a"
          fill={color}
          d="M6.5 13.5v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zm-9 3v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zm-9 3v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zm4.5 1v-1h2v1h-2zm0-1h2v1h-2v-1zM5 11.75a.25.25 0 1 1 0-.5h14.5a.25.25 0 1 1 0 .5H5zM16 9a.5.5 0 1 1-1 0V5.5a.5.5 0 1 1 1 0V9zM9 9a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 1 0V9zM4 19V7h16v12H4zm1-1h14V8H5v10z"
        />
      </Svg>
    );
  }
}