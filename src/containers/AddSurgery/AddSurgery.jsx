import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {getPatientById} from '../../redux/modules/patient';
import {getHospitalOpeRooms} from '../../redux/modules/hospitalOperationRoom';
import {getSurgeryTypes} from '../../redux/modules/surgeryType';
import {createSurgery} from '../../redux/modules/surgery';
import {loadDoctors} from '../../redux/modules/doctor';

const styles = require('../PatientsCanSurgery/PatientsCanSurgery.scss');

@connect(state => ({
  doctors: state.doctor && state.doctor.doctors,
  rooms: state.hospitalOperationRoom.operationRooms,
  surgeryTypes: state.surgeryType.surgeryTypes,
  contact: state.form.contact,
  patient: state.patient.patient}), {
    getPatientById,
    getHospitalOpeRooms,
    getSurgeryTypes,
    createSurgery,
    loadDoctors
  }
)
@reduxForm({
  form: 'createSurgery',                           // a unique name for this form
  fields: ['doctor', 'date', 'seq', 'name', 'surgeryType', 'operatingRoom', 'mark']
})
export default class AddSurgery extends Component {
  static propTypes = {
    selectedPatienId: PropTypes.string,
    addSurgeryInfor: PropTypes.func,
    location: PropTypes.object,
    fields: PropTypes.object,
    rooms: PropTypes.array,
    surgeryTypes: PropTypes.array,
    surgeryInfor: PropTypes.object,
    values: PropTypes.object,
    getPatientById: PropTypes.func,
    getHospitalOpeRooms: PropTypes.func,
    getSurgeryTypes: PropTypes.func,
    patient: PropTypes.object,
    createSurgery: PropTypes.func,
    loadDoctors: PropTypes.func,
    doctors: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    // TODO 完善接口信息
    const uid = this.props.location.query.uid;
    this.props.getPatientById(uid);
    this.props.getHospitalOpeRooms('hospitalID');
    this.props.getSurgeryTypes('hospitalID');
    this.props.loadDoctors();
    // this.props.loadOperatingRoom,
    // this.props.loadOperaDoctor,
    // this.props.loadOperaName,
    // this.props.loadOperaSeq,
    // this.props.loadOperaStates,
  }

  // componentWillReceiveProps(nextProps) {
  //   // this.setState({
  //   //   showModal: nextProps.showModal
  //   // });
  // }

  clickAddBtn() {
    const patient = this.props.location.query.uid;
    const values = Object.assign(this.props.values, {patient: patient});
    console.log(values);
    // TODO 完善Api地址
    this.props.createSurgery(values);
  }

  render() {
    // TODO values中还需要传一个apartmentId
    const {fields: {doctor, date, seq, name, surgeryType, operatingRoom, mark}} = this.props;
    const {patient, rooms, surgeryTypes, doctors} = this.props;
    const selectedAbleSeqs = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div>
        <HeadNaviBar>添加手术</HeadNaviBar>
          <div>
            患者: {patient.name}
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>手术名称</label>
            <div className="select">
              <input {...name}></input>
              <p className="caret"></p>
            </div>
          </div>
          <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
            <label className={ styles.leftPlaceholder}>手术类型</label>
            <div className="select">
              <select {...surgeryType}>
                  <option value="">请选择</option>
                  {
                    surgeryTypes && surgeryTypes.map((type) => {
                      return (
                        <option key={type._id} value={type._id}>{type.name}</option>
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
              <input type="date" {...date} />
              <p className="caret"></p>
            </div>
          </div>
          <div className={styles.addPatientLi}>
            <label className={styles.leftPlaceholder}>接台信息</label>
            <div className={styles.jietaiInfor + ' clearfix'}>
              <article className="select left">
                <select {...operatingRoom}>
                    <option value="">请选择</option>
                    {
                      rooms && rooms.map((room) => {
                        return (
                          <option key={room._id} value={room._id}>{room.name}</option>
                        );
                      })
                    }
                </select>
                <p className="caret"></p>
              </article>
              <article className="select right">
                <select {...seq} value={seq.value || ''}>
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
              <select {...doctor}>
                  <option value="">请选择</option>
                  {
                    doctors && doctors.map((operaDoctor) => {
                      return (
                        <option key={operaDoctor._id} value={operaDoctor._id}>{operaDoctor.name}</option>
                      );
                    })
                  }
              </select>
              <p className="caret"></p>
            </div>
          </div>
          {/* <div className={styles.addPatientLi}>
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
          </div> */}
          <div className={styles.addPatientLi + ' ' + styles.addSurgeryMark}>
            <label className={ styles.leftPlaceholder}>备注</label>
            <div>
              <textarea className="cardBgRadius" {...mark}></textarea>
            </div>
          </div>
          <div>
            <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>提交</button>
          </div>
      </div>
    );
  }
}
