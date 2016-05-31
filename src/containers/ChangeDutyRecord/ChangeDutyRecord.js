import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import { loadChangeDutyRecords } from '../../redux/modules/changeDuty';

const styles = require('../ChangeDutyRecord/ChangeDutyRecord.scss');
@connect(
  state => ({...state.changeDutyRecords}), {
    loadChangeDutyRecords,
  }
)
export default class ChangeDutyRecord extends Component {
  static propTypes = {
    loadChangeDutyRecords: PropTypes.func,
    changeDutyRecords: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      monthState: '4',
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loadChangeDutyRecords();
  }

  changeMonth(event) {
    this.setState({
      monthState: event.target.value
    });
  }

  handleState(recordState) {
    if (recordState === 'handling') {
      return (
        <span>处理中</span>
      );
    } else if (recordState === 'success') {
      return (
        <span>换班<span className={styles.spanSuccess}>成功</span></span>
      );
    } else if (recordState === 'fail') {
      return (
        <span>换班<span className={styles.spanFail}>失败</span></span>
      );
    }
  }

  render() {
    const changeDutyRecords = this.props.changeDutyRecords;
    const monthRecords = changeDutyRecords && changeDutyRecords.filter((item) => item.month === this.state.monthState);
    const monthHandlingRecords = monthRecords && monthRecords.filter((item) => item.handleState === 'handling');
    const monthHandledRecords = monthRecords && monthRecords.filter((item) => item.handleState !== 'handling');
    console.log(monthHandledRecords);
    return (
      <div>
        <HeadNaviBar>换班日志</HeadNaviBar>
        <div className={'bodyBgWhiteZindex select clearfix ' + styles.selectMonth}>
          <select value={this.state.monthState} onChange={this.changeMonth.bind(this)}>
            <option value="4">4月</option>
            <option value="5">5月</option>
          </select>
          <p></p>
        </div>

        <div>
          <p className="bodyBgWhite"></p>
          <div className={'bodyBgWhiteZindex ' + styles.dutyRecords}>
            {
              ['待处理', '已完成'].map((item) => {
                const records = item === '待处理' ? monthHandlingRecords : monthHandledRecords;
                return (
                  <section>
                    <header>{item}</header>
                    <ul>
                      {
                        records && records.length ?
                          records.map((record) => {
                            return (
                              <li key={record.time}>
                                <article>{record.requestDate}</article>
                                <p>{record.hanler} {record.requestDate}（{record.requestWeek}）申请：</p>
                                <p>
                                  与{record.handered} {record.date}（{record.week}）换班，
                                  {this.handleState(record.handleState)}
                                </p>
                              </li>
                            );
                          })
                        : <p className="noResult">无内容</p>
                      }
                    </ul>
                  </section>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
