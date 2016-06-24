import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { Diaglog } from '../../components';
import { Link } from 'react-router';

const styles = require('./App.scss');

@connect(
  state => ({
    text: state.diaglog.text || '',
    redirectUrl: state.diaglog.redirectUrl
  }),
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    text: PropTypes.string,
    redirectUrl: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeBtnSeq: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  clickNaviBtn(seq) {
    this.setState({
      activeBtnSeq: seq
    });
  }

  render() {
    const btImageHome = require('../../images/btImagehome.png');
    const btImageTrip = require('../../images/btImagetrip.png');
    const btImageQun = require('../../images/btImagequn.png');
    const btImageMy = require('../../images/btImagemy.png');
    const btImageHomeOn = require('../../images/btImagehomeOn.png');
    const btImageTripOn = require('../../images/btImagetripOn.png');
    const btImageQunOn = require('../../images/btImagequnOn.png');
    const btImageMyOn = require('../../images/btImagemyOn.png');

    return (
      <div>
        <Helmet {...config.app.head}/>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        {/* 提示信息 */}
        {
          this.props.text ?
            <Diaglog text={this.props.text} redirectUrl={this.props.redirectUrl}/>
            : ''
        }
        <div className={styles.footer}>
          <ul className={styles.bottomBar}>
            <li className={styles.naviBtn}>
              <Link to ="/" onClick={() => this.clickNaviBtn(0)}>
                <img src={this.state.activeBtnSeq === 0 ? btImageHomeOn : btImageHome} className={styles.btImage} alt="首页"/>
                <p className={this.state.activeBtnSeq === 0 ? styles.btnameOn : ''}>首页</p>
              </Link>
            </li>
            <li className={styles.naviBtn}>
              <Link to="/date-plan" onClick={() => this.clickNaviBtn(1)}>
                <img src={this.state.activeBtnSeq === 1 ? btImageTripOn : btImageTrip} className={styles.btImage} alt="日程"/>
                <p className={this.state.activeBtnSeq === 1 ? styles.btnameOn : ''}>日程</p>
              </Link>
            </li>
            <li className={styles.naviBtn}>
              <Link to="/group-list" onClick={() => this.clickNaviBtn(2)}>
                <img src={this.state.activeBtnSeq === 2 ? btImageQunOn : btImageQun} className={styles.btImage} alt="群组"/>
                <p className={this.state.activeBtnSeq === 2 ? styles.btnameOn : ''}>群组</p>
              </Link>
            </li>
            <li className={styles.naviBtn}>
              <Link to="/my-profile" onClick={() => this.clickNaviBtn(3)}>
                <img src={this.state.activeBtnSeq === 3 ? btImageMyOn : btImageMy} className={styles.btImage} alt="我的"/>
                <p className={this.state.activeBtnSeq === 3 ? styles.btnameOn : ''}>我的</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
