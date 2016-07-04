import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getPatientById, deletePatientById, clearInitPatient } from '../../redux/modules/patient';

const styles = require('./PatientInfo.scss');
@connect(
  state => ({
    patient: state.patient.patient,
    successMsg: state.patient.successMsg,
    deletePatientSuccess: state.patient.deletePatientSuccess}), {
      getPatientById,
      push,
      deletePatientById,
      clearInitPatient
    }
)
export default class PatientInfo extends Component {
  static propTypes = {
    push: PropTypes.func,
    patient: PropTypes.object,
    getPatientById: PropTypes.func,
    routeParams: PropTypes.object,
    deletePatientById: PropTypes.func,
    deletePatientSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    clearInitPatient: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.getPatientById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.deletePatientSuccess && nextProps.deletePatientSuccess) {
      this.props.push('/opera-patient');
      alert(nextProps.successMsg);
    }
  }

  componentWillUnmount() {
    this.props.clearInitPatient();
  }

  goModifyPatient() {
    const {id} = this.props.routeParams;
    this.props.push('/add-patient?id=' + id);
  }

  deletePatient() {
    // TODO 弹出删除的弹窗
    const {id} = this.props.routeParams;
    this.props.deletePatientById(id);
  }

  addSurgery() {
    const {id} = this.props.routeParams;
    this.props.push(`/createSurgery?uid=${id}`);
  }

  render() {
    const patient = this.props.patient;
    return (
      <div className={styles.PatientInfor}>
        <HeadNaviBar>患者信息</HeadNaviBar>
        <section className="cardBgRadius">
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>姓名</label>
            <div>
              {patient.name}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>性别</label>
            <div>
              {patient.gender === 'female' ? '女' : '男'}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>电话</label>
            <div>
              {patient.mobile}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>年龄</label>
            <div>
              {patient.age}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>床号</label>
            <div>
              {patient.bedNumber}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>备注</label>
            <div>
              {patient.mark}
            </div>
          </div>
        </section>
        <footer>
          <button className="mainBtn" onClick={this.goModifyPatient.bind(this)}>修改</button>
          <button className="mainBtn" onClick={this.addSurgery.bind(this)}>添加手术</button>
          <button className="delBtn" onClick={this.deletePatient.bind(this)}>删除</button>
        </footer>
      </div>
    );
  }
}
