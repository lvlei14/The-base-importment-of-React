import React, { Component, PropTypes } from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
// import moment from 'moment';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';

import { Modal } from '../../components';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import TabOutside from '../../components/TabOutside/TabOutside';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { showPopUp } from '../../redux/modules/popUp';
import { loadschedulesMonth } from '../../redux/modules/datePlan';
import { loadschedules } from '../../redux/modules/datePlan';
import { loadtypes } from '../../redux/modules/datePlan';
import { filterSchedule } from '../../redux/modules/datePlan';
import { loadTemplates } from '../../redux/modules/datePlan';

const styles = require('./DatePlan.scss');
const chafang = require('../../images/chafang.png');
const shoushu = require('../../images/shoushu.png');
const huiyi = require('../../images/huiyi.png');
const zidingyi = require('../../images/zidingyi.png');


@connect(
  state => ({...state.schedules}), {
    loadschedules,
    loadtypes,
    loadschedulesMonth,
    filterSchedule,
  }
)
export default class DatePlan extends Component {
  static propTypes = {
    schedules: PropTypes.array,
    schedulesMonth: PropTypes.object,
    scheduleTypes: PropTypes.object,
    filterSchedules: PropTypes.array,
    filterSchedule: PropTypes.func,
    loadschedules: PropTypes.func,
    loadtypes: PropTypes.func,
    loadschedulesMonth: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.getNowFormatDate(),
      tabTypeState: 'month',
      selectedDayItems: [],
      isClickFilter: false,
      scheduleItems: this.props.schedules,
      filterItems: [],
      showFilterRequires: false,
      filterRequires:
      {
        firstDate: this.getNowFormatDate(),
        secondDate: '',
        typeId: 'all'
      }
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    this.props.loadschedules();
    //  this.props.loadtypes();
    this.props.loadschedulesMonth();
    this.clickHandleDay(this.state.selectedDate);
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

  changeTabType(tabType) {
    if (tabType === 'month') {
      this.clickHandleDay(this.getNowFormatDate());
      this.setState({
        selectedDate: this.getNowFormatDate()
      });
    }
    this.setState({
      tabTypeState: tabType,
      isClickFilter: false,
    });
  }

  clickHandleDay(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const schedules = this.props.schedules;
    const selectedDaySchedule = schedules && schedules.filter((item) => item.date === datetow);
    this.setState({
      selectedDate: datetow,
      selectedDayItems: selectedDaySchedule
    });
  }

  filterSelectedMonthItems(year, month) {
    const schedules = this.props.schedules;
    const selectMonthItems = schedules && schedules.filter((item) => item.year === year && item.month === month);
    return selectMonthItems;
  }

  changeFilterFirstDate(event) {
    this.setState(
      {
        filterRequires: Object.assign({}, this.state.filterRequires, { firstDate: event.target.value})
      }
    );
  }

  changeFilterSecondDate(event) {
    this.setState(
      {
        filterRequires: Object.assign({}, this.state.filterRequires, { secondDate: event.target.value})
      }
    );
  }

  clickFilterScheduleType(type) {
    this.setState({
      filterRequires: Object.assign({}, this.state.filterRequires, { type: type})
    });
  }

  showFilterReq() {
    this.setState({
      showFilterRequires: true
    });
  }

  hideFilterReq() {
    const requires = this.state.filterRequires;
    //  TODO 如果什么都没有改变,就不设置有没有点击筛选
    this.setState({
      showFilterRequires: false,
      isClickFilter: true,
    });

    if (requires.secondDate && requires.firstDate > requires.secondDate) {
      //  TODO 弹窗提示:开始日期不能大于结束日期
      alert('开始日期不能大于结束日期');
      return;
    }

    this.props.filterSchedule(this.state.filterRequires);

    this.setState({
      filterItems: this.props.filterSchedules
    });
  }

  showSingleDayItem(scheduleDay) {
    const outsideNum = scheduleDay && scheduleDay.filter((item) => item.locale.value === '院外') || [];
    const sideNum = scheduleDay && scheduleDay.filter((item) => item.locale.value === '院内') || [];
    const conflictNum = scheduleDay && scheduleDay.filter((item) => item.conflict) || [];
    if (outsideNum.length > 0 && sideNum.length > 0) {
      return (
        <p>
          <span className={styles.outside}></span>
          &nbsp;&nbsp;
          <span className={styles.side}></span>
          <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
        </p>
      );
    }
    if (outsideNum.length > 0 && sideNum.length === 0) {
      return (
        <p>
          <span className={styles.outside}></span>
          <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
        </p>
      );
    }
    if (sideNum.length > 0 && outsideNum.length === 0) {
      return (
        <p>
          <span className={styles.side}></span>
          <i style={{display: conflictNum.length > 0 ? 'block' : 'none'}}>!</i>
        </p>
      );
    }
  }

  navbar({ previousMonth, onPreviousClick, onNextClick, className}) {
    // const months = localeUtils.getMonths();
    let currentYear = (new Date()).getFullYear();
    // const prev = months[previousMonth.getMonth()];
    // const next = months[nextMonth.getMonth()];
    let prevMonth = previousMonth.getMonth();
    if (prevMonth === 11) {
      prevMonth = -1;
    }
    const curMonth = prevMonth + 2;
    // console.log(prevMonth);
    // console.log('----');
    // console.log(curMonth);
    if (curMonth === 1) {
      // console.log('1月份了');
      currentYear = currentYear + 1;
    }
    if (curMonth === 12) {
      // console.log('12月份了');
      currentYear = currentYear - 1;
    }
    // console.log(currentYear);
    return (
      <div className={className} style={{ fontSize: '.75em' }}>
        <span style={{ float: 'left', cursor: 'pointer' }} onClick={() => onPreviousClick()}>
          《
        </span>
        <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => onNextClick()}>
          》
        </span>
      </div>
    );
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dayItems = this.props.schedulesMonth;
    return (
      <div>
        {date}
        <div className={styles.dayItemOut}>
          {this.showSingleDayItem(dayItems[date])}
        </div>
      </div>
    );
  }

  render() {
    const {schedules, scheduleTypes} = this.props;
    // console.log(this.props);

    let scheduleItems;

    if (!this.state.isClickFilter) {
      if (this.state.tabTypeState === 'month') {
        scheduleItems = this.state.selectedDayItems;
      }
      if (this.state.tabTypeState === 'list') {
        scheduleItems = this.props.schedules.result;
      }
    }else {
      scheduleItems = this.state.filterItems;
    }
    console.log('上面的接口');
    console.log(scheduleItems);

    return (
      <div>
        <HeadNaviBar>日程</HeadNaviBar>
        <div className={styles.dateTop + ' datePlan'}>
          <div className={styles.dateTitle + ' topCardBg'}>
            <TabOutside>
              <li className={this.state.tabTypeState === 'month' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('month')}>月</li>
              <li className={this.state.tabTypeState === 'list' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('list')}>列表</li>
            </TabOutside>
            <div className={styles.scheduleFilterBtn}>
              <h3 style={{display: this.state.showFilterRequires ? 'none' : 'block'}} onClick={this.showFilterReq.bind(this)}><i></i>筛选</h3>
              <h3 style={{display: this.state.showFilterRequires ? 'block' : 'none'}} onClick={() => this.hideFilterReq(schedules)}><i></i>完成</h3>
              <FilterScheduleItem
                showFilterRequires = {this.state.showFilterRequires}
                filterRequires = {this.state.filterRequires}
                changeFilterFirstDate = {this.changeFilterFirstDate.bind(this)}
                changeFilterSecondDate = {this.changeFilterSecondDate.bind(this)}
                clickFilterScheduleType = {this.clickFilterScheduleType.bind(this)}
                scheduleTypes = { scheduleTypes} />
            </div>
          </div>
          <div className={styles.datePlanPicker}>
            {
              this.state.tabTypeState === 'month' ?
                <DayPicker
                    disabledDays={DateUtils.isPastDay}
                    enableOutsideDays
                    onDayClick={(event, day) => this.clickHandleDay(day)}
                    renderDay={this.renderDay.bind(this)}
                    navbarComponent={this.navbar.bind(this)}
                    localeUtils={LocaleUtils}
                    locale="zh-cn" />
              : ''
            }
          </div>
          <div className={styles.scheduleItem}>
            <ScdItems scheduleItems = {scheduleItems} />
          </div>
        </div>
        <AddPlan />
      </div>
    );
  }
}

/**
  * component: every day schedule item
  */
class ScdItems extends Component {
  static propTypes = {
    scheduleItems: PropTypes.array,
  }

  componentDidMount() {
  }

  // curDayContactList(curDayContactComponent, curDayContact) {
  curDayContactList(curDayContactComponent) {
    return (
      <li>{curDayContactComponent}</li>
    );
  }

  checkContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.checkPlan}>
        <span className={styles.timeStart + ' left'}>{curDayContact.startTime}</span>
        <i className="left">查</i>
        <span className="left">查房</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.startTime} － {curDayContact.endTime}</span>
        <span style={{display: curDayContact.locale === 'out' ? 'boock' : 'none'}}
          className={styles.outside + ' left'}>院外</span>
        <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
         className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  mettingContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.metting}>
        <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
        <i className="left">会</i>
        <span className="left">会议</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
        <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
         className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  operaContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.opera}>
        <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
        <i className="left">术</i>
        <span className="left">手术</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
        <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
         className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  dutyContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.duty}>
        <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
        <i className="left">值</i>
        <span className="left">值班</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
        <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
         className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  otherContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.duty}>
        <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
        <i className="left">其</i>
        <span className="left">其它</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
        <span style={{display: curDayContact.locale.value === '院外' ? 'boock' : 'none'}}
          className={styles.outside + ' left'}>院外</span>
        <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
         className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  render() {
    const scheduleItems = this.props.scheduleItems || [];
    console.log('----');
    console.log(this.props.scheduleItems);
    return (
      <div>
        {
          scheduleItems.length ?
            scheduleItems.map((scheduleItem)=> {
              return (
                <CardBg key={scheduleItem.date.value}>
                  <p className={styles.curDaytitle}>{scheduleItem.date.value}</p>
                  <ul className={styles.curDayContact}>
                    {
                      scheduleItem.schedules && scheduleItem.schedules.map((itemTimePeriod) => {
                        if (itemTimePeriod.type.value === '查房') {
                          const idnelg = this.checkContact(itemTimePeriod);
                          console.log(idnelg);
                          return this.checkContact(itemTimePeriod);
                        }else if (itemTimePeriod.type.value === '会议') {
                          return this.mettingContact(itemTimePeriod);
                        }else if (itemTimePeriod.type.value === '手术') {
                          return this.operaContact(itemTimePeriod);
                        }else if (itemTimePeriod.type.value === '值班') {
                          return this.dutyContact(itemTimePeriod);
                        }else {
                          return this.otherContact(itemTimePeriod);
                        }
                      })
                    }
                  </ul>
                </CardBg>
              );
            })
          : <p className="noResult">没有日程安排</p>
        }
      </div>
    );
  }
}


/**
  * component: filter scheduleee
  */
class FilterScheduleItem extends Component {

  static propTypes = {
    showFilterRequires: PropTypes.boolean,
    filterRequires: PropTypes.object,
    changeFilterFirstDate: PropTypes.func,
    changeFilterSecondDate: PropTypes.func,
    clickFilterScheduleType: PropTypes.func,
    scheduleTypes: PropTypes.object,
  };

  componentDidMount() {
  }

  changeFilterFirstDate(event) {
    this.props.changeFilterFirstDate(event);
  }

  changeFilterSecondDate(event) {
    this.props.changeFilterSecondDate(event);
  }

  clickFilterScheduleType(key) {
    this.props.clickFilterScheduleType(key);
  }

  render() {
    const scheduleTypes = this.props.scheduleTypes;
    return (
      <section className={styles.scheduleFilterCon} style={{display: this.props.showFilterRequires ? 'block' : 'none'}}>
        <div className={styles.modolBackDrop}></div>
        <div className="clearfix">
          <i className="left">日期</i>
          <section className={'left clearfix ' + styles.selectDateFilter}>
            <div className="left">
              <input type="date"
                   value={this.props.filterRequires.firstDate}
                   onChange={this.changeFilterFirstDate.bind(this)} />
            </div>
            <p className={styles.dateSpan + ' left'}>至</p>
            <div className="right">
              <input type="date"
                   value={this.props.filterRequires.secondDate}
                   onChange={this.changeFilterSecondDate.bind(this)} />
            </div>
          </section>
        </div>
        <div className="clearfix">
          <i className="left">类型</i>
          <section className="left">
            <header>
              {
                ['全部', '院内', '院外'].map((title) => {
                  let key;
                  if (title === '全部') {
                    key = 'all';
                  } else if (title === '院内') {
                    key = 'in';
                  } else {
                    key = 'out';
                  }
                  return (
                      <span className={this.props.filterRequires.type === key ? styles.curSpan : ''}
                          onClick={() => this.clickFilterScheduleType(key)}>{title}</span>
                  );
                })
              }
            </header>

            {
              ['院内', '院外'].map((time) => {
                const key = time === '院内' ? 'in' : 'out';
                return (
                  <p>
                    {
                      scheduleTypes[key] && scheduleTypes[key].map((scheduleType) => {
                        return (
                          <span className={this.props.filterRequires.typeId === scheduleType.id ? styles.curSpan : ''}
                                onClick={() => this.clickFilterScheduleType(scheduleType.id)}
                          >{ scheduleType.name}</span>
                        );
                      })
                    }
                  </p>
                );
              })
            }
          </section>
        </div>
      </section>
    );
  }
}

/**
 * component: add paln btn
 */
@connect(
  state => ({templates: state.schedules.templates}),
  {
    pushState: push,
    showPopUp,
    loadTemplates,
  }
)
class AddPlan extends Component {

  static propTypes = {
    loadTemplates: PropTypes.func,
    templates: PropTypes.object,
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hideModalFooter: true,
    };
  }

  componentDidMount() {

  }

  addPlan() {
    this.props.loadTemplates();
    this.setState({
      showModal: true,
    });
  }

  goTemplatePage(templateId) {
    this.props.pushState('/add-date-plan/' + templateId);
  }

  render() {
    const templates = this.props.templates.result;
    return (
      <div>
        <a className={styles.addBigBtn} onClick={this.addPlan.bind(this)}>+</a>
        <Modal
            showModal = {this.state.showModal}
            title = {'添加手术'}
            hideModalFooter = {this.state.hideModalFooter}
          >
          {
            templates && templates.map((template) => {
              if (template.name === '查房') {
                return (
                  <dl className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={chafang} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              } else if (template.name === '会议') {
                return (
                  <dl className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={huiyi} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              } else if (template.name === '手术') {
                return (
                  <dl className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={shoushu} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              } else {
                return (
                  <dl className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={zidingyi} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              }
            })
          }
        </Modal>
      </div>
    );
  }
}
