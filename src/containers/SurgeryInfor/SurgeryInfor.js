import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {getSurgeryById} from '../../redux/modules/surgery';

const styles = require('../PatientInfo/PatientInfo.scss');
@connect(
  state => ({ surgery: state.surgery.surgery}), {
    getSurgeryById,
    pushState: push,
  }
)
export default class SurgeryInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    routeParams: PropTypes.object,
    surgery: PropTypes.object,
    getSurgeryById: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.getSurgeryById(id);
  }

  goModifySurgery() {
    const {patient} = this.props.surgery;
    const {id} = this.props.routeParams;
    this.props.pushState(`/createSurgery?id=${id}&uid=${patient._id}`);
  }

  render() {
    // TODO 让接口返回给我id加name。不能只有id
    const surgery = this.props.surgery;
    return (
      <div className={styles.PatientInfor}>
        <HeadNaviBar>手术信息</HeadNaviBar>
        <section className="cardBgRadius">
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>手术名字</label>
            <div>
              {surgery.name}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>接台信息</label>
            <div>
              {surgery.date}&nbsp;｜&nbsp;{surgery.operatingRoom && surgery.operatingRoom.name}&nbsp;｜&nbsp;{surgery.seq}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>患者信息</label>
            <div>
              {surgery.patient && surgery.patient.name}&nbsp;－&nbsp;{surgery.patient && surgery.patient.gender === 'female' ? '女' : '男'}&nbsp;－&nbsp;{surgery.patient && surgery.patient.age}岁
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>主刀医师</label>
            <div>
              {surgery.doctor && surgery.doctor.name}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>手术状态</label>
            <div>
              {surgery.status === 'ready' ? '已安排' : surgery.status === 'doing' ? '进行中' : surgery.status === 'done' ? '已结束' : '未知状态'}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>备注</label>
            <div>
              {surgery.mark}
            </div>
          </div>
        </section>
        <footer>
          <button className="mainBtn" onClick={this.goModifySurgery.bind(this)}>修改</button>
        </footer>
      </div>
    );
  }
}
