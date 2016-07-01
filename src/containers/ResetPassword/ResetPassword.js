import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {resetPassword,
 } from '../../redux/modules/forgetPassword';
import { showDiaglog } from '../../redux/modules/diaglog';
@connect(
  state => ({
    successMsg: state.forgetPassword && state.forgetPassword.successMsg,
    errMsg: state.forgetPassword && state.forgetPassword.errMsg,
    mobile: state.forgetPassword && state.forgetPassword.mobile,
    resetPasswordSuccess: state.forgetPassword && state.forgetPassword.resetPasswordSuccess}), {
      resetPassword,
      push,
      showDiaglog
    }
)
export default class ResetPassword extends Component {
  static propTypes = {
    resetPassword: PropTypes.func,
    resetPasswordSuccess: PropTypes.bool,
    errMsg: PropTypes.string,
    successMsg: PropTypes.string,
    mobile: PropTypes.string,
    push: PropTypes.func,
    showDiaglog: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 500
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.resetPasswordSuccess && nextProps.resetPasswordSuccess) {
      this.props.showDiaglog(nextProps.successMsg);
      this.props.push('/login-or-register');
      return;
    }
    if (!this.props.resetPasswordSuccess && !nextProps.resetPasswordSuccess) {
      this.props.showDiaglog(nextProps.errMsg);
      return;
    }
  }
  resetPassword() {
    const { password, checkPassword } = this.state;
    if (!password || !checkPassword) {
      this.props.showDiaglog('填写内容不能为空');
      return;
    }
    if (!(password === checkPassword)) {
      this.props.showDiaglog('两次密码不一致,请重新输入!');
      return;
    }
    this.props.resetPassword(this.props.mobile, password);
  }
  inputMobile(event) {
    this.setState({
      password: event.target.value
    });
  }
  inputCaptcha(event) {
    this.setState({
      checkPassword: event.target.value
    });
  }
  render() {
    return (
      <div>
        <input type="text" onChange = { this.inputMobile.bind(this) } value = { this.state.password } placeholder="请输入新密码"/>
        <input type="text" onChange = { this.inputCaptcha.bind(this) } value = { this.state.checkPassword } placeholder="确认密码"/>
        <button type="button" onClick = { this.resetPassword.bind(this) }>完成</button>
      </div>
    );
  }
}
