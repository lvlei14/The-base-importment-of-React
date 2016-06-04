import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadOperas } from '../../redux/modules/opera';
const styles = require('./Opera.scss');
@connect(
  state => ({...state.operas}), {
    pushState: push,
    loadOperas
  }
)
export default class Opera extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadOperas: PropTypes.func,
    operas: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loadOperas();
  }

  goOperaPatient() {
    this.props.pushState('/opera-patient');
  }

  render() {
    const operas = this.props.operas;
    console.log(operas);
    return (
      <div>
        <HeadNaviBar>心外科手术安排</HeadNaviBar>
        <div className={styles.opera}>
          <header className={'clearfix topCardBg ' + styles.operaHeader}>
            <div className="left clearfix">
              <span className="left">2016-05-04</span>
              <p className="left sanjiao-bt"></p>
            </div>
            <article className="right clearfix" onClick={this.goOperaPatient.bind(this)}>
              <i className="left"></i>
              <span className="left">病患信息</span>
            </article>
          </header>
          <section className="topCardBg">
            <header className="clearfix">
              <p className="left sanjiao-bt"></p>
              <span className="left">12术间</span>
              <article className="clearfix right">
                + 添加手术
              </article>
            </header>
            <ul>
              <li className="clearfix">
                <i className="left">1.</i>
                <p className="left">
                  王大师（男）27 主动脉辫修补术
                </p>
                <article className="right">李医生</article>
              </li>
              <li className="clearfix">
                <i className="left">1.</i>
                <p className="left">
                  王大师（男）27 主动脉辫修补术
                </p>
                <article className="right">李医生</article>
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}
