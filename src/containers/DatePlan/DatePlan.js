import React, { Component, PropTypes } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';

import { Modal } from '../../components';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import TabOutside from '../../components/TabOutside/TabOutside';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showDiaglog } from '../../redux/modules/diaglog';

import { loadschedules } from '../../redux/modules/datePlan';
import { loadtypes } from '../../redux/modules/datePlan';
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
  }
)
export default class DatePlan extends Component {
  static propTypes = {
    schedules: PropTypes.object,
    loadschedules: PropTypes.func,
    loadtypes: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selNoFormatDay: new Date(),
      tabType: '',
      selectedDayItems: [],
      schedules: this.props.schedules,
      selectedYear: (new Date()).getFullYear(),
      selectedMonth: (new Date()).getMonth() + 1,
      isClickFilter: false,
    };
  }

  componentDidMount() {
    const date = this.state.selectedYear + '-' + this.state.selectedMonth;
    console.log('----页面加载');
    const requires = {
      date: date
    };
    this.props.loadschedules(JSON.stringify(requires));
    this.props.loadtypes();
    this.clickHandleDay(new Date());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      schedules: nextProps.schedules,
    });
  }

  clickMonthTab() {
    this.setState({
      tabType: '1'
    });
    localStorage.removeItem('datePlanTabList');
  }

  clickListTab() {
    this.setState({
      tabType: '2'
    });
    localStorage.setItem('datePlanTabList', 'true');
  }

  clickHandleDay(day) {
    console.log('------点击每天事件');
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const schedules = this.state.schedules.list || [];
    console.log(schedules);
    const selectedDaySchedule = schedules && schedules.filter((item) => item.date === datetow);
    this.setState({
      selNoFormatDay: day,
      selectedDayItems: selectedDaySchedule
    });
  }

  backNowDate() {
    const selYearMon = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1);
    const requires = {
      date: selYearMon
    };
    this.props.loadschedules(JSON.stringify(requires));
    this.setState({
      selNoFormatDay: new Date(),
    });
    this.clickHandleDay(new Date());
  }

  showSingleDayItem(scheduleDay) {
    const scheduleDayMon = new Date(scheduleDay && scheduleDay[0].start_time).getMonth() + 1;
    if (scheduleDayMon === this.state.selectedMonth) {
      const outsideNum = scheduleDay && scheduleDay.filter((item) => item.is_inner.value === false) || [];
      const sideNum = scheduleDay && scheduleDay.filter((item) => item.is_inner.value === true) || [];
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
    const selectedMonth = curMonth - 1;
    const selYearMon = selectedYear + '-' + selectedMonth;
    // const date = selYearMon + '-1';
    // const day = (new Date(date)).toDateString() + ' ' + (new Date(date)).toTimeString();
    const value = selYearMon + '-1';
    const day = moment(value, 'L').toDate();
    this.setState({
      selectedMonth: selectedMonth,
      selectedDayItems: [],
      selNoFormatDay: day,
    });
    const requires = {
      date: selYearMon
    };
    this.props.loadschedules(JSON.stringify(requires));
  }

  nextClickHandle(curMonth) {
    const {selectedYear} = this.state;
    const selectedMonth = curMonth + 1;
    const selYearMon = selectedYear + '-' + selectedMonth;
    const value = selYearMon + '-1';
    const day = moment(value, 'L').toDate();
    if (selectedMonth === 1) {
      this.setState({
        selectedYear: selectedYear + 1,
      });
    }
    this.setState({
      selectedMonth: selectedMonth,
      selectedDayItems: [],
      selNoFormatDay: day,
    });
    const requires = {
      date: selYearMon
    };
    this.props.loadschedules(JSON.stringify(requires));
  }

  hideFilterReq() {
    this.setState({
      isClickFilter: true,
      selectedDayItems: []
    });
  }

  resetFilterReq() {
    this.setState({
      isClickFilter: false,
      selectedDayItems: []
    });
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dayItems = this.state.schedules && this.state.schedules.calendar;
    return (
      <div>
        <span className="dayPickerDate">{date}</span>
        <div className={styles.dayItemOut}>
          {dayItems && dayItems[date] && this.showSingleDayItem(dayItems[date])}
        </div>
      </div>
    );
  }

  render() {
    const {schedules} = this.props;
    const showTab = localStorage.getItem('datePlanTabList');
    let scheduleItems;
    if (!showTab) {
      scheduleItems = this.state.selectedDayItems;
    }
    if (showTab) {
      scheduleItems = schedules && schedules.list || [];
    }

    return (
      <div className="datePlanPage">
        <HeadNaviBar>日程</HeadNaviBar>
        <div className={styles.dateTop + ' datePlan'}>
          <div className={styles.dateTitle + ' topCardBg'}>
            <TabOutside>
              <li className={!showTab ? styles.curTab + ' left' : 'left'} onClick={this.clickMonthTab.bind(this)}>月</li>
              <li className={showTab ? styles.curTab + ' left' : 'left'} onClick={this.clickListTab.bind(this)}>列表</li>
            </TabOutside>
            <div>
              <FilterScheduleItem
                hideFilterReq = {this.hideFilterReq.bind(this)}
                resetFilterReq = {this.resetFilterReq.bind(this)} />
            </div>
          </div>
          <div className={styles.datePlanPicker}>
            {
              !showTab ?
                <div>
                  <span style={{display: 'none'}} className="banckNowDate" onClick={this.backNowDate.bind(this)}>今天</span>
                  <DayPicker
                    ref="daypicker"
                    initialMonth={this.state.selNoFormatDay}
                    onDayClick={(event, day) => this.clickHandleDay(day)}
                    renderDay={this.renderDay.bind(this)}
                    navbarComponent={this.navbar.bind(this)}
                    localeUtils={LocaleUtils}
                    locale="zh-cn" />
                </div>
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
@connect(
  state => ({...state}),
  {
    pushState: push,
  }
)
class ScdItems extends Component {
  static propTypes = {
    scheduleItems: PropTypes.array,
    pushState: PropTypes.func,
  }

  componentDidMount() {
  }

  itemTimeIcon(itemTimePeriod) {
    let itemIcon;
    if (itemTimePeriod.type.value === '查房') {
      itemIcon = <i className={'left ' + styles.checkPlan}>查</i>;
    }else if (itemTimePeriod.type.value === '会议') {
      itemIcon = <i className={'left ' + styles.metting}>会</i>;
    }else if (itemTimePeriod.type.value === '手术') {
      itemIcon = <i className={'left ' + styles.opera}>术</i>;
    }else if (itemTimePeriod.type.value === '值班') {
      itemIcon = <i className={'left ' + styles.duty}>值</i>;
    }else {
      itemIcon = <i className={'left ' + styles.zidingyi}>其</i>;
    }
    return itemIcon;
  }

  goDatePlanDetail(id, typeVal) {
    this.props.pushState('/date-plan-detail/' + id + '/' + typeVal);
  }

  handleTime(time) {
    const date = new Date(time);
    const newTimeHour = date.getHours();
    const newTimeMinute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const newTime = newTimeHour + ':' + newTimeMinute;
    return newTime;
  }

  render() {
    const scheduleItems = this.props.scheduleItems || [];
    let schItemIkey = 0;
    return (
      <div>
        {
          scheduleItems.length ?
            scheduleItems.map((scheduleItem)=> {
              return (
                <CardBg key={scheduleItem.date}>
                  <p className={styles.curDaytitle}>{scheduleItem.date}</p>
                  <ul className={styles.curDayContact}>
                    {
                      scheduleItem.schedules && scheduleItem.schedules.map((itemTimePeriod) => {
                        schItemIkey = schItemIkey + 1;
                        return (
                          <li key={schItemIkey} onClick={() => this.goDatePlanDetail(itemTimePeriod._id, itemTimePeriod.type.value)}>
                            <div>
                              <span className={styles.timeStart + ' left'}>{this.handleTime(itemTimePeriod.start_time)}</span>
                              {this.itemTimeIcon(itemTimePeriod)}
                              <span className={styles.timeRange + ' left'}>{itemTimePeriod.content && itemTimePeriod.content[0] && itemTimePeriod.content[0].input_1 && itemTimePeriod.content[0].input_1.value}</span>
                              <span style={{display: itemTimePeriod.is_inner.value ? 'none' : 'block'}}
                                className={styles.outside + ' left'}>院外</span>
                              <span style={{display: itemTimePeriod.conflict ? 'block' : 'none'}}
                               className={styles.conflict + ' left'}><i>!</i>有冲突</span>
                            </div>
                          </li>
                        );
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
@connect(
  state => ({scheduleTypes: state.schedules.scheduleTypes}),
  {
    loadschedules,
    showDiaglog,
  }
)
class FilterScheduleItem extends Component {
  static propTypes = {
    scheduleTypes: PropTypes.array,
    loadschedules: PropTypes.func,
    resetFilterReq: PropTypes.func,
    hideFilterReq: PropTypes.func,
    showDiaglog: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilterRequires: false,
      showFirstDayPicker: false,
      showSecondDayPicker: false,
      firstDateYear: (new Date()).getFullYear(),
      firstDateMonth: (new Date()).getMonth() + 1,
      filterRequires:
      {
        startDate: this.getNowFormatDate(),
        endDate: null,
        typeId: ''
      },
    };
  }

  componentDidMount() {
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

  showFilterReq() {
    const filterRedState = this.state.showFilterRequires;
    this.setState({
      showFilterRequires: !filterRedState
    });
  }

  clickShowFirstDayPicker() {
    const filterDayPickerStatus = this.state.showFirstDayPicker;
    this.setState({
      showFirstDayPicker: !filterDayPickerStatus,
    });
  }

  clickFilterFirstDate(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState(
      {
        showFirstDayPicker: false,
        firstDateYear: date.getFullYear(),
        firstDateMonth: (date.getMonth() + 1),
        filterRequires: Object.assign({}, this.state.filterRequires, { startDate: datetow})
      }
    );
  }

  clickShowSecondDayPicker() {
    const filterDayPickerStatus = this.state.showSecondDayPicker;
    this.setState({
      showSecondDayPicker: !filterDayPickerStatus,
    });
  }

  changeFilterSecondDate(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState(
      {
        showSecondDayPicker: false,
        filterRequires: Object.assign({}, this.state.filterRequires, { endDate: datetow})
      }
    );
  }

  clickFilterScheduleType(typeId) {
    this.setState({
      filterRequires: Object.assign({}, this.state.filterRequires, { typeId: typeId})
    });
  }

  resetFilterReq() {
    const requires = {};
    this.props.loadschedules(JSON.stringify(requires));
    this.props.resetFilterReq();
    this.setState({
      showFilterRequires: false,
      filterRequires:
      {
        startDate: this.getNowFormatDate(),
        endDate: null,
        typeId: ''
      },
    });
  }

  hideFilterReq() {
    const requires = this.state.filterRequires;
    const endDate = requires.endDate;
    const startDate = requires.startDate;
    if (endDate !== '不限' && startDate > endDate) {
      this.props.showDiaglog('开始时间不能大于结束时间');
      return;
    }
    this.setState({
      showFilterRequires: false,
    });
    this.props.loadschedules(JSON.stringify(requires));
    this.props.hideFilterReq();
  }

  render() {
    const scheduleTypes = this.props.scheduleTypes;
    return (
      <div className={styles.scheduleFilterBtn}>
        <h3 onClick={this.showFilterReq.bind(this)}><i></i>筛选</h3>
        <p className={styles.modolBackDrop}
          style={{display: this.state.showFilterRequires ? 'block' : 'none'}}></p>
        <section className={styles.scheduleFilterCon}
            style={{display: this.state.showFilterRequires ? 'block' : 'none'}}>
          <div className="clearfix">
            <i className="left">日期</i>
            <section className={'left clearfix ' + styles.selectDateFilter}>
              <div className={'left ' + styles.filterDate}>
                <div onClick={this.clickShowFirstDayPicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.startDate}</span>
                  <p className="sanjiao-bt"></p>
                </div>
                <div className={styles.datePlanFilterPicker + ' datePlanFilterPicker'}
                  style={{display: this.state.showFirstDayPicker ? 'block' : 'none'}}>
                  <DayPicker
                      onDayClick={(event, day) => this.clickFilterFirstDate(day)}
                      localeUtils={LocaleUtils}
                      locale="zh-cn" />
                </div>
              </div>
              <p className={styles.dateSpan + ' left'}>至</p>
              <div className={'right ' + styles.filterDate}>
                <div
                  onClick={this.clickShowSecondDayPicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.endDate === null ? '不限' : this.state.filterRequires.endDate}</span>
                  <p className="sanjiao-bt"></p>
                </div>
                <div className={styles.datePlanFilterPicker + ' datePlanFilterPicker'}
                  style={{display: this.state.showSecondDayPicker ? 'block' : 'none'}}>
                  <DayPicker
                      onDayClick={(event, day) => this.changeFilterSecondDate(day)}
                      localeUtils={LocaleUtils}
                      locale="zh-cn" />
                </div>
              </div>
            </section>
          </div>
          <div className="clearfix">
            <i className="left">类型</i>
            <section className={'left ' + styles.filterType}>
              {
                scheduleTypes && scheduleTypes.map((scheduleType) => {
                  return (
                    <span key={scheduleType.id} className={this.state.filterRequires.typeId === scheduleType.id ? styles.curSpan : ''}
                                  onClick={() => this.clickFilterScheduleType(scheduleType.id)}
                            >{scheduleType.name}</span>
                  );
                })
              }
            </section>
          </div>
          <div className={'clearfix ' + styles.filterBtn}>
            <h3 className="left"
                onClick={() => this.resetFilterReq()}><i></i>重置</h3>
            <h3 className="right" style={{display: this.state.showFilterRequires ? 'block' : 'none'}}
                onClick={() => this.hideFilterReq()}><i></i>完成</h3>
          </div>
        </section>
      </div>
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

  templateImgSrc(template) {
    let imgSrc;
    if (template.name === '查房') {
      imgSrc = chafang;
    } else if (template.name === '会议') {
      imgSrc = huiyi;
    } else if (template.name === '手术') {
      imgSrc = shoushu;
    } else {
      imgSrc = zidingyi;
    }
    return imgSrc;
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const templates = this.props.templates.result;
    return (
      <div>
        <div className="addBigBtn" onClick={this.addPlan.bind(this)}></div>
        <div style = {{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
              title = {'添加日程'}
              hideModalFooter = {this.state.hideModalFooter}
              clickHideModal = {this.clickHideModal.bind(this)}
            >
            {
              templates && templates.map((template) => {
                return (
                  <dl key={template._id} className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                    <dt><img src={this.templateImgSrc(template)} /></dt>
                    <dd>{template.name}</dd>
                  </dl>
                );
              })
            }
          </Modal>
        </div>
      </div>
    );
  }
}
