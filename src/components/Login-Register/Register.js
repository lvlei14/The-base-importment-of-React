import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showDiaglog } from '../../redux/modules/diaglog';
import { Diaglog } from '../../components';

const styles = require('./Login-Register.scss');
const usernameIcon = require('../../images/login-register/login_user@3x.png');
const msgCodeIcon = require('../../images/login-register/login_num@3x.png');
const passwordIcon = require('../../images/login-register/login_key@3x.png');
const showPasswordIcon = require('../../images/login-register/login_can@3x.png');
const hidenPasswordIcon = require('../../images/login-register/login_cannot@3x.png');

@connect(
  state => ({
    text: state.diaglog.text || '',
    redirectUrl: state.diaglog.redirectUrl
  }),
  {
    showDiaglog,
  }
)
export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func,
    getMsgCode: PropTypes.func,
    registerStatus: PropTypes.string,
    msg: PropTypes.string,
    msgCode: PropTypes.string,
    errMsg: PropTypes.string,
    goLoginPage: PropTypes.func,
    showDiaglog: PropTypes.func,
    text: PropTypes.string,
    redirectUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
    const TIMELIMIT = 60;
    this.state = {
      mobile: '',
      password: '',
      msgCode: '',
      showPassword: false,
      TIMELIMIT: TIMELIMIT,
      timeLeft: TIMELIMIT,
      msgCodeBtnBgColor: '#4293E0',
      msgCodeBtnFontColor: '#ffffff'
    };
  }

  componentWillReceiveProps(nextProps) {
    // register success
    if (!this.props.registerStatus && nextProps.registerStatus) {
      this.props.showDiaglog(nextProps.msg);
      this.props.goLoginPage();
      this.clearInput();
    }
    if (!this.props.msgCode && nextProps.msgCode) {
      this.timeCount();
    }
    // error
    if (!this.props.errMsg && nextProps.errMsg) {
      this.props.showDiaglog(nextProps.errMsg);
    }
  }

  inputPhoneNumber(event) {
    this.setState({
      mobile: event.target.value
    });
  }

  inputMsgCode(event) {
    this.setState({
      msgCode: event.target.value
    });
  }

  inputPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  clearInput() {
    this.setState({
      mobile: '',
      password: '',
      msgCode: '',
      showPassword: false
    });
  }

  registerHandler() {
    // TODO 验证手机号码格式, 身份证号码格式
    const {msgCode, mobile, password} = this.state;
    if (!msgCode || !mobile || !password) {
      this.props.showDiaglog('输入内容不能为空');
      return;
    }
    const options = {msgCode, mobile, password};
    this.props.register(options);
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
    const mobile = this.state.mobile;
    if (!mobile) return;
    this.props.getMsgCode(mobile);
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
      <div className={styles.loginContainerFa}>
        <div className={styles.loginContainer}>
          <div className={styles.blank}></div>
          <div className={styles.inputContainer}>
            <img src={usernameIcon} className={styles.imgLeft} alt="手机号码"/>
            <input type="text" onChange={this.inputPhoneNumber.bind(this)} value={this.state.mobile} placeholder="请输入手机号码"/>
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
          <div className={styles.registerBtnContainer}>
            <button className="mainBtn" type="button" onClick={this.registerHandler.bind(this)}>注册</button>
          </div>
        </div>
        {/* 提示信息 */}
        {
          this.props.text ?
            <Diaglog text={this.props.text} redirectUrl={this.props.redirectUrl}/>
            : ''
        }
      </div>
    );
  }
}
