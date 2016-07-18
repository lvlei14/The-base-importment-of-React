import React, { Component, PropTypes } from 'react';
const styles = require('./CardBg.scss');
export default class CardBg extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    className: PropTypes.string
  }
  render() {
    return (
      <div className={styles.cardBg + ' clearfix ' + this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
