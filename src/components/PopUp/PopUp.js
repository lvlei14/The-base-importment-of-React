import React, { Component, PropTypes } from 'react';
import { hidePopUp } from 'redux/modules/popUp';
import { connect } from 'react-redux';

const styles = require('./PopUp.scss');

@connect(state => ({popUp: state.popUp}),{})
export default class PopUp extends Component {


  render() {
    console.log('--弹窗内容--');
    console.log(this.props.popUp);
    return (
      <div className={styles.popUp}>

        <div className={styles.popUpContent}>

        </div>
      </div>
    );
  }
}
