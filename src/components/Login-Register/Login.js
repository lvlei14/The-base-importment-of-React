import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const styles = require('./Login-Register.scss');
const usernameBtn = require('../../images/login-register/login_user@3x.png');
const passwordBtn = require('../../images/login-register/login_key@3x.png');


export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    defaultLoginUser: PropTypes.string
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
      alert('用户名和密码不能为空');
      return;
    }
    this.props.login(username, password);
  }
  render() {
    return (
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
          <button type="button" onClick={this.loginHandler.bind(this)}>登录</button>
        </div>
      </div>
    );
  }
}
