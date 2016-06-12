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
  }
)
export default class DatePlan extends Component {
  static propTypes = {
    schedules: PropTypes.array,
    schedulesMonth: PropTypes.object,
    scheduleTypes: PropTypes.object,
    filterSchedules: PropTypes.array,
    loadschedules: PropTypes.func,
    loadtypes: PropTypes.func,
    loadschedulesMonth: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      tabTypeState: 'month',
      selectedDayItems: [],
      isClickFilter: false,
      scheduleItems: this.props.schedules,
      selectedYear: (new Date()).getFullYear(),
      selectedMonth: (new Date()).getMonth() + 1,
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    this.props.loadschedules();
    //  this.props.loadtypes();
    // TODO 传当前年和月
    this.props.loadschedulesMonth();
    // console.log(this.state.selectedYear);
    // console.log(this.state.selectedMonth);
    this.clickHandleDay(this.state.selectedDate);
  }

  changeTabType(tabType) {
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
  hideFilterReq() {
    this.setState({
      isClickFilter: true,
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
    // this.props.loadschedulesMonth();
  }

  nextClickHandle(curMonth) {
    const {selectedYear} = this.state;
    if (curMonth === 12) {
      this.setState({
        selectedYear: selectedYear + 1,
      });
    }
    // this.props.loadschedulesMonth();
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
    const {schedules, filterSchedules} = this.props;

    let scheduleItems;

    if (!this.state.isClickFilter) {
      if (this.state.tabTypeState === 'month') {
        scheduleItems = this.state.selectedDayItems;
      }
      if (this.state.tabTypeState === 'list') {
        scheduleItems = schedules.result;
      }
    }else {
      scheduleItems = filterSchedules;
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
            <div>
              <FilterScheduleItem
                hideFilterReq = {this.hideFilterReq.bind(this)} />
            </div>
          </div>
          <div className={styles.datePlanPicker}>
            {
              this.state.tabTypeState === 'month' && !this.state.isClickFilter ?
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
  // curDayContactList(curDayContactComponent) {
  //   return (
  //     <li>{curDayContactComponent}</li>
  //   );
  // }

  // checkContact(curDayContact) {
  //   return this.curDayContactList(
  //     <div className={styles.checkPlan}>
  //       <span className={styles.timeStart + ' left'}>{curDayContact.startTime}</span>
  //       <i className="left">查</i>
  //       <span className="left">查房</span>
  //       <span className={styles.timeRange + ' left'}>{curDayContact.startTime} － {curDayContact.endTime}</span>
  //       <span style={{display: curDayContact.locale === 'out' ? 'boock' : 'none'}}
  //         className={styles.outside + ' left'}>院外</span>
  //       <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
  //        className={styles.conflict + ' left'}><i>!</i>有冲突</span>
  //     </div>
  //     , curDayContact);
  // }

  // mettingContact(curDayContact) {
  //   return this.curDayContactList(
  //     <div className={styles.metting}>
  //       <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
  //       <i className="left">会</i>
  //       <span className="left">会议</span>
  //       <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
  //       <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
  //        className={styles.conflict + ' left'}><i>!</i>有冲突</span>
  //     </div>
  //     , curDayContact);
  // }

  // operaContact(curDayContact) {
  //   return this.curDayContactList(
  //     <div className={styles.opera}>
  //       <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
  //       <i className="left">术</i>
  //       <span className="left">手术</span>
  //       <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
  //       <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
  //        className={styles.conflict + ' left'}><i>!</i>有冲突</span>
  //     </div>
  //     , curDayContact);
  // }

  // dutyContact(curDayContact) {
  //   return this.curDayContactList(
  //     <div className={styles.duty}>
  //       <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
  //       <i className="left">值</i>
  //       <span className="left">值班</span>
  //       <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
  //       <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
  //        className={styles.conflict + ' left'}><i>!</i>有冲突</span>
  //     </div>
  //     , curDayContact);
  // }

  // otherContact(curDayContact) {
  //   return this.curDayContactList(
  //     <div className={styles.duty}>
  //       <span className={styles.timeStart + ' left'}>{curDayContact.startTime.value}</span>
  //       <i className="left">其</i>
  //       <span className="left">其它</span>
  //       <span className={styles.timeRange + ' left'}>{curDayContact.startTime.value} － {curDayContact.endTime.value}</span>
  //       <span style={{display: curDayContact.locale.value === '院外' ? 'boock' : 'none'}}
  //         className={styles.outside + ' left'}>院外</span>
  //       <span style={{display: curDayContact.conflict ? 'block' : 'noen'}}
  //        className={styles.conflict + ' left'}><i>!</i>有冲突</span>
  //     </div>
  //     , curDayContact);
  // }

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
      itemIcon = <i className="left">其</i>;
    }
    return itemIcon;
  }

  render() {
    const scheduleItems = this.props.scheduleItems || [];
    console.log('----');
    console.log(this.props.scheduleItems);
    let schItemIkey = 0;
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
                        schItemIkey = schItemIkey + 1;
                        return (
                          <li key={schItemIkey}>
                            <div>
                              <span className={styles.timeStart + ' left'}>{itemTimePeriod.startTime.value}</span>
                              {this.itemTimeIcon(itemTimePeriod)}
                              <span className="left">其他</span>
                              <span className={styles.timeRange + ' left'}>{itemTimePeriod.startTime.value} － {itemTimePeriod.endTime.value}</span>
                              <span style={{display: itemTimePeriod.locale.value === '院外' ? 'boock' : 'none'}}
                                className={styles.outside + ' left'}>院外</span>
                              <span style={{display: itemTimePeriod.conflict ? 'block' : 'noen'}}
                               className={styles.conflict + ' left'}><i>!</i>有冲突</span>
                            </div>
                          </li>
                        );
                        // if (itemTimePeriod.type.value === '查房') {
                        //   const idnelg = this.checkContact(itemTimePeriod);
                        //   console.log(idnelg);
                        //   return this.checkContact(itemTimePeriod);
                        // }else if (itemTimePeriod.type.value === '会议') {
                        //   return this.mettingContact(itemTimePeriod);
                        // }else if (itemTimePeriod.type.value === '手术') {
                        //   return this.operaContact(itemTimePeriod);
                        // }else if (itemTimePeriod.type.value === '值班') {
                        //   return this.dutyContact(itemTimePeriod);
                        // }else {
                        //   return this.otherContact(itemTimePeriod);
                        // }
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
    filterSchedule,
  }
)
class FilterScheduleItem extends Component {
  static propTypes = {
    scheduleTypes: PropTypes.object,
    hideFilterReq: PropTypes.func,
    filterSchedule: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilterRequires: false,
      showFirstDayPicker: false,
      showSecondDayPicker: false,
      filterRequires:
      {
        firstDate: this.getNowFormatDate(),
        secondDate: '不限',
        typeId: 'all'
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
    this.setState({
      showFilterRequires: true
    });
  }

  clickShowFirstDayPicker() {
    this.setState({
      showFirstDayPicker: true,
    });
  }

  clickFilterFirstDate(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState(
      {
        showFirstDayPicker: false,
        filterRequires: Object.assign({}, this.state.filterRequires, { firstDate: datetow})
      }
    );
  }

  clickShowSecondDayPicker() {
    this.setState({
      showSecondDayPicker: true,
    });
  }

  changeFilterSecondDate(day) {
    const date = new Date(day);
    const datetow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState(
      {
        showSecondDayPicker: false,
        filterRequires: Object.assign({}, this.state.filterRequires, { secondDate: datetow})
      }
    );
  }

  clickFilterScheduleType(typeId) {
    this.setState({
      filterRequires: Object.assign({}, this.state.filterRequires, { typeId: typeId})
    });
  }

  hideFilterReq() {
    this.props.hideFilterReq();
    const requires = this.state.filterRequires;
    //  TODO 如果什么都没有改变,就不设置有没有点击筛选
    this.setState({
      showFilterRequires: false,
    });

    if (requires.secondDate && requires.firstDate > requires.secondDate) {
      //  TODO 弹窗提示:开始日期不能大于结束日期
      alert('开始日期不能大于结束日期');
      return;
    }
    this.props.filterSchedule(requires);
  }

  render() {
    const scheduleTypes = this.props.scheduleTypes;
    console.log('筛选条件');
    console.log(this.state.filterRequires);
    return (
      <div className={styles.scheduleFilterBtn}>
        <h3 style={{display: this.state.showFilterRequires ? 'none' : 'block'}}
            onClick={this.showFilterReq.bind(this)}><i></i>筛选</h3>
        <h3 style={{display: this.state.showFilterRequires ? 'block' : 'none'}}
            onClick={() => this.hideFilterReq()}><i></i>完成</h3>
        <section className={styles.scheduleFilterCon}
            style={{display: this.state.showFilterRequires ? 'block' : 'none'}}>
          <div className={styles.modolBackDrop}></div>
          <div className="clearfix">
            <i className="left">日期</i>
            <section className={'left clearfix ' + styles.selectDateFilter}>
              <div className={'left ' + styles.filterDate}>
                <div onClick={this.clickShowFirstDayPicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.firstDate}</span>
                  <p className="caret"></p>
                </div>
                <div className={styles.datePlanFilterPicker}
                  style={{display: this.state.showFirstDayPicker ? 'block' : 'none'}}>
                  <DayPicker
                      disabledDays={DateUtils.isPastDay}
                      enableOutsideDays
                      onDayClick={(event, day) => this.clickFilterFirstDate(day)}
                      localeUtils={LocaleUtils}
                      locale="zh-cn" />
                </div>
              </div>
              <p className={styles.dateSpan + ' left'}>至</p>
              <div className={'right ' + styles.filterDate}>
                <div onClick={this.clickShowSecondDayPicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.secondDate}</span>
                  <p className="caret"></p>
                </div>
                <div className={styles.datePlanFilterPicker}
                  style={{display: this.state.showSecondDayPicker ? 'block' : 'none'}}>
                  <DayPicker
                      disabledDays={DateUtils.isPastDay}
                      enableOutsideDays
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
                        <span key={key} className={this.state.filterRequires.type === key ? styles.curSpan : ''}
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
                            <span key={scheduleType.id} className={this.state.filterRequires.typeId === scheduleType.id ? styles.curSpan : ''}
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
    showPopUp,
    loadTemplates,
  }
)
class AddPlan extends Component {

  static propTypes = {
    loadTemplates: PropTypes.func,
    templates: PropTypes.array,
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
              return (
                <dl className={styles.templateBtn} onClick={() => this.goTemplatePage(template._id)}>
                  <dt><img src={this.templateImgSrc(template)} /></dt>
                  <dd>{template.name}</dd>
                </dl>
              );
            })
          }
        </Modal>
      </div>
    );
  }
}
