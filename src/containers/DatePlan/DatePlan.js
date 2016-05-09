import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import TabOutside from '../../components/TabOutside/TabOutside';
import { connect } from 'react-redux';
import { showPopUp } from 'redux/modules/popUp';

const styles = require('./DatePlan.scss');

export default class DatePlan extends Component {
  static propTypes = {
    showPopUp: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      tabState: '',
      curDayContacts: [
        {
          type: 'check',
          time: '14:00-16:00',
          start: '12:00',
          isconflict: false,
          isoutside: false
        },
        {
          type: 'metting',
          time: '14:00-16:00',
          start: '12:00',
          isconflict: false,
          isoutside: false
        },
        {
          type: 'opera',
          time: '14:00-16:00',
          start: '12:00',
          isconflict: false,
          isoutside: false
        },
        {
          type: 'duty',
          time: '14:00-16:00',
          start: '12:00',
          isconflict: false,
          isoutside: false
        }
      ] // 选中那天的日程数据
    };
  }

  curDayContactList(curDayContactComponent) {
    return (
      <li>{curDayContactComponent}</li>
    );
  }

  checkContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.checkPlan}>
        <span className={ styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">查</i>
        <span className="left">查房</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
        <span className={styles.outside + ' left'}>院外</span>
        <span className={styles.conflict + ' left'}><i>!</i>有冲突</span>
      </div>
    );
  }

  mettingContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.metting}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">会</i>
        <span className="left">会议</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
    );
  }

  operaContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.opera}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">术</i>
        <span className="left">手术</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
    );
  }

  dutyContact(curDayContact) {
    return this.curDayContactList(
      <div className={styles.duty}>
        <span className={styles.timeStart + ' left'}>{curDayContact.start}</span>
        <i className="left">值</i>
        <span className="left">值班</span>
        <span className={styles.timeRange + ' left'}>{curDayContact.time}</span>
      </div>
    );
  }


  render() {
    const dates = [
      {
        id: '1',
        outsidePlan: false,
        sidePlan: true
      },
      {
        id: '2',
        outsidePlan: true,
        sidePlan: true
      },
      {
        id: '3',
        outsidePlan: false,
        sidePlan: false
      }
    ];
    return (
      <div>
        <HeadNaviBar>日程</HeadNaviBar>
        <div className={styles.dateTop}>
          <TabOutside>

            <li className={styles.curTab + ' left'}>月</li>
            <li className="left">列表</li>
          </TabOutside>
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
                    dates && dates.map((date) => {
                      return (
                        <td>
                          {date.id}
                          <p>
                            <span className={date.outsidePlan ? styles.outside : ''}></span>
                            <span className={date.sidePlan ? styles.side : ''}></span>
                          </p>
                        </td>
                      );
                    })
                  }
                </tr>
              </tbody>
            </table>
          </section>
          <DatePlanList />
        </div>

        <CardBg>
          <p className={styles.curDaytitle}>2016.01.05</p>
          <ul className={styles.curDayContact}>
            {
              this.state.curDayContacts && this.state.curDayContacts.map((curDayContact)=> {
                if (curDayContact.type === 'check') {
                  return this.checkContact(curDayContact);
                }else if (curDayContact.type === 'metting') {
                  return this.mettingContact(curDayContact);
                }else if (curDayContact.type === 'opera') {
                  return this.operaContact(curDayContact);
                }else if (curDayContact.type === 'duty') {
                  return this.dutyContact(curDayContact);
                }
              })
            }
          </ul>
        </CardBg>

        <AddPlan />
      </div>
    );
  }
}

/**
 * component: add paln btn
 */
@connect(
  state => ({popUp: state.popUp}), {
    showPopUp
  }
)

class AddPlan extends Component {
  static propTypes = {
    showPopUp: PropTypes.func,
    popUp: PropTypes.array
  };

  addPlan() {
    // TODO 弹窗
    // this.props.showPopUp('添加日程',
    //   <div>添加日程内容html</div>
    // );
  }

  render() {
    return (
      <a className={styles.addBigBtn} onClick={this.addPlan.bind(this)}>+</a>
    );
  }
}
