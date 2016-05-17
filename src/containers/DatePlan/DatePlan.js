import React, { Component, PropTypes } from 'react';
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
      tabTypeState: 'month',
      currentDayId: '2',
      clickDayItems: [],
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
    this.clickCalendar(this.state.currentDayId);
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

  changeTabType(tabType) {
    this.setState({
      tabTypeState: tabType,
      isClickFilter: false
    });
  }

  clickCalendar(id) {
    const handledSchedules = this.handleData(this.props.schedules);
    const curDayScheduleItem = handledSchedules && handledSchedules.filter((item) => item.id === id);
    this.setState({
      currentDayId: id,
      clickDayItems: curDayScheduleItem
    });
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

  render() {
    const schedules = this.props.schedules;
    const handledSchedules = this.handleData(this.props.schedules);
    const filterScheduleTypes = this.props.scheduleTypes;
    let scheduleItems;

    if (!this.state.isClickFilter) {
      if (this.state.tabTypeState === 'month') {
        scheduleItems = this.state.clickDayItems;
      }
      if (this.state.tabTypeState === 'list') {
        scheduleItems = this.state.scheduleItems;
      }
    }else {
      scheduleItems = this.state.filterItems;
    }

    return (
      <div>
        <HeadNaviBar>日程</HeadNaviBar>
        <div className={styles.dateTop}>
          <TabOutside>
            <li className={this.state.tabTypeState === 'month' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('month')}>月</li>
            <li className={this.state.tabTypeState === 'list' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('list')}>列表</li>
          </TabOutside>
          {
            this.state.tabTypeState === 'month' && this.state.isClickFilter === false ?
              <section>
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
                      handledSchedules && handledSchedules.map((handledSchedule) => {
                        return (
                          <td onClick={() => this.clickCalendar(handledSchedule.id)} className={this.state.currentDayId === handledSchedule.id ? styles.curTd : ''}>
                            <div>
                              {handledSchedule.day}
                              <p>
                                {/* //TODO 院内院外图标展示
                                <span className={handledSchedule.outsidePlan ? styles.outside : ''}></span>
                                <span className={schedule.sidePlan ? styles.side : ''}></span>
                                 */}
                              </p>
                            </div>
                          </td>
                        );
                      })
                    }
                  </tr>
                  </tbody>
                </table>

              </section>
              : ''
          }

          <div className={styles.scheduleFilterBtn}>
            <h3 style={{display: this.state.showFilterRequires ? 'none' : 'block'}} onClick={this.showFilterReq.bind(this)}><i></i>筛选</h3>
            <h3 style={{display: this.state.showFilterRequires ? 'block' : 'none'}} onClick={() => this.hideFilterReq(schedules)}><i></i>完成</h3>
            <section className={styles.scheduleFilterCon} style={{display: this.state.showFilterRequires ? 'block' : 'none'}}>
              <div className={styles.modolBackDrop}></div>
              <div className="clearfix">
                <i className="left">日期</i>
                <section className="left">
                  <input type="date"
                         value={this.state.filterRequires.firstDate}
                         onChange={this.changeFilterFirstDate.bind(this)} />
                  <span className={styles.dateSpan}>至</span>
                  <input type="date"
                         value={this.state.filterRequires.secondDate}
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
                            <span className={this.state.filterRequires.type === key ? styles.curSpan : ''}
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
                                <span className={this.state.filterRequires.type === filterScheduleType.ywname ? styles.curSpan : ''}
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
          </div>
        </div>

        <div>
          {
            scheduleItems.length ?
              scheduleItems.map((scheduleItem)=> {
                return (
                  <CardBg>
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

        <AddPlan />
      </div>
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
