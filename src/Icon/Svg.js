import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Svg extends Component {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    viewBox: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: '',
    width: 16,
    height: 16,
    onClick: null,
    style: {}
  }

  render() {
    const { className, width, height, viewBox, onClick, style, children } = this.props;
    
    return (
      <svg
        version='1.1' 
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width={width}
        height={height || width}
        viewBox={viewBox}
        onClick={onClick}
        className={className}
        style={style}
      >
        {children}
      </svg>
    );
  }
}