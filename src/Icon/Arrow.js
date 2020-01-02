import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Svg from './Svg';

export default class Arrow extends PureComponent {
  static propTypes = {
    animation: PropTypes.string,
    rotation: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    animation: '0.3s',
    rotation: 0,
    width: 24,
    color: '#333',
    className: '',
    onClick: null
  }

  render() {
    const { animation, rotation, width, color, className, onClick } = this.props;

    const style = {
      transform: `rotate(${rotation}deg)`,
      OTransform: `rotate(${rotation}deg)`,
      MozTransform: `rotate(${rotation}deg)`,
      WebkitTransform: `rotate(${rotation}deg)`,
      transition: `transform ${animation}`,
      OTransition: `transform ${animation}`,
      MozTransition: `transform ${animation}`,
      WebkitTransition: `transform ${animation}`
    };

    return (
      <Svg
        width={width}
        height={width}
        className={className}
        onClick={onClick}
        style={style}
        viewBox='0 0 1024 1024'
      >
        <path
          id='a'
          fill={color}
          d='M778.965749 128.759549l-383.064442 383.063419 388.097062 388.096039-0.070608 0.033769c12.709463 13.137205 20.529569 31.024597 20.529569 50.731428 0 40.376593-32.736589 73.112158-73.115228 73.112158-19.705807 0-37.591153-7.819083-50.730405-20.528546l-0.034792 0.035816L241.890654 564.622498l0.035816-0.035816c-13.779841-13.281491-22.3838-31.915897-22.3838-52.585659 0-0.071631 0-0.106424 0-0.178055 0-0.072655 0-0.10847 0-0.144286 0-20.669762 8.603959-39.341007 22.3838-52.622498l-0.035816-0.034792L680.573835 20.337187l0.180102 0.179079c13.139252-12.5662 30.950919-20.313651 50.587142-20.313651 40.378639 0 73.115228 32.736589 73.115228 73.114205C804.455283 95.485725 794.567076 115.334795 778.965749 128.759549z' 
        />
      </Svg>
    );
  }
}