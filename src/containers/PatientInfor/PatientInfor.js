import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadPatientInformation } from '../../redux/modules/patient';

const styles = require('./PatientInfor.scss');
@connect(
  state => ({...state.patientInfor}), {
    loadPatientInformation,
    pushState: push,
  }
)
export default class PatientInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    patientInfor: PropTypes.array,
    loadPatientInformation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // TODO 完善Api地址
    // this.props.loadPatientInformation();
  }

  goModifyPatient() {
    this.props.pushState('/modify-patient');
  }

  render() {
    const patientInfor = this.props.patientInfor;
    console.log(patientInfor);
    return (
      <div className={styles.PatientInfor}>
        <HeadNaviBar>患者信息</HeadNaviBar>
        <section className="cardBgRadius">
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>患者姓名</label>
            <div>
              {patientInfor.name}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>性别</label>
            <div>
              {patientInfor.gender === 'female' ? '男' : '女'}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>年龄</label>
            <div>
              {patientInfor.age}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>床号</label>
            <div>
              {patientInfor.roomNum}
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
