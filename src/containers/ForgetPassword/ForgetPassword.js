import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { getCaptcha, next2ResetPassword, setMobile, timeCountdown } from '../../redux/modules/forgetPassword';
import { showDiaglog } from '../../redux/modules/diaglog';
@connect(
  state => ({...state.forgetPassword}), {
    getCaptcha,
    next2ResetPassword,
    push,
    showDiaglog,
    setMobile,
    timeCountdown
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
    next2ResetPasswordSuccess: PropTypes.bool,
    timeCountdown: PropTypes.func,
    countdownTime: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      captcha: '',
      sendVerifySuccess: false,
      timer: 60,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.createCaptchaSuccess && nextProps.createCaptchaSuccess) {
      this.props.showDiaglog('验证码已发送...');
      this.timeCountDown();
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

  timeCountDown() {
    let index = 60;  // 时间长度
    const self = this;
    const timer = setInterval(() => {
      index = index - 1;
      if (index < 0) {
        clearInterval(timer);
        return;
      }
      self.props.timeCountdown(index);
    }, 1000);
  }

  goLoginPage() {
    this.props.push('/login-or-register');
  }

  render() {
    const styles = require('./ForgetPassword.scss');
    const {countdownTime} = this.props;
    return (
      <div>
        <HeadNaviBar>找回密码</HeadNaviBar>
        <div className={styles.forgetPass}>
          <p className="tip">请输入您绑定的手机号</p>
          <input type="tel" onChange = { this.inputMobile.bind(this) } value = { this.state.mobile } placeholder="请输入您的手机号"/>
          <div className={styles.getCaptDiv}>
            <input className="left" type="text" onChange={this.inputCaptcha.bind(this)} value={this.state.captcha} placeholder="请输入您的验证码"/>
            {
              countdownTime !== 0 ?
                <button className="right" style={{background: '#b4b4b4'}}>{countdownTime}s</button>
              : <button className="right" type="button" onClick={this.getCaptcha.bind(this)}>获取验证码</button>
            }
          </div>
          <button className="mainBtn" type="button" onClick = { this.next2ResetPassword.bind(this) }>提交</button>
          <footer onClick={this.goLoginPage.bind(this)}>已有账号？直接登录</footer>
        </div>
      </div>
    );
  }
}
