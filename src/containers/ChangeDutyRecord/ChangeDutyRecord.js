import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import TabOutside from '../../components/TabOutside/TabOutside';

import { loadCDutyRecords } from '../../redux/modules/changeDutyRecord';

const styles = require('../ChangeDutyRecord/ChangeDutyRecord.scss');
@connect(
  state => ({...state.changeDutyRecords}), {
    loadCDutyRecords,
  }
)
export default class ChangeDutyRecord extends Component {
  static propTypes = {
    loadCDutyRecords: PropTypes.func,
    cDutyRecords: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabTypeState: 'mySend'
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loadCDutyRecords();
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

  changeTabType(type) {
    this.setState({
      tabTypeState: type
    });
  }

  render() {
    const cDutyRecords = this.props.cDutyRecords;
    const monthRecords = cDutyRecords && cDutyRecords.filter((item) => item.month === this.state.monthState);
    const monthHandlingRecords = monthRecords && monthRecords.filter((item) => item.handleState === 'handling');
    const monthHandledRecords = monthRecords && monthRecords.filter((item) => item.handleState !== 'handling');
    console.log(monthHandledRecords);
    return (
      <div>
        <HeadNaviBar>换班日志</HeadNaviBar>
        <div className={styles.dutyReTab}>
          <TabOutside>
            <li className={this.state.tabTypeState === 'mySend' ? styles.curTab + ' left' : 'left'}
              onClick={() => this.changeTabType('mySend')}>我发起的</li>
            <li className={this.state.tabTypeState === 'myReceive' ? styles.curTab + ' left' : 'left'}
              onClick={() => this.changeTabType('myReceive')}>发给我的</li>
          </TabOutside>
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
