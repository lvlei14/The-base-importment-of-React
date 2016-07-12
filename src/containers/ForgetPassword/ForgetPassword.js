import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import {getCaptcha,
        next2ResetPassword,
        setMobile
 } from '../../redux/modules/forgetPassword';
import { showDiaglog } from '../../redux/modules/diaglog';
let timer = 0;
@connect(
  state => ({
    successMsg: state.forgetPassword && state.forgetPassword.successMsg,
    createCaptchaSuccess: state.forgetPassword && state.forgetPassword.createCaptchaSuccess,
    next2ResetPasswordSuccess: state.forgetPassword && state.forgetPassword.next2ResetPasswordSuccess}), {
      getCaptcha,
      next2ResetPassword,
      push,
      showDiaglog,
      setMobile
    }
)
export default class ForgetPassword extends Component {
  static propTypes = {
    getCaptcha: PropTypes.func,
    next2ResetPassword: PropTypes.func,
    setMobile: PropTypes.func,
    createCaptchaSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    push: PropTypes.func,
    showDiaglog: PropTypes.func,
    next2ResetPasswordSuccess: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      captcha: '',
      sendVerifySuccess: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.createCaptchaSuccess && nextProps.createCaptchaSuccess) {
      this.props.showDiaglog('验证码已发送...');
      this.setState({sendVerifySuccess: true});
      return;
    }

    if (!this.props.next2ResetPasswordSuccess && nextProps.next2ResetPasswordSuccess) {
      this.setMobile();
      this.props.push('/resetPassword');
      return;
    }
  }

  setMobile() {
    const { mobile } = this.state;
    if (!mobile) {
      this.props.showDiaglog('手机号不能为空');
      return;
    }
    this.props.setMobile(mobile);
  }
  getCaptcha() {
    const { mobile } = this.state;
    if (!mobile) {
      this.props.showDiaglog('手机号不能为空');
      return;
    }
    this.props.getCaptcha(mobile);
  }

  next2ResetPassword() {
    const { mobile, captcha } = this.state;
    if (!mobile || !captcha) {
      this.props.showDiaglog('填写内容不能为空');
      return;
    }
    this.props.next2ResetPassword(mobile, captcha);
  }
  inputMobile(event) {
    this.setState({
      mobile: event.target.value
    });
  }
  inputCaptcha(event) {
    this.setState({
      captcha: event.target.value
    });
  }

  sendVerify() {
    clearTimeout(timer);
    timer = setTimeout(timer++, 1000);
  }

  componentWillUnMount() {
    clearTimeout(timer);
  }

  render() {
    const styles = require('./ForgetPassword.scss');
    const {sendVerifySuccess} = this.state;
    return (
      <div>
        <HeadNaviBar>找回密码</HeadNaviBar>
        <div className={styles.forgetPass}>
          <p className="tip">请输入您绑定的手机号</p>
          <input type="tel" onChange = { this.inputMobile.bind(this) } value = { this.state.mobile } placeholder="请输入您的手机号"/>
          <div className={styles.getCaptDiv}>
            <input className="left" type="text" onChange={this.inputCaptcha.bind(this)} value={this.state.captcha} placeholder="请输入您的验证码"/>
            <button className="right" type="button" onClick = { this.getCaptcha.bind(this) }>获取验证码</button>
            <button style={{display: sendVerifySuccess ? 'block' : 'none'}}>{timer}s</button>
          </div>
          <button className="mainBtn" type="button" onClick = { this.next2ResetPassword.bind(this) }>下一步</button>
        </div>
      </div>
    );
  }
}
