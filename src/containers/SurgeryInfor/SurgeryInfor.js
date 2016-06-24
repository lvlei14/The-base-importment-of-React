import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadUserSurgeryInformation } from '../../redux/modules/modifySurgery';

const styles = require('../PatientInfo/PatientInfo.scss');
@connect(
  state => ({ userSurgeryInfor: state.patientSurgeryInfor.userSurgeryInfor}), {
    loadUserSurgeryInformation,
    pushState: push,
  }
)
export default class SurgeryInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    userSurgeryInfor: PropTypes.array,
    loadUserSurgeryInformation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // TODO 完善Api地址
    // this.props.loadUserSurgeryInformation();
  }

  goModifyPatient() {
    this.props.pushState('/modify-surgery');
  }

  render() {
    // TODO 让接口返回给我id加name。不能只有id
    const userSurgeryInfor = this.props.userSurgeryInfor;
    console.log(userSurgeryInfor);
    return (
      <div className={styles.PatientInfor}>
        <HeadNaviBar>患者信息</HeadNaviBar>
        <section className="cardBgRadius">
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>拟行手术</label>
            <div>
              {userSurgeryInfor.name}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>接台日期</label>
            <div>
              {userSurgeryInfor.date}
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={ styles.leftPlaceholder}>接台信息</label>
            <div className={styles.jietaiInfor + ' clearfix'}>
              <article className="select">
                {userSurgeryInfor.operatingRoomId}
              </article>
              <article className="select">
                {userSurgeryInfor.seq}
              </article>
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>术者</label>
            <div>
              {userSurgeryInfor.doctorId}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>手术状态</label>
            <div>
              {userSurgeryInfor.surgeryStateId}
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
            <label className={ styles.leftPlaceholder}>备注</label>
            <div>
              {userSurgeryInfor.mark}
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
