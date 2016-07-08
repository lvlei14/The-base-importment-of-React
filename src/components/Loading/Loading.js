import React, { Component, PropTypes } from 'react';

const styles = require('./Loading.scss');


export default class Loading extends Component {
  static propTypes = {
    showLoading: PropTypes.bool
  }

  static defaultProps = {
    showLoading: false
  }

  render() {
    return (
      <div>
        {
          this.props.showLoading ?
            <div className={styles.loadingFa}>
              <div className={styles.loading}>
                <i className="fa fa-spinner fa-spin"></i>
              </div>
            </div> : ''
        }
      </div>
    );
  }
}
