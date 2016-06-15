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
  state => ({...state}), {
    pushState: push,
  }
)
export default class Duty extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    user: PropTypes.object,
    routeParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  goChangeDutyRecord() {
    this.props.pushState('/change-duty-record');
  }

  goAppartPage() {
    const appartPage = 'appart';
    this.props.pushState('/duty/' + appartPage);
  }

  goChangeDutyPage() {
    const changeDutyPage = 'appart-level';
    this.props.pushState('/duty/' + changeDutyPage);
  }

  render() {
    const {pageType} = this.props.routeParams;
    if (pageType === 'self') {
      console.log('我的值班页面');
    } else if (pageType === 'appart') {
      console.log('全部科室值班表页面');
    } else if (pageType === 'appart-level') {
      console.log('换班申请页面');
    }
    return (
      <div className={'duty ' + styles.duty}>
        <HeadNaviBar>我的值班</HeadNaviBar>
        <div className={'select clearfix bodyBgWhiteZindex ' + styles.selectMonth}>
          <article className={'clearfix left ' + styles.changeDutyRecord} onClick={this.goChangeDutyRecord.bind(this)}>
            <i className="left"></i>
            <span className="left">日志</span>
          </article>
        </div>
        <section>
          <p className="bodyBgWhite"></p>
          <div className={'bodyBgWhiteZindex ' + styles.dutyTop}>
            <Calendar
              pageType = {pageType} />
            <footer style={{display: pageType === 'self' ? 'block' : 'none'}}>
              <button className="mainBtn" onClick={this.goAppartPage.bind(this)}>查看科室值班表</button>
              <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
            </footer>
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
      {/*
        <footer>
          <button className="mainBtn" onClick={this.goChangeDuty.bind(this)}>交换</button>
          <p className="tip">功能提示：点击自己的值班日期，可以申请换班哦~</p>
        </footer>*/}
      </div>
    );
  }
}


@connect(
  state => ({...state.dutys, ...state.auth}), {
    pushState: push,
    loaddutys,
    sendChangeDutyRequest,
  }
)
class Calendar extends Component {
  static propTypes = {
    loaddutys: PropTypes.func,
    user: PropTypes.object,
    dutys: PropTypes.object,
    sendChangeDutyRequest: PropTypes.func,
    pageType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectDay: '',
      selectedYear: (new Date()).getFullYear(),
      selectedMonth: (new Date()).getMonth() + 1,
      selChaDutyId: '',
    };
  }

  componentDidMount() {
    console.log('用户信息');
    console.log(this.props.user);
    this.props.loaddutys('00203', this.state.selectedMonth, this.state.selectedYear, '01', 'appartment');
  }
  sendChangeDuty() {
    // const {selectDay, selChaDutyId} = this.state;
    this.props.sendChangeDutyRequest();
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

  changeSelChDutyId(id) {
    this.setState({
      selChaDutyId: id,
    });
  }

  loadLevel(level) {
    let levelDiv;
    if (level === '1') {
      levelDiv = (<i className={styles.levelFir}></i>);
    } else if (level === '2') {
      levelDiv = (<i className={styles.levelSec}></i>);
    }else if (level === '3') {
      levelDiv = (<i className={styles.levelThr}></i>);
    }else if (level === '4') {
      levelDiv = (<i className={styles.levelFour}></i>);
    }
    return levelDiv;
  }

  showSingleDayItem(dutyDay) {
    // TODO 如果有自己，就不能点击换班
    const uid = '575e153bd12f4418f32b82e4';
    return (
      dutyDay && dutyDay.map((dutyDayItem) => {
        return (
          <div className={styles.dateDayFa} key={dutyDayItem._id} onClick={() => this.changeSelChDutyId(dutyDayItem._id)}>
            <article className={styles.dateAppart}>
              {
                this.loadLevel(dutyDayItem.doctorLevel.number)
              }
              <span className="left">{dutyDayItem.doctor && dutyDayItem.doctor.name}</span>
            </article>
            <i style={{display: dutyDayItem.doctor._id === uid ? 'block' : 'none'}} className={styles.dateSelf}></i>
          </div>
        );
      })
    );
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dutys = this.props.dutys;
    return (
      <div className={styles.dutyItem}>
        <span className={styles.dutyItemDay}>{date}</span>
        <div>
          {dutys && this.showSingleDayItem(dutys[date])}
        </div>
      </div>
    );
  }

  render() {
    console.log('----');
    console.log(this.props.pageType);
    return (
      <div>
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
        <footer>
          <button className="mainBtn" onClick={this.sendChangeDuty.bind(this)}>交换</button>
          <p className="tip">功能提示：点击想要交换的值班日期，可以申请换班哦~</p>
        </footer>
      </div>
    );
  }
}
