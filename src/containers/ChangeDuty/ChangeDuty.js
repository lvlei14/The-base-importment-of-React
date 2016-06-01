import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadChangeDutys } from '../../redux/modules/changeDuty';
import { sendChangeDutyRequest } from '../../redux/modules/changeDuty';

const styles = require('../Duty/Duty.scss');
@connect(
  state => ({...state.changeDutys}), {
    loadChangeDutys,
    sendChangeDutyRequest,
    pushState: push,
  }
)
export default class ChangeDuty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadChangeDutys: PropTypes.func,
    changeDutys: PropTypes.array,
    sendChangeDutyRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      monthState: '3',
      dateItemId: '',

    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loaddutys();
  }

  changeMonth(event) {
    this.setState({
      monthState: event.target.value
    });
  }

  loadLevel(level) {
    if (level === '1') {
      return (
        <i className={styles.levelFir}></i>
      );
    } else if (level === '2') {
      return (
        <i className={styles.levelSec}></i>
      );
    }else if (level === '3') {
      return (
        <i className={styles.levelThr}></i>
      );
    }else if (level === '4') {
      return (
        <i className={styles.levelFour}></i>
      );
    }
  }

  clickDateItem(id) {
    this.setState({
      dateItemId: id
    });
  }

  clickChangeDuty() {
    alert('TODO 完善交换接口地址');
    // TODO 点击交换，给对方把信息发过去.
    // this.props.sendChangeDutyRequest();
  }

  goChangeDutyRecord() {
    this.props.pushState('/change-duty-record');
  }

  render() {
    const changeDutys = this.props.changeDutys;
    const monthChangeDutys = changeDutys && changeDutys.filter((item) => item.month === this.state.monthState);
    return (
      <div className={styles.duty}>
        <HeadNaviBar>换班申请</HeadNaviBar>
        <div className={'select clearfix bodyBgWhiteZindex ' + styles.selectMonth}>
          <article className={'clearfix left ' + styles.changeDutyRecord} onClick={this.goChangeDutyRecord.bind(this)}>
            <i className="left"></i>
            <span className="left">日志</span>
          </article>
          <div className="left">
            <select value={this.state.monthState} onChange={this.changeMonth.bind(this)}>
              <option value="3">3月</option>
              <option value="4">4月</option>
            </select>
            <p className="sanjiao-bt"></p>
          </div>
        </div>
        <section className={styles.dutyTop}>
          <table>
            <tbody>
            <tr>
              <th>周日</th>
              <th>周一</th>
              <th>周二</th>
              <th>周三</th>
              <th>周四</th>
              <th>周五</th>
              <th>周六</th>
            </tr>
            <tr>
              {
                monthChangeDutys && monthChangeDutys.map((monthChangeDuty) => {
                  return (
                    <td key={monthChangeDuty.id}>
                      <div className={this.state.dateItemId === monthChangeDuty.id ? styles.divCur : ''} onClick={() => this.clickDateItem(monthChangeDuty.id)}>
                        <section className={styles.dateDay}>{monthChangeDuty.day}</section>
                        <article className={styles.dateAppart}>
                          {
                            this.loadLevel(monthChangeDuty.level)
                          }
                          <span className="left">{monthChangeDuty.doctor}</span>
                        </article>
                        <i className={styles.dateSelf}></i>
                      </div>
                    </td>
                  );
                })
              }
            </tr>
            </tbody>
          </table>
        </section>
        <footer>
          <button className="mainBtn" onClick={this.clickChangeDuty.bind(this)}>交换</button>
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~~</p>
        </footer>
      </div>
    );
  }
}
