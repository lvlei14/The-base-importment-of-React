import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadPatientById } from '../../redux/modules/patient';

const styles = require('./PatientInfor.scss');
@connect(
  state => ({patient: state.patient.patient}), {
    loadPatientById,
    pushState: push,
  }
)
export default class PatientInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    patient: PropTypes.object,
    loadPatientById: PropTypes.func,
    routeParams: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    this.props.loadPatientById(id);
  }

  goModifyPatient() {
    this.props.pushState('/modify-patient');
  }

  render() {
    const patient = this.props.patient;
    console.log(patient);
    return (
      <div className={styles.PatientInfor}>
        <HeadNaviBar>患者信息</HeadNaviBar>
        <section className="cardBgRadius">
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>患者姓名</label>
            <div>
              {patient.name}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>性别</label>
            <div>
              {patient.gender === 'female' ? '男' : '女'}
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
        </footer>
      </div>
    );
  }
}
