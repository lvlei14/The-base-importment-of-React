import React, { Component, PropTypes } from 'react';
// import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Login, Register } from '../../components';
import { login, register, selectTab, getMsgCode } from '../../redux/modules/auth';


const styles = require('./LoginOrRegister.scss');

@connect(
  state => ({...state.auth}),
  { login, register, selectTab, getMsgCode, pushState: push }
)
export default class LoginOrRegister extends Component {
  static propTypes = {
    login: PropTypes.func,
    register: PropTypes.func,
    selectTab: PropTypes.func,
    getMsgCode: PropTypes.func,
    newUserId: PropTypes.string,
    msgCode: PropTypes.string,
    user: PropTypes.object,
    msg: PropTypes.string,
    errMsg: PropTypes.string,
    pushState: PropTypes.func,
    selectedTabName: PropTypes.number,
    defaultLoginUser: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 500
    };
  }

  render() {
    const selectTabKey = this.props.selectedTabName;
    const logo = require('../../images/logo_whiteBg.png');
    const self = this;
    return (
      <div className={'bodyBgWhiteZindex ' + styles.container}>
        <p className={styles.loginBg}></p>
        <div className={styles.bgContainer} style={{display: 'none'}}>
          <ul>
            <li onClick={() => self.props.selectTab(1)} className={ selectTabKey === 1 ? styles.bottomBorder : ''}>
              登录
            </li>
            <li style={{display: 'none'}} onClick={() => self.props.selectTab(2)} className={ selectTabKey === 2 ? styles.bottomBorder : ''}>
              注册
            </li>
          </ul>
        </div>
        <div className={styles.logoBg}><img src={logo} alt="" /></div>
        <div style={{display: selectTabKey === 1 ? 'block' : 'none'}}>
          <Login login={this.props.login}
                 defaultLoginUser={this.props.defaultLoginUser}
                 msg={this.props.msg}
                 errMsg={this.props.errMsg}
                 user={this.props.user}
          />
        </div>
        <div style={{display: selectTabKey === 2 ? 'none' : 'none'}}>
          <Register register={this.props.register}
                    getMsgCode={this.props.getMsgCode}
                    msgCode={this.props.msgCode}
                    registerStatus={this.props.newUserId}
                    msg={this.props.msg}
                    errMsg={this.props.errMsg}
                    goLoginPage={() => this.props.selectTab(1)}
          />
        </div>
      </div>
    );
  }
}
