import React, { Component, PropTypes } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
require('moment/locale/zh-cn');
import LocaleUtils from 'react-day-picker/moment';
import { Modal, Loading, HeadNaviBar, CardBg, TabOutside } from '../../components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showDiaglog } from '../../redux/modules/diaglog';
import { loadschedules, loadtypes, loadTemplates } from '../../redux/modules/datePlan';

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
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      selectedDay: today,
      tabType: '',  // '1', month tab; '2', list tab;
      schedulesOfSelectedDay: [],
    };
  }

  componentDidMount() {
    const selectedDay = this.state.selectedDay;
    const date = moment(selectedDay).format('YYYY-M');
    const requires = {
      date: date
    };
    this.props.loadschedules(JSON.stringify(requires));
    this.props.loadtypes();
  }

  // 响应日历月份切换动作
  onMonthChange(_date) {
    const dateQuery = moment(_date).format('YYYY-M');
    const firstDateOfMonth = moment(_date).date(1);
    this.setState({
      schedulesOfSelectedDay: [],
      selectedDay: firstDateOfMonth.toDate()
    });
    this.props.loadschedules(JSON.stringify({date: dateQuery}));
  }

  selectDayOnCalendar(day) {
    const datetow = moment(day).format('YYYY-MM-DD');
    const schedules = this.props.schedules && this.props.schedules.list || [];
    const selectedDaySchedule = schedules && schedules.filter((item) => item.date === datetow);
    this.setState({
      selectedDay: day,
      schedulesOfSelectedDay: selectedDaySchedule
    });
  }

  showSingleDayItem(scheduleDay) {
    const selectMonth = this.state.selectedDay.getMonth() + 1;
    const scheduleDayMon = new Date(scheduleDay && scheduleDay[0].start_time).getMonth() + 1;
    if (scheduleDayMon === selectMonth) {
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

  clickCanlendarTab() {
    this.setState({
      tabType: '1'
    });
    localStorage.removeItem('displaySchedulesWithListStyle');
  }

  clickListTab() {
    this.setState({
      tabType: '2'
    });
    localStorage.setItem('displaySchedulesWithListStyle', 'true');
  }

  clearSchedulesOfSelectedDay() {
    this.setState({
      schedulesOfSelectedDay: []
    });
  }

  renderDay(day) {
    const date = day.getDate().toString();
    const dayItems = this.props.schedules && this.props.schedules.calendar;
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
    const {schedulesOfSelectedDay, selectedDay} = this.state;
    const displaySchedulesWithListStyle = localStorage.getItem('displaySchedulesWithListStyle');

    return (
      <div className="datePlanPage">
        <HeadNaviBar>日程</HeadNaviBar>
        <Loading showLoading={this.props.loading} />
        <div className={styles.dateTop + ' datePlan'}>
          <div className={styles.dateTitle + ' topCardBg'}>
            <TabOutside>
              <li className={!displaySchedulesWithListStyle ? styles.curTab + ' left' : 'left'} onClick={this.clickCanlendarTab.bind(this)}>月</li>
              <li className={displaySchedulesWithListStyle ? styles.curTab + ' left' : 'left'} onClick={this.clickListTab.bind(this)}>列表</li>
            </TabOutside>
            <div>
              <FilterScheduleItem clearSchedulesOfSelectedDay={this.clearSchedulesOfSelectedDay.bind(this)}/>
            </div>
          </div>
          <div>
            {
              !displaySchedulesWithListStyle ?
                <div>
                  <DayPicker
                    className={styles.datePlanPicker}
                    ref="daypicker"
                    initialMonth={this.state.selectedDay}
                    onDayClick={(event, day) => this.selectDayOnCalendar(day)}
                    renderDay={this.renderDay.bind(this)}
                    onMonthChange={this.onMonthChange.bind(this)}
                    localeUtils={LocaleUtils}
                    locale="zh-cn" />
                  <ScheduleItem scheduleItem={schedulesOfSelectedDay && schedulesOfSelectedDay[0]} selectedDayOnCalendar={selectedDay} />
                </div>
              : <ScheduleItems scheduleItems = {schedules && schedules.list || []} />
            }
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
class ScheduleItems extends Component {
  static propTypes = {
    scheduleItems: PropTypes.array,
    pushState: PropTypes.func,
  }

  render() {
    const scheduleItems = this.props.scheduleItems || [];
    return (
      <div>
        {
          scheduleItems && scheduleItems.map((scheduleItem)=> {
            return (
              <ScheduleItem key={scheduleItem.date} scheduleItem = {scheduleItem} />
            );
          })
        }
      </div>
    );
  }
}

/**
  * component: schedule every day card
  */
class ScheduleItem extends Component {
  static propTypes = {
    scheduleItem: PropTypes.object,
    selectedDayOnCalendar: PropTypes.date,
  };

  render() {
    const scheduleItem = this.props.scheduleItem || {};
    const displaySchedulesWithListStyle = localStorage.getItem('displaySchedulesWithListStyle');
    return (
      <CardBg className={styles.scheduleItem}>
        <div>
          <p className={styles.curDaytitle}>{moment(displaySchedulesWithListStyle ? scheduleItem.date : this.props.selectedDayOnCalendar).format('YYYY-MM-DD')}</p>
          <ul className={styles.curDayContact}>
            {
              scheduleItem.schedules && scheduleItem.schedules.length ?
                scheduleItem.schedules.map((singleScheduleOfDayCard) => {
                  return (
                    <ScheduleItemSingleList key={singleScheduleOfDayCard._id} singleScheduleOfDayCard={singleScheduleOfDayCard} />
                  );
                })
              : <p>当天没有日程安排</p>
            }
          </ul>
        </div>
      </CardBg>
    );
  }
}

/**
  * component: every day card of every list item
  */
@connect(
  state => ({...state}),
  {
    pushState: push,
  }
)
class ScheduleItemSingleList extends Component {
  static propTypes = {
    singleScheduleOfDayCard: PropTypes.object,
    pushState: PropTypes.func,
  }

  itemTimeIcon(singleScheduleOfDayCard) {
    let itemIcon;
    const itemTimetype = singleScheduleOfDayCard.type || {};
    if (itemTimetype.value === '查房') {
      itemIcon = <i className={'left ' + styles.checkPlan}>查</i>;
    }else if (itemTimetype.value === '会议') {
      itemIcon = <i className={'left ' + styles.metting}>会</i>;
    }else if (itemTimetype.value === '手术') {
      itemIcon = <i className={'left ' + styles.opera}>术</i>;
    }else if (itemTimetype.value === '值班') {
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
    const newTime = moment(time).format('HH:mm');
    return newTime;
  }

  render() {
    const {singleScheduleOfDayCard} = this.props;
    return (
      <li onClick={() => this.goDatePlanDetail(singleScheduleOfDayCard._id, singleScheduleOfDayCard.type && singleScheduleOfDayCard.type.value)}>
        <div>
          <span className={styles.timeStart + ' left'}>{this.handleTime(singleScheduleOfDayCard.start_time)} - {this.handleTime(singleScheduleOfDayCard.end_time)}</span>
          {this.itemTimeIcon(singleScheduleOfDayCard)}
          <span className={styles.timeRange + ' left'}>
            {
              singleScheduleOfDayCard.content && singleScheduleOfDayCard.content[0] && singleScheduleOfDayCard.content[0].input_1 && singleScheduleOfDayCard.content[0].input_1.value
            ?
              singleScheduleOfDayCard.content && singleScheduleOfDayCard.content[0] && singleScheduleOfDayCard.content[0].input_1 && singleScheduleOfDayCard.content[0].input_1.value
            : singleScheduleOfDayCard.type && singleScheduleOfDayCard.type.value
            }
          </span>
          <span style={{display: singleScheduleOfDayCard.is_inner.value ? 'none' : 'block'}}
            className={styles.outside + ' left'}>院外</span>
          <span style={{display: singleScheduleOfDayCard.conflict ? 'block' : 'none'}}
           className={styles.conflict + ' left'}><i>!</i>有冲突</span>
        </div>
      </li>
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
    clearSchedulesOfSelectedDay: PropTypes.func,
    showDiaglog: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilterPannel: false,     // 是否打开筛选
      showStartDatePicker: false,  // 开始日期
      showEndDatePicker: false,    // 结束日期
      filterRequires: {            // 筛选条件
        startDate: this.getNowFormatDate(),
        endDate: this.getNowFormatDate(),
        typeId: ''
      },
    };
  }

  componentDidMount() {
  }

  getNowFormatDate() {
    return moment().format('YYYY-M-D');
  }

  // 打开或者关闭筛选按钮
  toggleFilterPannel() {
    this.setState({
      showFilterPannel: !this.state.showFilterPannel
    });
  }

  // 打开或者关闭起始时间控件
  toggleStartDatePicker() {
    this.setState({
      showEndDatePicker: false,
      showStartDatePicker: !this.state.showStartDatePicker,
    });
  }
  // 打开或者关闭结束时间控件
  toggleEndDatePicker() {
    this.setState({
      showStartDatePicker: false,
      showEndDatePicker: !this.state.showEndDatePicker,
    });
  }

  startDatePickerClickHandler(day) {
    const date = moment(day).format('YYYY-M-D');
    this.setState({
      showStartDatePicker: false,
      filterRequires: {...this.state.filterRequires, startDate: date}
    });
  }

  endDatePickerClickHandler(day) {
    const date = moment(day).format('YYYY-M-D');
    this.setState({
      showEndDatePicker: false,
      filterRequires: {...this.state.filterRequires, endDate: date}
    });
  }

  clickFilterScheduleType(selectTypeId) {
    const {typeId} = this.state.filterRequires;
    this.setState({
      filterRequires: {...this.state.filterRequires, typeId: typeId !== selectTypeId ? selectTypeId : ''}
    });
  }

  resetFilterReq() {
    const requires = {};
    this.props.loadschedules(JSON.stringify(requires));
    this.props.clearSchedulesOfSelectedDay();
    this.setState({
      showFilterPannel: false,
      filterRequires:
      {
        startDate: this.getNowFormatDate(),
        endDate: this.getNowFormatDate(),
        typeId: ''
      },
    });
  }

  comfirmFilterReq() {
    const {endDate, startDate} = this.state.filterRequires;
    if (new Date(startDate) > new Date(endDate)) {
      this.props.showDiaglog('开始时间不能大于结束时间');
      return;
    }
    this.setState({showFilterPannel: false});
    this.props.loadschedules(JSON.stringify(this.state.filterRequires));
    this.props.clearSchedulesOfSelectedDay();
  }

  render() {
    const scheduleTypes = this.props.scheduleTypes;
    return (
      <div className={styles.scheduleFilterBtn}>
        <h3 onClick={this.toggleFilterPannel.bind(this)}><i></i>筛选</h3>
        <p className={styles.modolBackDrop}
              style={{display: this.state.showFilterPannel ? 'block' : 'none'}}></p>
        <section className={styles.scheduleFilterCon}
            style={{display: this.state.showFilterPannel ? 'block' : 'none'}}>
          <div className="clearfix">
            <i className="left">日期</i>
            <section className={'left clearfix ' + styles.selectDateFilter}>
              <div className={this.state.showStartDatePicker ? styles.filterDateOn + ' left ' + styles.filterDate : 'left ' + styles.filterDate}>
                <div onClick={this.toggleStartDatePicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.startDate}</span>
                  <p className="sanjiao-bt"></p>
                </div>
                <div className={styles.filterFirstPicker + ' datePlanFilterPicker'}
                  style={{display: this.state.showStartDatePicker ? 'block' : 'none'}}>
                  <DayPicker
                      onDayClick={(event, day) => this.startDatePickerClickHandler(day)}
                      localeUtils={LocaleUtils}
                      locale="zh-cn" />
                </div>
              </div>
              <p className={styles.dateSpan + ' left'}>至</p>
              <div className={this.state.showEndDatePicker ? styles.filterDateOn + ' right ' + styles.filterDate : 'right ' + styles.filterDate}>
                <div
                  onClick={this.toggleEndDatePicker.bind(this)} className="select">
                  <span>{this.state.filterRequires.endDate === null ? '不限' : this.state.filterRequires.endDate}</span>
                  <p className="sanjiao-bt"></p>
                </div>
                <div className={styles.filterSecondPicker + ' datePlanFilterPicker'}
                  style={{display: this.state.showEndDatePicker ? 'block' : 'none'}}>
                  <DayPicker
                      onDayClick={(event, day) => this.endDatePickerClickHandler(day)}
                      localeUtils={LocaleUtils}
                      locale="zh-cn" />
                </div>
              </div>
            </section>
          </div>
          <div className={'clearfix ' + styles.filterType}>
            <i className="left">类型</i>
            <section className="left">
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
              <h3 className="right" style={{display: this.state.showFilterPannel ? 'block' : 'none'}}
                onClick={() => this.comfirmFilterReq()}><i></i>确认</h3>
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
