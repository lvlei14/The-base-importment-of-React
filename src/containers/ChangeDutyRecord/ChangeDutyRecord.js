import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import TabOutside from '../../components/TabOutside/TabOutside';
import Modal from '../../components/Modal/Modal';
import { showDiaglog } from '../../redux/modules/diaglog';

import { loadCDutyRecords } from '../../redux/modules/changeDutyRecord';
import { acceptCDuty } from '../../redux/modules/changeDutyRecord';
import { denyCDuty } from '../../redux/modules/changeDutyRecord';

let recordObj = {};
const styles = require('../ChangeDutyRecord/ChangeDutyRecord.scss');

@connect(
  state => ({...state.changeDutyRecords, user: state.auth.user}), {
    loadCDutyRecords,
    acceptCDuty,
    denyCDuty,
    showDiaglog
  }
)
export default class ChangeDutyRecord extends Component {
  static propTypes = {
    loadCDutyRecords: PropTypes.func,
    cDutyRecords: PropTypes.array,
    acceptCDuty: PropTypes.func,
    denyCDuty: PropTypes.func,
    user: PropTypes.object,
    cDutyAcceptSuccess: PropTypes.bool,
    cDutyDenySuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    showDiaglog: PropTypes.func,
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
    const uid = this.props.user && this.props.user._id;
    this.props.loadCDutyRecords(uid, 'sent');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.successMsg && nextProps.successMsg) {
      if (!this.props.cDutyAcceptSuccess && nextProps.cDutyAcceptSuccess) {
        this.props.showDiaglog(nextProps.successMsg, '/duty/self');
      }
      if (!this.props.cDutyDenySuccess && nextProps.cDutyDenySuccess) {
        this.props.showDiaglog(nextProps.successMsg, '/duty/self');
      }
    }
    if (!this.props.errorMsg && nextProps.errorMsg) {
      if (!this.props.cDutyAcceptSuccess && !nextProps.cDutyAcceptSuccess) {
        this.props.showDiaglog(nextProps.errorMsg);
      }
      if (!this.props.cDutyDenySuccess && !nextProps.cDutyDenySuccess) {
        this.props.showDiaglog(nextProps.errorMsg);
      }
    }
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
    } else if (recordState === 'overdued') {
      return (
        <span>换班<span className={styles.spanOverdue}>过期</span></span>
      );
    }
  }

  changeTabType(type) {
    // const uid = '01';
    const uid = this.props.user && this.props.user._id;
    if (type === 'myReceive') {
      this.props.loadCDutyRecords(uid, 'received');
    } else if (type === 'mySend') {
      this.props.loadCDutyRecords(uid, 'sent');
    }
    this.setState({
      tabTypeState: type
    });
  }

  clickShowModal(record) {
    if (record.status === 'send' && this.state.tabTypeState === 'myReceive') {
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
    const eid = this.state.recordId;
    const uid = this.props.user && this.props.user._id;
    this.props.denyCDuty(uid, eid);
  }

  clickaccept() {
    const eid = this.state.recordId;
    const uid = this.props.user && this.props.user._id;
    this.clickHideModal();
    this.props.acceptCDuty(uid, eid);
  }

  formatDate(day) {
    const date = new Date(day);
    return date.toISOString().substring(0, 10);
  }

  render() {
    const cDutyRecords = this.props.cDutyRecords;
    const unHandleRecords = cDutyRecords && cDutyRecords.filter((item) => item.status === 'send');
    const HandledRecords = cDutyRecords && cDutyRecords.filter((item) => item.status !== 'send');
    let ikey = 0;
    // for (const unHandlesKey in unHandleRecords) {
    //   if (unHandleRecords[unHandlesKey].toAttendance) {
    //     if (new Date(unHandleRecords[unHandlesKey].toAttendance.date).getTime() < new Date().getTime()) {
    //       unHandleRecords[unHandlesKey].status = 'overdued';
    //       HandledRecords.push(unHandleRecords[unHandlesKey]);
    //       unHandleRecords.splice(unHandlesKey, 1);
    //     }
    //   }
    // }
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
                const records = item === '待处理' ? unHandleRecords : HandledRecords;
                ikey = ikey + 1;
                return (
                  <section key={ikey}>
                    <header>{item}<span className={styles.mainColorFont} style={{display: item === '待处理' ? 'inline-block' : 'none'}}>{unHandleRecords.length}条</span></header>
                    <ul>
                      {
                        records && records.length ?
                          records.map((record) => {
                            return (
                              <li key={record._id} onClick={() => this.clickShowModal(record)}>
                                <article>{this.formatDate(record.fromAttendance && record.fromAttendance.created)}</article>
                                <p>{record.fromDoctor && record.fromDoctor.name} {record.fromAttendance && record.fromAttendance.date}申请：</p>
                                <p>
                                  与{record.toDoctor && record.toDoctor.name} {record.toAttendance && record.toAttendance.date}换班，
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

