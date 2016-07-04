import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from '../../components';
import moment from 'moment';
import { showDiaglog } from '../../redux/modules/diaglog';

import { loadschedules } from '../../redux/modules/datePlan';
import { loadGroupInfoById } from '../../redux/modules/groupInfo';
import { deleteGroupInfoById } from '../../redux/modules/groupInfo';
import { deleteScheduleById } from '../../redux/modules/datePlanInfo';

const styles = require('./DatePlanDetail.scss');
@connect(
  state => ({...state.schedules, ...state.datePlanInfo, ...state.groupInfo}), {
    loadschedules,
    pushState: push,
    deleteScheduleById,
    showDiaglog,
    loadGroupInfoById,
    deleteGroupInfoById
  }
)
export default class DatePlanDetail extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadschedules: PropTypes.func,
    routeParams: PropTypes.object,
    schedules: PropTypes.object,
    deleteScheduleById: PropTypes.func,
    deleteScheduleSuccess: PropTypes.bool,
    showDiaglog: PropTypes.func,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    location: PropTypes.object,
    loadGroupInfoById: PropTypes.func,
    deleteGroupInfoById: PropTypes.func,
    deleteGroupNoticeSuccess: PropTypes.bool,
    groupInfoItem: PropTypes.array,
    groupSuccessMsg: PropTypes.string,
    groupErrorMsg: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    const requires = {
      _id: id
    };
    const {groupAppartId} = this.props.location.query;
    if (groupAppartId) {
      this.props.loadGroupInfoById(id);
    } else {
      this.props.loadschedules(JSON.stringify(requires));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.deleteScheduleSuccess && nextProps.deleteScheduleSuccess) {
      if (!this.props.successMsg && nextProps.successMsg) {
        this.props.showDiaglog(nextProps.successMsg, '/date-plan');
      }
    }
    if (!this.props.deleteScheduleSuccess && !nextProps.deleteScheduleSuccess) {
      if (!this.props.errorMsg && nextProps.errorMsg) {
        this.props.showDiaglog(nextProps.errorMsg);
      }
    }
    const {groupAppartId} = this.props.location.query;
    if (!this.props.deleteGroupNoticeSuccess && nextProps.deleteGroupNoticeSuccess) {
      if (!this.props.groupSuccessMsg && nextProps.groupSuccessMsg) {
        this.props.showDiaglog(nextProps.groupSuccessMsg, '/group-msg-list/' + groupAppartId);
      }
    }
    if (!this.props.deleteGroupNoticeSuccess && !nextProps.deleteGroupNoticeSuccess) {
      if (!this.props.groupErrorMsg && nextProps.groupErrorMsg) {
        this.props.showDiaglog(nextProps.groupErrorMsg);
      }
    }
  }

  getFormatDate(day) {
    const datenow = moment(day).format('YYYY-MM-DD HH:mm');
    return datenow;
  }

  goModifyPatient() {
    const {id} = this.props.routeParams;
    let template;
    const {groupAppartId} = this.props.location.query;
    if (groupAppartId) {
      template = this.props.groupInfoItem && this.props.groupInfoItem[0] && this.props.groupInfoItem[0].contentId && this.props.groupInfoItem[0].contentId.template || {};
      this.props.pushState('/modify-date-plan/' + id + '/' + template + '?groupAppartId=' + groupAppartId);
    } else {
      template = this.props.schedules && this.props.schedules[0] && this.props.schedules[0].template;
      this.props.pushState('/modify-date-plan/' + id + '/' + template);
    }
  }

  clickShowModal() {
    this.setState({
      showModal: true
    });
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  deleteSchedule() {
    const {id} = this.props.routeParams;
    const {groupAppartId} = this.props.location.query;
    if (groupAppartId) {
      this.props.deleteGroupInfoById(id);
    } else {
      this.props.deleteScheduleById(id);
    }
    this.clickHideModal();
  }

  render() {
    const {groupAppartId} = this.props.location.query;
    let datePlanDetail;
    if (groupAppartId) {
      datePlanDetail = this.props.groupInfoItem && this.props.groupInfoItem[0] && this.props.groupInfoItem[0].contentId || {};
    } else {
      datePlanDetail = this.props.schedules && this.props.schedules[0] || {};
    }
    const {type} = this.props.routeParams;
    return (
      <div className={styles.datePlanDetail}>
        <HeadNaviBar>日程详情</HeadNaviBar>
        <section className="cardBgRadius">
          <section>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>{datePlanDetail.type && datePlanDetail.type.label}</label>
              <div>
                {datePlanDetail.type && datePlanDetail.type.value} &nbsp;&nbsp;&nbsp;&nbsp; {datePlanDetail.is_inner && datePlanDetail.is_inner.value ? '院内' : '院外'}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>开始时间</label>
              <div>
                {this.getFormatDate(datePlanDetail.start_time)}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>结束时间</label>
              <div>
                {this.getFormatDate(datePlanDetail.end_time)}
              </div>
            </div>
            <div style={{display: type === '手术' ? 'none' : 'block'}} className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>重复</label>
              <div>
                {datePlanDetail.repeat && datePlanDetail.repeat.value}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>提醒</label>
              <div>
                {datePlanDetail.remind && datePlanDetail.remind.value}
              </div>
            </div>
            {
              datePlanDetail.content && datePlanDetail.content.map((item) => {
                return (
                  <div className={styles.addPatientLi} key={item.label}>
                    <label className={ styles.leftPlaceholder}>{item.label}</label>
                    <div>
                      {item.value}
                    </div>
                  </div>
                );
              })
            }
          </section>
        </section>
        <footer className={styles.btnFooter}>
          <button className="mainBtn" onClick={this.goModifyPatient.bind(this)}>修改</button>
          <button className="delBtn" onClick={this.clickShowModal.bind(this)}>删除</button>
        </footer>
        <div style={{display: this.state.showModal ? 'block' : 'none'}}>
          <Modal
            title = "删除日程"
            clickHideModal = {this.clickHideModal.bind(this)}
            clickConfirm = {this.deleteSchedule.bind(this)}
            clickCancel = {this.clickHideModal.bind(this)}>
            <span>您确定删除此日程吗</span>？
          </Modal>
        </div>
      </div>
    );
  }
}
