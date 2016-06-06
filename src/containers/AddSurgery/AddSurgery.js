import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { Modal } from '../../components';

import CardBg from '../../components/CardBg/Card';
import { addSurgeryInfor } from '../../redux/modules/addSurgery';
import { loadNotPlanPatient } from '../../redux/modules/operaInfor';
import { loadOperatingRoom } from '../../redux/modules/surgeryInfor';
import { loadOperaDoctor } from '../../redux/modules/surgeryInfor';
import { loadOperaName } from '../../redux/modules/surgeryInfor';
import { loadOperaSeq } from '../../redux/modules/surgeryInfor';
import { loadOperaStates } from '../../redux/modules/surgeryInfor';
import { reduxForm } from 'redux-form';

const styles = require('./AddSurgery.scss');
@connect(
  state => ({...state.planedOpePatiens, contact: state.form.contact}), {
    loadNotPlanPatient,
  }
)

export default class AddSurgery extends Component {
  static propTypes = {
    notPlanPatiens: PropTypes.array,
    loadNotPlanPatient: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    // TODO 完善Api地址
    // this.props.loadNotPlanPatient();
  }

  clickAddOtherInfor() {
    this.setState({
      showModal: true,
    });
  }

  changePatientId(event) {
    this.setState({
      selectedPatienId: event.target.value,
    });
  }

  render() {
    const notPlanPatiens = this.props.notPlanPatiens;
    return (
      <div className={styles.addSurgery}>
        <HeadNaviBar>添加手术</HeadNaviBar>
        <div className={styles.notPlanCon}>
          <p className="tip">待安排手术病患</p>
          {
            notPlanPatiens && notPlanPatiens.length ?
              notPlanPatiens.map((notPlanPatien) => {
                return (
                  <CardBg key={notPlanPatien.id}>
                    <span className="left">
                      {notPlanPatien.name} （{notPlanPatien.gender === 'female' ? '男' : '女'}，{notPlanPatien.age}）
                    </span>
                    <input className="right" type="radio" name="patient" onChange={this.changePatientId.bind(this)} />
                  </CardBg>
                );
              })
            : <p className="noResult">暂无结果</p>
          }
        </div>
        <footer className={styles.addSurgeryFooter}>
          <button className="mainBtn" onClick={this.clickAddOtherInfor.bind(this)}>确认</button>
        </footer>
        <ModalSection
          showModal = {this.state.showModal}
          selectedPatienId = {this.state.selectedPatienId} />
      </div>
    );
  }
}

/**
  * component: modal ModalSection
  */
@connect(
  state => ({surgeryInfor: state.surgeryInfor, contact: state.form.contact}), {
    addSurgeryInfor,
    loadOperatingRoom,
    loadOperaDoctor,
    loadOperaName,
    loadOperaSeq,
    loadOperaStates,
  }
)
@reduxForm({
  form: 'contact',                           // a unique name for this form
  fields: ['patientId', 'doctorId', 'apartmentId', 'date', 'seq', 'name', 'operatingRoomId', 'surgeryStateId', 'mark']
})
class ModalSection extends Component {
  static propTypes = {
    showModal: PropTypes.boolen,
    selectedPatienId: PropTypes.string,
    addSurgeryInfor: PropTypes.func,
    loadOperatingRoom: PropTypes.func,
    loadOperaDoctor: PropTypes.func,
    loadOperaName: PropTypes.func,
    loadOperaSeq: PropTypes.func,
    loadOperaStates: PropTypes.func,
    fields: PropTypes.object,
    surgeryInfor: PropTypes.object,
    values: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    // TODO 完善接口信息
    // this.props.loadOperatingRoom,
    // this.props.loadOperaDoctor,
    // this.props.loadOperaName,
    // this.props.loadOperaSeq,
    // this.props.loadOperaStates,
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
    const patient = { patientId: this.props.selectedPatienId};
    console.log(this.props.selectedPatienId);
    const values = Object.assign(this.props.values, patient);
    console.log('--提交的数据--');
    console.log(values);
    // TODO 完善Api地址
    // this.props.addSurgeryInfor();
  }

  render() {
    // TODO values中还需要传一个apartmentId
    const {fields: {doctorId, date, seq, name, operatingRoomId, surgeryStateId, mark}} = this.props;
    const {operatingRooms, operaNames, operaDoctors, selectedAbleSeqs, surgeryStates} = this.props.surgeryInfor;
    return (
      <Modal
          showModal = {this.state.showModal}
          title = {'完善手术信息'}
          clickConfirm = {this.clickAddBtn.bind(this)}
        >
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
        </Modal>
    );
  }
}
