import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DayPicker, {DateUtils} from 'react-day-picker';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';

import { loaddutys } from '../../redux/modules/duty';
import { sendChangeDutyRequest } from '../../redux/modules/duty';
const styles = require('./Duty.scss');
@connect(
  state => ({...state.dutys, ...state.auth}), {
    pushState: push,
    loaddutys,
    sendChangeDutyRequest
  }
)
export default class Duty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loaddutys: PropTypes.func,
    sendChangeDutyRequest: PropTypes.func,
    dutys: PropTypes.object,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectDay: this.getNowFormatDate(),
      selectedYear: (new Date()).getFullYear(),
      selectedMonth: (new Date()).getMonth() + 1,
    };
  }

  componentDidMount() {
    console.log('用户信息');
    console.log(this.props.user);
    this.props.loaddutys('00203', this.state.selectedMonth, this.state.selectedYear, '01', 'appartment');
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

  navbar({ previousMonth, onPreviousClick, onNextClick, className}) {
    let prevMonth = previousMonth.getMonth();
    if (prevMonth === 11) {
      prevMonth = -1;
    }
    const curMonth = prevMonth + 2;
    return (
      <div className={className} style={{ fontSize: '.75em' }}>
        <span style={{ float: 'left', cursor: 'pointer' }} onClick={() => onPreviousClick()}>
          <span onClick={() => this.previousClickHandler(curMonth)}>《</span>
        </span>
        <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => onNextClick()}>
          <span onClick={() => this.nextClickHandle(curMonth)}>》</span>
        </span>
      </div>
    );
  }

  previousClickHandler(curMonth) {
    const {selectedYear} = this.state;
    if (curMonth === 1) {
      this.setState({
        selectedYear: selectedYear - 1,
      });
    }
    this.props.loaddutys(curMonth - 1, this.state.selectedYear);
  }

  nextClickHandle(curMonth) {
    const {selectedYear} = this.state;
    console.log('点击下一个月');
    console.log(curMonth);
    if (curMonth === 12) {
      this.setState({
        selectedYear: selectedYear + 1,
      });
    }
    this.props.loaddutys(curMonth + 1, this.state.selectedYear);
  }

  showSingleDayItem() {
    // console.log(dutyItem);
    // const outsideNum = dutyItem && dutyItem.filter((item) => item.locale.value === '院外') || [];
    // const sideNum = dutyItem && dutyItem.filter((item) => item.locale.value === '院内') || [];
    // const conflictNum = dutyItem && dutyItem.filter((item) => item.conflict) || [];
    // if (outsideNum.length > 0 && sideNum.length > 0) {
    //   return (
    //     <p>
    //       <span className={styles.outside}></span>
    //       &nbsp;&nbsp;
    //       <span className={styles.side}></span>
    //       <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
    //     </p>
    //   );
    // }
    // if (outsideNum.length > 0 && sideNum.length === 0) {
    //   return (
    //     <p>
    //       <span className={styles.outside}></span>
    //       <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
    //     </p>
    //   );
    // }
    // if (sideNum.length > 0 && outsideNum.length === 0) {
    //   return (
    //     <p>
    //       <span className={styles.side}></span>
    //       <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
    //     </p>
    //   );
    // }
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dutyItem = this.props.dutys;
    return (
      <div>
        {date}
        <div className={styles.dutyItem}>
          {this.showSingleDayItem(dutyItem[date])}
        </div>
      </div>
    );
  }

  render() {
    const dutys = this.props.dutys;
    console.log('--数据--');
    console.log(dutys);
    return (
      <div className={styles.duty}>
        <HeadNaviBar>
          我的值班
        </HeadNaviBar>
        <section className={styles.dutyTop}>
          <div className={styles.dutyPicker}>
            <DayPicker
                disabledDays={DateUtils.isPastDay}
                enableOutsideDays
                onDayClick={(event, day) => this.clickSelectDay(day)}
                renderDay={this.renderDay.bind(this)}
                navbarComponent={this.navbar.bind(this)}
                localeUtils={LocaleUtils}
                locale="zh-cn" />
          </div>
          {/*
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
              }
            </tr>
            </tbody>
          </table>*/}
        </section>
        <footer>
          <button className="mainBtn" onClick={this.goAppartDuty.bind(this)}>交换</button>
          <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>
      </div>
    );
  }
}
