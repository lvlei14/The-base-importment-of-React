import React, { Component, PropTypes } from 'react';

const styles = require('./Login-Register.scss');
const usernameIcon = require('../../images/login-register/login_user@3x.png');
const msgCodeIcon = require('../../images/login-register/login_num@3x.png');
const passwordIcon = require('../../images/login-register/login_key@3x.png');
const idCardIcon = require('../../images/login-register/login_shenfenzheng@3x.png');
const showPasswordIcon = require('../../images/login-register/login_can@3x.png');
const hidenPasswordIcon = require('../../images/login-register/login_cannot@3x.png');


export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func,
    getMsgCode: PropTypes.func
  };

  constructor(props) {
    super(props);
    const TIMELIMIT = 10;
    this.state = {
      phoneNumber: '',
      password: '',
      idCardNo: '',
      msgCode: '',
      showPassword: false,
      TIMELIMIT: TIMELIMIT,
      timeLeft: TIMELIMIT,
      msgCodeBtnBgColor: '#4293E0',
      msgCodeBtnFontColor: '#ffffff'
    };
  }

  inputPhoneNumber(event) {
    this.setState({
      phoneNumber: event.target.value
    });
  }

  inputMsgCode() {
    this.setState({
      msgCode: event.target.value
    });
  }

  inputIdCardNo() {
    this.setState({
      idCardNo: event.target.value
    });
  }

  inputPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  registerHandler() {

  }

  timeCount() {
    const self = this;
    const timer = setInterval(() => {
      if (self.state.timeLeft === 0) {
        clearInterval(timer);
        self.setState({
          timeLeft: this.state.TIMELIMIT
        });
        return;
      }
      self.setState({
        timeLeft: self.state.timeLeft - 1
      });
    }, 1000);
  }

  sendMsgCode() {
    if (this.state.timeLeft !== this.state.TIMELIMIT) return;
    this.timeCount();
  }

  showPassword() {
    this.setState({
      showPassword: true
    });
  }

  hidenPassword() {
    this.setState({
      showPassword: false
    });
  }

  render() {
    const isInTimeCount = this.state.timeLeft !== this.state.TIMELIMIT;
    return (
      <div className={styles.loginContainer}>
        <div className={styles.inputContainer}>
          <img src={usernameIcon} className={styles.imgLeft} alt="手机号码"/>
          <input type="text" onChange={this.inputPhoneNumber.bind(this)} value={this.state.username} placeholder="请输入手机号码"/>
          <span className={styles.msgCodeIcon}
                onClick={this.sendMsgCode.bind(this)}
                style={{backgroundColor: this.state.msgCodeBtnBgColor, color: this.state.msgCodeBtnFontColor}}>
            {isInTimeCount ? '  ' + this.state.timeLeft + ' s   ' : '获取验证码'}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <img src={msgCodeIcon} className={styles.imgLeft} alt="验证码"/>
          <input type="text" onChange={this.inputMsgCode.bind(this)} value={this.state.msgCode} placeholder="请输入验证码"/>
        </div>
        <div className={styles.inputContainer}>
          <img src={passwordIcon} className={styles.imgLeft} alt="密码"/>
          <input type={this.state.showPassword ? 'text' : 'password'} onChange={this.inputPassword.bind(this)} value={this.state.password} placeholder="请输入密码"/>
          {
            this.state.showPassword ?
              <img src={showPasswordIcon} alt="显示密码" className={styles.showPassword} onClick={this.hidenPassword.bind(this)}/>
              :
              <img src={hidenPasswordIcon} alt="隐藏密码" className={styles.hidenPassword} onClick={this.showPassword.bind(this)}/>
          }
        </div>
        <div className={styles.inputContainer}>
          <img src={idCardIcon} className={styles.imgLeft} alt="身份证"/>
          <input type="text" onChange={this.inputIdCardNo.bind(this)} value={this.state.idCardNo} placeholder="请输入身份证"/>
        </div>
        <div className={styles.registerBtnContainer}>
          <button type="button" onClick={this.registerHandler.bind(this)}>注册</button>
        </div>
      </div>
    );
  }
}
