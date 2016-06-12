import React, { Component, PropTypes } from 'react';
const styles = require('./CardBg.scss');
export default class CardBg extends Component {
  static propTypes = {
    children: PropTypes.array
  }
  render() {
    return (
      <div className={styles.cardBg + ' clearfix'}>
        {this.props.children}
      </div>
    );
  }
}
