import React, { Component, PropTypes } from 'react';

const styles = require('./HeadNaviBar.scss');
export default class HeadNaviBar extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  goBack() {

  }

  render() {
    return (
      <div className={styles.naviContainer}>
        <div className={styles.backArrow} onClick={this.goBack.bind(this)}>
          <i className="fa fa-angle-left"></i>
        </div>
        {this.props.children}
      </div>
    );
  }
}

