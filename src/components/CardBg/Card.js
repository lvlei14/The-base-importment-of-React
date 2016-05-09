import React, { Component, PropTypes } from 'react';
const styles = require('./CardBg.scss');
export default class CardBg extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired
  }
  render() {
    return (
      <div className={styles.cardBg}>
        {this.props.children}
      </div>
    );
  }
}
