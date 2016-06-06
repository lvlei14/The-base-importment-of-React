import React, { Component, PropTypes } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import TabOutside from '../../components/TabOutside/TabOutside';
import { connect } from 'react-redux';

import { showPopUp } from '../../redux/modules/popUp';
import { loadschedules } from '../../redux/modules/datePlan';
import { loadtypes } from '../../redux/modules/datePlan';

const styles = require('./DatePlan.scss');

@connect(
  state => ({...state.schedules}), {
    loadschedules,
    loadtypes,
  }
)

export default class DatePlan extends Component {
  static propTypes = {
    schedules: PropTypes.array,
    scheduleTypes: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '2016/6/2',
      tabTypeState: 'month',
      selectedDayItems: [],
      monthItems: this.filterSelectedMonthItems('2016', '6'),
      isClickFilter: false,
      scheduleItems: this.handleData(this.props.schedules),
      filterItems: [],
      showFilterRequires: false,
      filterRequires:
      {
        firstDate: '2016-05-13',
        secondDate: '',
        type: 'all'
      }
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    //  this.props.loadschedules();
    //  this.props.loadtypes();
  }

  changeTabType(tabType) {
    this.setState({
      tabTypeState: tabType,
      isClickFilter: false
    });
  }

  clickHandleDay(event, day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    const handledSchedules = this.handleData(this.props.schedules);
    const curDayScheduleItem = handledSchedules && handledSchedules.filter((item) => item.date === day);
    this.setState({
      selectedDay: selected ? null : day,
      selectedDayItems: curDayScheduleItem
    });
  }

  filterSelectedMonthItems(year, month) {
    const handledSchedules = this.handleData(this.props.schedules);
    const selectMonthItems = handledSchedules && handledSchedules.filter((item) => item.year === year && item.month === month);
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

  hideFilterReq(schedules) {
    let filterTypesResult = schedules;
    const requires = this.state.filterRequires;
    //  TODO 如果什么都没有改变,就不设置有没有点击筛选
    this.setState({
      showFilterRequires: false,
      isClickFilter: true,
    });

    if (requires.secondDate && requires.firstDate > requires.secondDate) {
      //  TODO 弹窗提示:开始日期不能大于结束日期
      return;
    }

    if (requires.secondDate !== '' && requires.type !== 'all') {
      if (requires.type === 'in') {
        filterTypesResult = schedules && schedules.filter((item) =>
          item.date <= requires.secondDate && item.date >= requires.firstDate
          && item.sidePlan === true
        );
      }else if (requires.type === 'out') {
        filterTypesResult = schedules && schedules.filter((item) =>
          item.date <= requires.secondDate && item.date >= requires.firstDate
          && item.outsidePlan === true
        );
      }else {
        filterTypesResult = schedules && schedules.filter((item) =>
          item.date <= requires.secondDate && item.date >= requires.firstDate
          && item.type === requires.type
        );
      }
    }else if (requires.secondDate === '' && requires.type !== 'all') {
      if (requires.type === 'in') {
        filterTypesResult = schedules && schedules.filter((item) =>
            item.date >= requires.firstDate && item.sidePlan === true
          );
      }else if (requires.type === 'out') {
        filterTypesResult = schedules && schedules.filter((item) =>
           item.date >= requires.firstDate && item.outsidePlan === true
          );
      }else {
        filterTypesResult = schedules && schedules.filter((item) =>
          item.type === requires.type && item.date >= requires.firstDate
        );
      }
    }else if (requires.secondDate !== '' && requires.type === 'all') {
      filterTypesResult = schedules && schedules.filter((item) =>
        item.date <= requires.secondDate && item.date >= requires.firstDate
      );
    }else if (requires.secondDate === '' && requires.type === 'all') {
      filterTypesResult = schedules && schedules.filter((item) =>
          item.date >= requires.firstDate
        );
    }

    this.setState({
      filterItems: this.handleData(filterTypesResult)
    });
  }

  handleData(schedules) {
    const handledSchedules = [];

    for (const key in schedules) {
      if (!schedules.hasOwnProperty(key)) continue;  // TODO 去除error信息
      const objSchedulesLists = {
        type: schedules[key].type,
        time: schedules[key].time,
        start: schedules[key].start,
        isconflict: schedules[key].isconflict,
        sidePlan: schedules[key].sidePlan,
        outsidePlan: schedules[key].outsidePlan
      };
      const obj = {
        id: schedules[key].id,
        date: schedules[key].date,
        day: schedules[key].day,
        month: schedules[key].month,
        year: schedules[key].year,
        schedulesLists: [
          objSchedulesLists
        ]
      };

      let common;
      for (const prop in handledSchedules) {
        if (schedules[key].date === handledSchedules[prop].date) {
          common = prop;
        }
      }
      if (common) {
        handledSchedules[common].schedulesLists.push(objSchedulesLists);
      } else {
        handledSchedules.push(obj);
      }
    }
    return handledSchedules;
  }

  showSingleDayItem(dayItem, date) {
    if (dayItem.day === date) {
      const outsideNum = dayItem.schedulesLists && dayItem.schedulesLists.filter((item) => !item.sidePlan);
      const sideNum = dayItem.schedulesLists && dayItem.schedulesLists.filter((item) => item.sidePlan);
      if (outsideNum.length > 0 && sideNum.length > 0) {
        return (
          <p>
            <span className={styles.outside}></span>
            &nbsp;&nbsp;
            <span className={styles.side}></span>
          </p>
        );
      }
      if (outsideNum.length > 0 && sideNum.length === 0) {
        return (
          <p>
            <span className={styles.outside}></span>
          </p>
        );
      }
      if (sideNum.length > 0 && outsideNum.length === 0) {
        return (
          <p>
            <span className={styles.side}></span>
          </p>
        );
      }
    }
  }

  renderDay(day) {
    const dayItems = this.state.monthItems;
    const date = day.getDate().toString();
    return (
      <div>
        {date}
        <div className={styles.dayItemOut}>
          {
            dayItems && dayItems.map((dayItem) => {
              return (
                this.showSingleDayItem(dayItem, date)
              );
            })
          }
        </div>
      </div>
    );
  }
  render() {
    const schedules = this.props.schedules;
    let scheduleItems;

    if (!this.state.isClickFilter) {
      if (this.state.tabTypeState === 'month') {
        scheduleItems = this.state.selectedDayItems;
      }
      if (this.state.tabTypeState === 'list') {
        scheduleItems = this.state.scheduleItems;
      }
    }else {
      scheduleItems = this.state.filterItems;
    }
    const selectedDay = this.state.selectedDay;
    console.log(selectedDay);

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
                filterScheduleTypes = {this.props.scheduleTypes} />
            </div>
          </div>
          <div className={styles.datePlanPicker}>
            {
              this.state.tabTypeState === 'month' && this.state.isClickFilter === false ?
                <DayPicker
                    disabledDays={DateUtils.isPastDay}
                    enableOutsideDays
                    onDayClick={this.clickHandleDay.bind(this)}
                    renderDay={this.renderDay.bind(this)} />
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
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">查</i>
        <span className="left">查房</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
        <span className={styles.outside + ' left'}>院外</span>
        <span className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
      , curDayContact);
  }

  mettingContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.metting}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">会</i>
        <span className="left">会议</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
      , curDayContact);
  }

  operaContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.opera}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">术</i>
        <span className="left">手术</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
      , curDayContact);
  }

  dutyContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.duty}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">值</i>
        <span className="left">值班</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
      , curDayContact);
  }

  render() {
    const scheduleItems = this.props.scheduleItems;
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
                      scheduleItem && scheduleItem.schedulesLists && scheduleItem.schedulesLists.length ?
                        scheduleItem.schedulesLists.map((itemTimePeriod) => {
                          if (itemTimePeriod.type === 'check') {
                            return this.checkContact(itemTimePeriod);
                          }else if (itemTimePeriod.type === 'metting') {
                            return this.mettingContact(itemTimePeriod);
                          }else if (itemTimePeriod.type === 'opera') {
                            return this.operaContact(itemTimePeriod);
                          }else if (itemTimePeriod.type === 'duty') {
                            return this.dutyContact(itemTimePeriod);
                          }
                        })
                        : '当天没有日程安排'
                    }
                  </ul>
                </CardBg>
              );
            })
          : <div className="noResult">
              <p>没有找到相关数据</p>
            </div>
        }
      </div>
    );
  }
}


/**
  * component: scheduleFilterItem
  */
class FilterScheduleItem extends Component {

  static propTypes = {
    showFilterRequires: PropTypes.boolean,
    filterRequires: PropTypes.object,
    changeFilterFirstDate: PropTypes.func,
    changeFilterSecondDate: PropTypes.func,
    clickFilterScheduleType: PropTypes.func,
    filterScheduleTypes: PropTypes.object,
  };

  componentDidMount() {
  }

  changeFilterFirstDate() {
    this.props.changeFilterFirstDate();
  }

  changeFilterSecondDate() {
    this.props.changeFilterSecondDate();
  }

  clickFilterScheduleType(key) {
    this.props.clickFilterScheduleType(key);
  }

  render() {
    const filterScheduleTypes = this.props.filterScheduleTypes;
    return (
      <section className={styles.scheduleFilterCon} style={{display: this.props.showFilterRequires ? 'block' : 'none'}}>
        <div className={styles.modolBackDrop}></div>
        <div className="clearfix">
          <i className="left">日期</i>
          <section className="left">
            <input type="date"
                   value={this.props.filterRequires.firstDate}
                   onChange={this.changeFilterFirstDate.bind(this)} />
            <span className={styles.dateSpan}>至</span>
            <input type="date"
                   value={this.props.filterRequires.secondDate}
                   onChange={this.changeFilterSecondDate.bind(this)} />
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
                      filterScheduleTypes[key] && filterScheduleTypes[key].map((filterScheduleType) => {
                        return (
                          <span className={this.props.filterRequires.type === filterScheduleType.ywname ? styles.curSpan : ''}
                                onClick={() => this.clickFilterScheduleType(filterScheduleType.ywname)}
                          >{ filterScheduleType.zwname}</span>
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
  state => ({...state.popUp}),
  {
    showPopUp,
  }
)
class AddPlan extends Component {

  componentDidMount() {

  }

  addPlan() {
    //  TODO pushState
    // this.props.pushState(null, `/app-date-plan`);
  }

  render() {
    return (
      <a className={styles.addBigBtn} onClick={this.addPlan.bind(this)}>+</a>
    );
  }
}
