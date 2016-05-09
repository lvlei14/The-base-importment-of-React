import React, { Component, PropTypes } from 'react';
const styles = require('./TabOutside.scss');
export default class TabOutside extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className={styles.tabOutside}>
        <ul className="clearfix">
          {this.props.children}
        </ul>
      </div>
    );
  }
}

