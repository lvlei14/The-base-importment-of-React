import React, { Component, PropTypes } from 'react';
import { pushState } from 'react-router';

const styles = require('./HeadNaviBar.scss');

export default class HeadNaviBar extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    pushState: PropTypes.func,
  }

  goBack() {
    if (history.length > 1) {
      history.back();
    } else {
      pushState('/');
    }
  }

  render() {
    return (
      <div className={'bodyBgWhiteZindex ' + styles.naviContainer}>
        <div className={styles.backArrow} onClick={this.goBack.bind(this)}>
          <i className="fa fa-angle-left"></i>
        </div>
        {this.props.children}
      </div>
    );
  }
}

