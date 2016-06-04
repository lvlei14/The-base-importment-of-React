import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadOperas } from '../../redux/modules/opera';
const styles = require('./OperaPatInfor.scss');
@connect(
  state => ({...state.operas}), {
    pushState: push,
    loadOperas
  }
)
export default class OperaPatInfor extends Component {
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
        <HeadNaviBar>病患信息</HeadNaviBar>
        <div className={'bodyBgWhiteZindex ' + styles.addPatient}>
          添加患者
        </div>
        <section className={styles.patInforSection}>
          <ul className={'clearfix topCardBg ' + styles.patInforTab}>
            <li className="left"><span>未安排</span></li>
            <li className="left"><span>床位</span></li>
            <li className="left"><span className={styles.liCur}>手术</span></li>
          </ul>
          <div className={styles.patInforTabCon}>
            <CardBg>
              <dl className={'clearfix ' + styles.patItemTitle}>
                <dt className="left">张萌萌 （女，21） F-511</dt>
                <dd className="right clearfix">
                  <i className="left"></i>
                  <span className="left">已手术</span>
                </dd>
              </dl>
              <ul>
                <li>手术名称：MIDCAB</li>
                <li>手术名称：MIDCAB</li>
                <li>手术名称：MIDCAB</li>
                <li>手术名称：MIDCAB</li>
              </ul>
            </CardBg>
          </div>
        </section>
      </div>
    );
  }
}
