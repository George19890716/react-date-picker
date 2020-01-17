import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BlurWrapper extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.container = null;
  }

  componentWillMount() {
    document.addEventListener('click', this.handleBlur, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleBlur, true);
  }

  handleBlur(e) {
    const el = this.container;
    if (!!el && !el.contains(e.target)) this.props.onBlur(e);
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <div {...props} ref={el => this.container = el}>
        {children}
      </div>
    );
  }
}