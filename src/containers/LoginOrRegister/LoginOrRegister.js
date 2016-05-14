import React, { Component, PropTypes } from 'react';
// import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { Login, Register } from '../../components';
import { login, register, selectTab } from '../../redux/modules/auth';


const styles = require('./LoginOrRegister.scss');
const bgPic = require('../../images/login-register/bg.jpg');

@connect(
  state => ({...state.auth}),
  {login, register, selectTab}
)
export default class LoginOrRegister extends Component {
  static propTypes = {
    login: PropTypes.func.required,
    register: PropTypes.func.required,
    selectTab: PropTypes.func.required,
    selectedTabName: PropTypes.number.required
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 500
    };
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
          <Login login={this.props.login}/>
        </div>
        <div style={{display: selectTabKey === 2 ? 'block' : 'none'}}>
          <Register register={this.props.register}/>
        </div>
      </div>
    );
  }
}
