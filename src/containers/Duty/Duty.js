import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DayPicker, {DateUtils} from 'react-day-picker';

import { loaddutys } from '../../redux/modules/duty';
const styles = require('./Duty.scss');
@connect(
  state => ({...state.dutys}), {
    pushState: push,
    loaddutys
  }
)
export default class Duty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loaddutys: PropTypes.func,
    dutys: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      monthState: '3',
      selectDay: this.getNowFormatDate(),
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loaddutys();
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

  changeMonth(event) {
    this.setState({
      monthState: event.target.value
    });
  }

  goChangeDuty() {
    this.props.pushState('/change-duty');
  }

  goAppartDuty() {
    this.props.pushState('/appart-duty');
  }

  clickSelectDay(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState({
      selectDay: datetow,
    });
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dayItems = this.props.dutys;
    return (
      <div>
        {date}
        <div className={styles.dayItemOut}>
        </div>
      </div>
    );
  }

  render() {
    const dutys = this.props.dutys;
    return (
      <div className={styles.duty}>
        <HeadNaviBar>
          我的值班
        </HeadNaviBar>
        <div className={'select clearfix bodyBgWhiteZindex ' + styles.selectMonth}>
          <DayPicker
            disabledDays={DateUtils.isPastDay}
            enableOutsideDays
            onDayClick={(event, day) => this.clickSelectDay(day)}
            renderDay={this.renderDay.bind(this)} />

          <select className="left" value={this.state.monthState} onChange={this.changeMonth.bind(this)}>
            <option value="3">3月</option>
            <option value="4">4月</option>
          </select>
          <p className="right sanjiao-bt"></p>
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
              {/*
              {
                monthDutys && monthDutys.map((monthDuty) => {
                  return (
                    <td key={monthDuty.id} onClick={() => this.goChangeDuty()}>
                      <div>
                        <section className={styles.dateDay}>{monthDuty.day}</section>
                        <article className={styles.dateAppart}>{monthDuty.appartment}</article>
                        <i className={styles.dateSelf}></i>
                      </div>
                    </td>
                  );
                })
              }*/}
            </tr>
            </tbody>
          </table>
        </section>
        <footer>
          <button className="mainBtn" onClick={this.goAppartDuty.bind(this)}>查看科室值班表</button>
          <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>
      </div>
    );
  }
}
