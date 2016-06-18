import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import TabOutside from '../../components/TabOutside/TabOutside';
import Modal from '../../components/Modal/Modal';

import { loadCDutyRecords } from '../../redux/modules/changeDutyRecord';
import { acceptCDuty } from '../../redux/modules/changeDutyRecord';
import { denyCDuty } from '../../redux/modules/changeDutyRecord';

let recordObj = {};
const styles = require('../ChangeDutyRecord/ChangeDutyRecord.scss');

@connect(
  state => ({...state.changeDutyRecords}), {
    loadCDutyRecords,
    acceptCDuty,
    denyCDuty
  }
)
export default class ChangeDutyRecord extends Component {
  static propTypes = {
    loadCDutyRecords: PropTypes.func,
    cDutyRecords: PropTypes.array,
    acceptCDuty: PropTypes.func,
    denyCDuty: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabTypeState: 'mySend',
      showModal: false,
      recordId: '',
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    const uid = '01';
    this.props.loadCDutyRecords(uid, 'sent');
  }

  handleState(recordState) {
    if (recordState === 'send') {
      return (
        <span>处理中</span>
      );
    } else if (recordState === 'accepted') {
      return (
        <span>换班<span className={styles.spanSuccess}>成功</span></span>
      );
    } else if (recordState === 'denied') {
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

  clickShowModal(record) {
    if (record.status === 'send') {
      this.setState({
        showModal: true,
        recordId: record._id
      });
    }
    recordObj = record;
  }

  clickHideModal() {
    this.setState({
      showModal: false,
    });
  }

  clickdeny() {
    this.clickHideModal();
    this.props.denyCDuty();
  }

  clickaccept() {
    this.clickHideModal();
    this.props.acceptCDuty();
  }

  render() {
    const cDutyRecords = this.props.cDutyRecords;
    const unHandleRecords = cDutyRecords && cDutyRecords.filter((item) => item.status === 'send');
    const HandledRecords = cDutyRecords && cDutyRecords.filter((item) => item.status !== 'send');
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
        <div style={{display: this.state.tabTypeState === 'mySend' ? 'block' : 'none'}}>
          <p className="bodyBgWhite"></p>
          <div className={'bodyBgWhiteZindex ' + styles.dutyRecords}>
            {
              ['待处理', '已完成'].map((item) => {
                const records = item === '待处理' ? unHandleRecords : HandledRecords;
                return (
                  <section>
                    <header>{item}</header>
                    <ul>
                      {
                        records && records.length ?
                          records.map((record) => {
                            return (
                              <li key={record._id} onClick={() => this.clickShowModal(record)}>
                                <article>{record.fromAttendance.created}</article>
                                <p>{record.fromDoctor.name} {record.fromAttendance.date}申请：</p>
                                <p>
                                  与{record.toDoctor.name} {record.toAttendance.date}换班，
                                  {this.handleState(record.status)}
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

          <div className="noResult" style={{display: this.state.tabTypeState === 'myReceive' ? 'block' : 'none'}}>
            该功能正在开发中。。。
          </div>

          <div style={{display: this.state.showModal ? 'block' : 'none'}}>
            <Modal
              title = {'换班申请'}
              confirmText = {'同意'}
              cancelText = {'拒绝'}
              clickHideModal = {this.clickHideModal.bind(this)}
              clickConfirm = {this.clickaccept.bind(this)}
              clickCancel = {this.clickdeny.bind(this)} >
                <i className={styles.dutyJzFColor}>{recordObj.fromDoctor && recordObj.fromDoctor.name}
                {recordObj.fromAttendance && recordObj.fromAttendance.date}</i>
                请求与您<i className={styles.dutyJzFColor}>{recordObj.toAttendance && recordObj.toAttendance.date}</i>的日程进行换班，是否接受换班？
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

