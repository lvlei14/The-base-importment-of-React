import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getPassword } from '../../redux/modules/auth';

import { push } from 'react-router-redux';

const styles = require('./Home.scss');
import { loadschedules } from '../../redux/modules/datePlan';

@connect(
  state => ({user: state.auth.user, ...state.schedules}),
  { getPassword, loadschedules }
)
export default class Home extends Component {
  static propTypes = {
    getPassword: PropTypes.func,
    user: PropTypes.object,
    loadschedules: PropTypes.func,
    schedules: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    const date = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1);
    const requires = {
      date: date
    };
    this.props.loadschedules(JSON.stringify(requires));
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

  render() {
    const zhibanPng = require('../../images/homeZhiban.png');
    const shoushuPng = require('../../images/homeShoushu.png');
    const nowDate = this.getNowFormatDate();
    console.log(this.props.schedules);
    const schedules = this.props.schedules.list || [];
    const scheduleItems = schedules && schedules.filter((item) => item.date === nowDate);
    return (
      <div>
        <HeadNaviBar showBackArrow={false}>首页</HeadNaviBar>
        <div className={ styles.home}>
          <ul className={'clearfix topCardBg ' + styles.kuaiNav}>
            <li className="left">
              <Link to="/duty/self">
                <article className={styles.navLiFir}>
                  <img src = {zhibanPng} alt="值班入口" />
                </article>
                <p>值班</p>
              </Link>
            </li>
            <li className="left">
              <Link to="/opera">
                <article className={styles.navLiThr}>
                  <img src = {shoushuPng} alt="手术入口" />
                </article>
                <p>手术</p>
              </Link>
            </li>
          </ul>
          <div className={'clearfix topCardBg ' + styles.datePlan}>
            <header>
              <strong className="left"></strong>
              <h3 className="left">今日日程（{nowDate}）</h3>
              <footer className="right">
                <Link to = "/date-plan">
                  更多
                  <i className="fa fa-angle-left"></i>
                </Link>
              </footer>
            </header>
            <ScdItems scheduleItems = {scheduleItems} />
          </div>
        </div>
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
      itemIcon = <i className="left">其</i>;
    }
    return itemIcon;
  }

  goDatePlanDetail(id, typeVal) {
    this.props.pushState('/date-plan-detail/' + id + '/' + typeVal);
  }

  handleTime(time) {
    const newTime = time.substr(time.length - 5);
    return newTime;
  }

  render() {
    const scheduleItems = this.props.scheduleItems || [];
    // console.log('item接收到的数据');
    // console.log(scheduleItems);
    let schItemIkey = 0;
    return (
      <div>
        {
          scheduleItems.length ?
            scheduleItems.map((scheduleItem)=> {
              return (
                <ul className={styles.curDayContact} key={scheduleItem.date.value}>
                  {
                    scheduleItem.schedules && scheduleItem.schedules.map((itemTimePeriod) => {
                      schItemIkey = schItemIkey + 1;
                      return (
                        <li key={schItemIkey} onClick={() => this.goDatePlanDetail(itemTimePeriod._id, itemTimePeriod.type.value)}>
                          <div>
                            <span className={styles.timeStart + ' left'}>{this.handleTime(itemTimePeriod.start_time)}</span>
                            {this.itemTimeIcon(itemTimePeriod)}
                            <span className="left">{itemTimePeriod.type.value}</span>
                            <span className={styles.timeRange + ' left'}>{this.handleTime(itemTimePeriod.start_time)} － {this.handleTime(itemTimePeriod.end_time)}</span>
                            <span style={{display: itemTimePeriod.is_inner.value === '院外' ? 'boock' : 'none'}}
                              className={styles.outside + ' left'}>院外</span>
                            <span style={{display: itemTimePeriod.conflict ? 'block' : 'none'}}
                             className={styles.conflict + ' left'}><i>!</i>有冲突</span>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              );
            })
          : <p className="noResult">没有日程安排</p>
        }
      </div>
    );
  }
}
