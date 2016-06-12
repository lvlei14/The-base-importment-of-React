import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';

import CardBg from '../../components/CardBg/Card';
import { loadUserSurgeryInformation } from '../../redux/modules/modifySurgery';
import { modifyUserSurgeryInfor } from '../../redux/modules/modifySurgery';
import { loadOperatingRoom } from '../../redux/modules/surgeryInfor';
import { loadOperaDoctor } from '../../redux/modules/surgeryInfor';
import { loadOperaName } from '../../redux/modules/surgeryInfor';
import { loadOperaSeq } from '../../redux/modules/surgeryInfor';
import { loadOperaStates } from '../../redux/modules/surgeryInfor';
import { reduxForm } from 'redux-form';
import { loadAccount } from '../../redux/modules/account';

const styles = require('../AddPatient/AddPatient.scss');
/**
  * component: modal ModalSection
  */
@connect(
  state => ({surgeryInfor: state.surgeryInfor, initialValues: state.account.data, userSurgeryInfor: state.patientSurgeryInfor.userSurgeryInfor}), {
    load: loadAccount,
    modifyUserSurgeryInfor,
    loadUserSurgeryInformation,
    loadOperatingRoom,
    loadOperaDoctor,
    loadOperaName,
    loadOperaSeq,
    loadOperaStates,
  }
)
@reduxForm({
  form: 'initializing',                          // a unique name for this form
  fields: ['patientId', 'doctorId', 'date', 'seq', 'name', 'operatingRoomId', 'surgeryStateId', 'mark']
})
export default class ModifySurgery extends Component {
  static propTypes = {
    selectedPatienId: PropTypes.string,
    addSurgeryInfor: PropTypes.func,
    loadOperatingRoom: PropTypes.func,
    loadOperaDoctor: PropTypes.func,
    loadOperaName: PropTypes.func,
    loadOperaSeq: PropTypes.func,
    loadOperaStates: PropTypes.func,
    fields: PropTypes.object,
    load: PropTypes.func,
    modifyUserSurgeryInfor: PropTypes.func,
    surgeryInfor: PropTypes.object,
    userSurgeryInfor: PropTypes.object,
    values: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPatienId: '',
      data: {
        patientId: this.props.userSurgeryInfor.patientId,
        doctorId: this.props.userSurgeryInfor.doctorId,
        apartmentId: this.props.userSurgeryInfor.apartmentId,
        date: this.props.userSurgeryInfor.date,
        seq: this.props.userSurgeryInfor.seq,
        name: this.props.userSurgeryInfor.name,
        operatingRoomId: this.props.userSurgeryInfor.operatingRoomId,
        surgeryStateId: this.props.userSurgeryInfor.surgeryStateId,
        mark: this.props.userSurgeryInfor.mark,
      }
    };
  }

  componentDidMount() {
    // TODO 完善接口信息
    // this.props.loadOperatingRoom,
    // this.props.loadOperaDoctor,
    // this.props.loadOperaName,
    // this.props.loadOperaSeq,
    // this.props.loadOperaStates,
    this.props.load(this.state.data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal
    });
  }

  clickAddBtn() {
    this.setState({
      showModal: false
    });
    // TODO 完善Api地址
    // this.props.modifyUserSurgeryInfor();
    console.log(this.props.values);
  }

  render() {
    // TODO values中缺少 apartmentId,
    const {fields: { doctorId, date, seq, name, operatingRoomId, surgeryStateId, mark}} = this.props;
    const {operatingRooms, operaNames, operaDoctors, selectedAbleSeqs, surgeryStates} = this.props.surgeryInfor;
    return (
      <div className={styles.addPatient}>
        <HeadNaviBar>修改手术信息</HeadNaviBar>
        <section>
          <CardBg>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>拟行手术</label>
              <div className="select">
                <select
                  {...name}
                  value = {name.value || ''}>
                    <option value="">请选择</option>
                    {
                      operaNames && operaNames.map((operaName) => {
                        return (
                          <option key={operaName} value={operaName}>{operaName}</option>
                        );
                      })
                    }
                </select>
                <p className="caret"></p>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>接台日期</label>
              <div className="select">
                <input type = "date" value ={date.value}
                    {...date} />
                <p className="caret"></p>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={styles.leftPlaceholder}>接台信息</label>
              <div className={styles.jietaiInfor + ' clearfix'}>
                <article className="select left">
                  <select
                    {...operatingRoomId}
                    value = {operatingRoomId.value || ''}>
                      <option value="">请选择</option>
                      {
                        operatingRooms && operatingRooms.map((operatingRoom) => {
                          return (
                            <option key={operatingRoom.id} value={operatingRoom.id}>{operatingRoom.name}</option>
                          );
                        })
                      }
                  </select>
                  <p className="caret"></p>
                </article>
                <article className="select right">
                  <select
                    {...seq}
                    value = {seq.value || ''}>
                      <option value="">请选择</option>
                      {
                        selectedAbleSeqs && selectedAbleSeqs.map((selectedAbleSeq) => {
                          return (
                            <option key={selectedAbleSeq} value={selectedAbleSeq}>{selectedAbleSeq}</option>
                          );
                        })
                      }
                  </select>
                  <p className="caret"></p>
                </article>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>术者</label>
              <div className="select">
                <select
                  {...doctorId}
                  value = {doctorId.value || ''}>
                    <option value="">请选择</option>
                    {
                      operaDoctors && operaDoctors.map((operaDoctor) => {
                        return (
                          <option key={operaDoctor.id} value={operaDoctor.id}>{operaDoctor.name}</option>
                        );
                      })
                    }
                </select>
                <p className="caret"></p>
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>手术状态</label>
              <div className="select">
                <select
                  {...surgeryStateId}
                  value = {surgeryStateId.value || ''}>
                    <option value="">请选择</option>
                    {
                      surgeryStates && surgeryStates.map((surgeryState) => {
                        return (
                          <option key={surgeryState.id} value={surgeryState.id}>{surgeryState.name}</option>
                        );
                      })
                    }
                </select>
                <p className="caret"></p>
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addSurgeryMark}>
              <label className={ styles.leftPlaceholder}>备注</label>
              <div>
                <textarea className="cardBgRadius" value={mark.value} {...mark}></textarea>
              </div>
            </div>
            </CardBg>
          </section>
          <footer>
            <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>确认</button>
          </footer>
        </div>
    );
  }
}
