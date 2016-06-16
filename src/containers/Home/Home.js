import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getPassword } from '../../redux/modules/auth';

const styles = require('./Home.scss');


@connect(
  state => ({user: state.auth.user}),
  { getPassword }
)
export default class Home extends Component {
  static propTypes = {
    getPassword: PropTypes.func,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    this.props.getPassword(this.props.user && this.props.user._id);
  }

  getNowFormatDate() {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const strDate = date.getDate();
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

  render() {
    const zhibanPng = require('../../images/zhiban.png');
    return (
      <div>
        <HeadNaviBar>首页</HeadNaviBar>
        <div className={ styles.home}>
          <ul className={'clearfix topCardBg ' + styles.kuaiNav}>
            <li className="left">
              <Link to="/duty/self">
                <article className={styles.navLiFir}>
                  <img src = {zhibanPng} alt="值班入口" />
                </article>
                <p>值班</p>
              </Link>
            </li>
          </ul>
          <div className={'clearfix topCardBg ' + styles.datePlan}>
            <header>
              <strong className="left"></strong>
              <h3 className="left">今日日程（{this.getNowFormatDate()}）</h3>
              <footer className="right">
                <Link to = "/date-plan">
                  更多
                  <i className="fa fa-angle-left"></i>
                </Link>
              </footer>
            </header>
          </div>
        </div>
      </div>
    );
  }
}
