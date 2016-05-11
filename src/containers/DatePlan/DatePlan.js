import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import TabOutside from '../../components/TabOutside/TabOutside';
import { connect } from 'react-redux';

import { showPopUp } from '../../redux/modules/popUp';
import { loadschedules } from '../../redux/modules/datePlan';

const styles = require('./DatePlan.scss');
@connect(
  state => ({...state.schedules}), {
    loadschedules
  }
)
export default class DatePlan extends Component {
  static propTypes = {
    schedules: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      tabTypeState: 'month',
      currentDayId: '2',
      scheduleItems: this.props.schedules,
      showFilterRequires: false,
      filterRequires:
      {
        type: '',
        date: ''
      }
    };
  }

  componentDidMount() {
    //  TODO 接口地址
    //  this.props.loadschedules();
  }


  curDayContactList(curDayContactComponent, curDayContact) {
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
      tabTypeState: tabType
    });
  }

  clickCalendar(id) {
    console.log(id);
    this.setState({
      currentDayId: id
    });
  }

  clickFilterScheduleType(type) {
    this.setState({
      filterRequires:
      {
        type: type
      }
    });
  }

  showFilterReq() {
    this.setState({
      showFilterRequires: true
    });
  }

  hideFilterReq(schedules) {
    this.setState({
      showFilterRequires: false
    });

    //  TODO 筛选下面的东西
    //  const filterTypesResult = schedules && schedules.scheduleLists && schedules.scheduleLists.filter((item) => item.type === 'check');
    //  this.setState({
    //    scheduleItems: filterTypesResult
    //  });
  }

  render() {
    const schedules = this.props.schedules;
    console.log('数据');
    console.log(schedules);
    const curDayScheduleItem = schedules && schedules.filter((item) => item.id === this.state.currentDayId);
    let scheduleItems;
    if (this.state.tabTypeState === 'month') {
      scheduleItems = curDayScheduleItem;
    }else if (this.state.tabTypeState === 'list') {
      scheduleItems = this.state.scheduleItems;
    }
    const filterScheduleTypes = [
      'check', 'metting', 'opera', 'duty'
    ];


    return (
      <div>
        <HeadNaviBar>日程</HeadNaviBar>
        <div className={styles.dateTop}>
          <TabOutside>
            <li className={this.state.tabTypeState === 'month' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('month')}>月</li>
            <li className={this.state.tabTypeState === 'list' ? styles.curTab + ' left' : 'left'} onClick={() => this.changeTabType('list')}>列表</li>
          </TabOutside>
          {
            this.state.tabTypeState === 'month' ?
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
                      schedules && schedules.map((schedule) => {
                        return (
                          <td onClick={() => this.clickCalendar(schedule.id)} className={ this.state.currentDayId === schedule.id ? styles.curTd : ''}>
                            <div>
                              {schedule.day}
                              <p>
                                <span className={schedule.outsidePlan ? styles.outside : ''}></span>
                                <span className={schedule.sidePlan ? styles.side : ''}></span>
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
          {
            this.state.tabTypeState === 'list' ?
              <div className={styles.scheduleFilterBtn}>
                <h3 style={{display: this.state.showFilterRequires ? 'none' : 'block'}} onClick={this.showFilterReq.bind(this)}><i></i>筛选</h3>
                <h3 style={{display: this.state.showFilterRequires ? 'block' : 'none'}} onClick={() => this.hideFilterReq(schedules)}><i></i>完成</h3>
                <section className={styles.scheduleFilterCon} style={{display: this.state.showFilterRequires ? 'block' : 'none'}}>
                  <div className="clearfix">
                    <i className="left">日期</i>
                    <p className="left">
                      <input type="date" /> 至 <input type="date" />
                    </p>
                  </div>
                  <div className="clearfix">
                    <i className="left">类型</i>
                    <p className="left">
                      {
                        filterScheduleTypes && filterScheduleTypes.map((filterScheduleType) => {
                          return (
                            <span onClick={() => this.clickFilterScheduleType(filterScheduleType)}>{ filterScheduleType}</span>
                          );
                        })
                      }
                    </p>
                  </div>
                </section>
              </div>
              : ''
          }
        </div>

        <div>
          {
            scheduleItems && scheduleItems.map((scheduleItem)=> {
              return (
                <CardBg>
                  <p className={styles.curDaytitle}>{scheduleItem.date}</p>
                  <ul className={styles.curDayContact}>
                    {
                      scheduleItem && scheduleItem.scheduleLists && scheduleItem.scheduleLists.length ?
                        scheduleItem.scheduleLists.map((itemTimePeriod) => {
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
    //  TODO 弹窗
    //  this.props.showPopUp('添加日程',
    //  'div内容'
    //  );
  }

  render() {
    return (
      <a className={styles.addBigBtn} onClick={this.addPlan.bind(this)}>+</a>
    );
  }
}
