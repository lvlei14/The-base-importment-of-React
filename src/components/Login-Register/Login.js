import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showDiaglog } from '../../redux/modules/diaglog';
import { Diaglog } from '../../components';

const styles = require('./Login-Register.scss');
const usernameBtn = require('../../images/login-register/login_user@3x.png');
const passwordBtn = require('../../images/login-register/login_key@3x.png');

@connect(
  state => ({
    text: state.diaglog.text || '',
    redirectUrl: state.diaglog.redirectUrl
  }),
  {
    showDiaglog,
  }
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    defaultLoginUser: PropTypes.string,
    msg: PropTypes.string,
    user: PropTypes.object,
    errMsg: PropTypes.string,
    showDiaglog: PropTypes.func,
    text: PropTypes.string,
    redirectUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.defaultLoginUser && nextProps.defaultLoginUser) {
      this.setState({
        username: nextProps.defaultLoginUser
      });
    }
    if (!this.props.user && nextProps.user) {
      this.props.showDiaglog(nextProps.msg, '/');
    }
  }

  inputUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  inputPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  loginHandler() {
    const { username, password} = this.state;
    if (!username || !password) {
      this.props.showDiaglog('用户名和密码不能为空');
      return;
    }
    this.props.login(username, password);
  }

  render() {
    return (
      <div className={styles.loginContainerFa}>
        <div className={styles.loginContainer}>
          <div className={styles.blank}></div>
          <div className={styles.inputContainer}>
            <img src={usernameBtn} className={styles.imgLeft} alt="用户名"/>
            <input type="text" onChange={this.inputUsername.bind(this)} value={this.state.username} placeholder="请输入您的用户名"/>
          </div>
          <div className={styles.inputContainer}>
            <img src={passwordBtn} className={styles.imgLeft} alt="密码"/>
            <input type="password" onChange={this.inputPassword.bind(this)} value={this.state.password} placeholder="请输入您的密码"/>
          </div>
          <div className={styles.forgetPasswordContainer}>
            <Link to="/forget-password" className={styles.forgetPassword}>忘记密码?</Link>
          </div>
          <div className={styles.loginBtnContainer}>
            <button className="mainBtn" type="button" onClick={this.loginHandler.bind(this)}>登录</button>
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
