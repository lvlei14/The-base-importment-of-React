import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showDiaglog } from '../../redux/modules/diaglog';

import { logout } from '../../redux/modules/auth';
const styles = require('./UserProfile.scss');

@connect(
  state => ({...state.auth}), {
    push,
    logout,
    showDiaglog,
  }
)
export default class UserProfile extends Component {
  static propTypes = {
    push: PropTypes.func,
    user: PropTypes.object,
    logout: PropTypes.func,
    msg: PropTypes.string,
    showDiaglog: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.msg && nextProps.msg) {
      if (this.props.user && !nextProps.user) {
        this.props.showDiaglog('注销成功', '/login-or-register');
        return;
      }
    }
  }

  clickLogout() {
    this.props.logout();
    this.props.push('/login-or-register');
  }

  render() {
    const userProfileBg = require('../../images/userProfileBg.png');
    const headPortrait = require('../../images/userHeadPortrait.png');
    const {user} = this.props;
    return (
      <div className={styles.userprofile}>
        <HeadNaviBar>个人中心</HeadNaviBar>
        <div>
          <div className={styles.userPTop}>
            <img className={styles.userPTopBg} src={userProfileBg} alt="" />
            <section>
              <p><img src={headPortrait} alt="" /></p>
              <h3>{user.name}</h3>
            </section>
          </div>
          <ul className={'topCardBg ' + styles.userPUl}>
            <li className="clearfix">
              <i className="left">手机号</i>
              <span className="right">{user.mobile}</span>
            </li>
          </ul>
          <footer>
            <button className="mainBtn" onClick={this.clickLogout.bind(this)}>退出登录</button>
          </footer>
        </div>
      </div>
    );
  }
}
