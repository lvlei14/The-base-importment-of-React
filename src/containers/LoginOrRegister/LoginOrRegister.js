import React, { Component, PropTypes } from 'react';
// import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Login, Register } from '../../components';
import { login, register, selectTab, getMsgCode } from '../../redux/modules/auth';


const styles = require('./LoginOrRegister.scss');
const bgPic = require('../../images/login-register/bg.jpg');

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
    user: PropTypes.obj,
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

  goMainPage() {
    this.props.pushState('/');
  }

  render() {
    const selectTabKey = this.props.selectedTabName;
    const self = this;
    return (
      <div className={styles.container}>
        <div className={styles.bgContainer}>
          <img src={bgPic} alt="背景图" className={styles.bgImg}/>
          <p>掌上医院</p>
          <ul>
            <li onClick={() => self.props.selectTab(1)} className={ selectTabKey === 1 ? styles.bottomBorder : ''}>
              登录
            </li>
            <li onClick={() => self.props.selectTab(2)} className={ selectTabKey === 2 ? styles.bottomBorder : ''}>
              注册
            </li>
          </ul>
        </div>
        <div style={{display: selectTabKey === 1 ? 'block' : 'none'}}>
          <Login login={this.props.login}
                 defaultLoginUser={this.props.defaultLoginUser}
                 msg={this.props.msg}
                 errMsg={this.props.errMsg}
                 user={this.props.user}
                 goMainPage={this.goMainPage.bind(this)}
          />
        </div>
        <div style={{display: selectTabKey === 2 ? 'block' : 'none'}}>
          <Register register={this.props.register}
                    getMsgCode={this.props.getMsgCode}
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
