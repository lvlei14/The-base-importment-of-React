import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

import {getPatientById} from '../../redux/modules/patient';
import {getHospitalOpeRooms} from '../../redux/modules/hospitalOperationRoom';
import {getSurgeryTypes} from '../../redux/modules/surgeryType';
import {createSurgery, modifySurgeryById, getSurgeryByIdWithoutPopulate} from '../../redux/modules/surgery';
import {loadDoctors} from '../../redux/modules/doctor';

const styles = require('../AddDatePlan/AddDatePlan.scss');

@connect(state => ({
  ...state.surgery,
  doctors: state.doctor && state.doctor.doctors,
  user: state.auth && state.auth.user,
  rooms: state.hospitalOperationRoom.operationRooms,
  surgeryTypes: state.surgeryType.surgeryTypes,
  contact: state.form.contact,
  patient: state.patient.patient}), {
    getPatientById,
    modifySurgeryById,
    getSurgeryByIdWithoutPopulate,
    getHospitalOpeRooms,
    getSurgeryTypes,
    createSurgery,
    loadDoctors,
    push
  }
)
@reduxForm({
  form: 'createSurgery',                           // a unique name for this form
  fields: ['doctor', 'date', 'seq', 'name', 'surgeryType', 'operatingRoom', 'mark']
}, state => ({
  initialValues: state.surgery.surgery // will pull state into form's initialValues
}))
export default class AddSurgery extends Component {
  static propTypes = {
    selectedPatienId: PropTypes.string,
    addSurgeryInfor: PropTypes.func,
    location: PropTypes.object,
    fields: PropTypes.object,
    rooms: PropTypes.array,
    surgeryTypes: PropTypes.array,
    surgeryInfor: PropTypes.object,
    push: PropTypes.func,
    values: PropTypes.object,
    getPatientById: PropTypes.func,
    getSurgeryByIdWithoutPopulate: PropTypes.func,
    getHospitalOpeRooms: PropTypes.func,
    getSurgeryTypes: PropTypes.func,
    patient: PropTypes.object,
    createSurgery: PropTypes.func,
    loadDoctors: PropTypes.func,
    doctors: PropTypes.array,
    successMsg: PropTypes.string,
    addSurgerySuccess: PropTypes.bool,
    newCreateSurgeryId: PropTypes.string,
    modifySurgerySuccess: PropTypes.bool,
    modifySurgeryById: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    // TODO 完善接口信息
    const {id, uid} = this.props.location.query;
    if (uid) {
      this.props.getPatientById(uid);
    }
    if (id) {
      this.props.getSurgeryByIdWithoutPopulate(id);
    }
    this.props.getHospitalOpeRooms('hospitalID');
    this.props.getSurgeryTypes('hospitalID');
    this.props.loadDoctors();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.addSurgerySuccess && nextProps.addSurgerySuccess) {
      const {newCreateSurgeryId} = nextProps;
      alert(nextProps.successMsg);
      this.props.push(`/surgery/${newCreateSurgeryId}`);
    }
    if (!this.props.modifySurgerySuccess && nextProps.modifySurgerySuccess) {
      const {id} = this.props.location.query;
      alert(nextProps.successMsg);
      this.props.push(`/surgery/${id}`);
    }
  }

  clickAddBtn() {
    const patient = this.props.location.query.uid;
    const values = Object.assign(this.props.values, {patient: patient});
    console.log(this.props.values);
    this.props.createSurgery(values);
  }

  clickModifyBtn() {
    const {id} = this.props.location.query;
    this.props.modifySurgeryById(id, this.props.values);
  }

  render() {
    // TODO values中还需要传一个apartmentId
    const {fields: {doctor, date, seq, name, surgeryType, operatingRoom, mark}} = this.props;
    const {patient, rooms, surgeryTypes, doctors} = this.props;
    const selectedAbleSeqs = [1, 2, 3, 4, 5, 6, 7];
    const {id} = this.props.location.query;
    return (
      <div>
        <HeadNaviBar>添加手术</HeadNaviBar>
          <div className={ styles.addDatePlan}>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>患者姓名:</label>
                <div className={styles.scheduleType}>
                  <input ref="startTimeRef" type="text" disabled placeholder={patient.name}/>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>手术名称:</label>
                <div className={styles.scheduleType}>
                  <input ref="startTimeRef" type="text" {...name}/>
                </div>
              </li>
              <li>
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
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>接台日期</label>
                <div className="select">
                  <input type="date" {...date} />
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>手术室</label>
                <div className="select">
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
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>手术序号</label>
                <div className="select">
                  <select {...seq}>
                      <option value="">请选择</option>
                      {
                        selectedAbleSeqs && selectedAbleSeqs.map((selectedAbleSeq) => {
                          return (
                            <option key={selectedAbleSeq} value={selectedAbleSeq}>{selectedAbleSeq}</option>
                          );
                        })
                      }
                  </select>
                </div>
              </li>
              <li>
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
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>备注</label>
                <div>
                  <textarea className="cardBgRadius" {...mark}></textarea>
                </div>
              </li>
            </ul>
            <div>
              {
                !id ?
                  <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>创建</button>
                    :
                  <button className="mainBtn" onClick={this.clickModifyBtn.bind(this)}>修改</button>
              }

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
      </div>
    );
  }
}
