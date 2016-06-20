import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from '../../components';

import { loadAlredayPlanOperaPatients } from '../../redux/modules/operaInfor';
import { changeSurgeryState } from '../../redux/modules/operaInfor';
import { loadNotRoomPatient } from '../../redux/modules/operaInfor';
import { loadNotPlanPatient } from '../../redux/modules/operaInfor';

import {getPatients} from '../../redux/modules/patient';

const styles = require('./OperaPatInfor.scss');
@connect(
  state => ({patients: state.patient.patients}), {
    pushState: push,
    getPatients
  }
)
export default class OperaPatInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    getPatients: PropTypes.func,
    patients: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tabType: 'alreadyPlan',
    };
  }

  componentDidMount() {
    this.props.getPatients();
  }

  changeTabType(type) {
    this.setState({
      tabType: type
    });
  }

  goAddPatient() {
    this.props.pushState('/add-patient');
  }

  render() {
    const patients = this.props.patients || [];
    const usersUnArrangementSurgery = [];
    const usersArrangementSurgery = [];
    patients.forEach(patient => {
      if (patient.surgery) {
        usersArrangementSurgery.push(patient);
      } else {
        usersUnArrangementSurgery.push(patient);
      }
    });
    console.log(usersUnArrangementSurgery);
    console.log(usersArrangementSurgery);
    return (
      <div>
        <HeadNaviBar>病患信息</HeadNaviBar>
        <div className={'bodyBgWhiteZindex ' + styles.addPatient} onClick={this.goAddPatient.bind(this)}>
          添加患者
        </div>
        <section className={styles.patInforSection}>
          <ul className={'clearfix topCardBg ' + styles.patInforTab}>
            <li className="left" onClick={() => this.changeTabType('notPlan')}>
              <span className={this.state.tabType === 'notPlan' ? styles.liCur : ''}>未安排</span>
            </li>
            <li className="left" onClick={() => this.changeTabType('alreadyPlan')}>
              <span className={this.state.tabType === 'alreadyPlan' ? styles.liCur : ''}>手术</span>
            </li>
          </ul>
          {this.state.tabType === 'alreadyPlan' ?
            <UserArrangementedSurgery patients={usersArrangementSurgery}/>
            :
            <UserUnArrangementSurgery patients={usersUnArrangementSurgery}/>
          }
        </section>
      </div>
    );
  }
}


/**
  *component: already plan opera
  */
@connect(
  state => ({...state.planedOpePatiens}), {
    loadAlredayPlanOperaPatients,
    changeSurgeryState
  }
)
class UserArrangementedSurgery extends Component {
  static propTypes = {
    planedOpePatiens: PropTypes.array,
    loadAlredayPlanOperaPatients: PropTypes.func,
    changeSurgeryState: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tabType: 'alreadyPlan',
      selectedPatienName: '',
      selectedSurgeryId: '',
    };
  }

  componentDidMount() {
    // TODO 完善接口地址
    // this.props.loadAlredayPlanOperaPatients();
  }

  clickShowModal(surgeryId, name) {
    this.setState({
      showModal: true,
      selectedPatienName: name,
      selectedSurgeryId: surgeryId,
    });
  }

  clickConfirm() {
    this.setState({
      showModal: false
    });
    alert('TODO');
    // TODO 改变患者的手术状态
    // this.props.changeSurgeryState(this.state.selectedSurgeryId, 'done');
  }

  render() {
    const planedOpePatiens = this.props.planedOpePatiens;
    return (
      <div>
        <div className={styles.patInforTabCon}>
          {
            planedOpePatiens && planedOpePatiens.length ?
              planedOpePatiens.map((planedOpePatien) => {
                return (
                  <CardBg key={planedOpePatien.id}>
                    <dl className={'clearfix ' + styles.patItemTitle}>
                      <dt className="left">{planedOpePatien.name} （
                        {planedOpePatien.gender === 'female' ? '男' : '女'}，{planedOpePatien.age}&nbsp;
                        {planedOpePatien.roomNum}）
                      </dt>
                      <dd className="right clearfix" onClick={() => this.clickShowModal(planedOpePatien.surgery.id, planedOpePatien.name)}>
                        <i className="left"></i>
                        <span className="left">已手术</span>
                      </dd>
                    </dl>
                      {planedOpePatien.surgery ?
                        <ul>
                          <li>手术名称：{planedOpePatien.surgery.name}</li>
                          <li>术&nbsp;&nbsp;&nbsp;&nbsp;者：{planedOpePatien.surgery.doctor}</li>
                          <li>接台信息：{planedOpePatien.surgery.date}
                                       {planedOpePatien.surgery.operatingRoom && planedOpePatien.surgery.operatingRoom.name}
                                       {planedOpePatien.surgery.seq}</li>
                          <li>备&nbsp;&nbsp;&nbsp;&nbsp;注：{planedOpePatien.surgery.mark}</li>
                        </ul>
                        : ''
                      }
                  </CardBg>
                );
              })
            : <p className="noResult">暂无结果</p>
          }
        </div>
       <Modal
          showModal = {this.state.showModal}
          title = {'操作确认'}
          clickConfirm = {this.clickConfirm.bind(this)}
        >
          是否确认患者<span className={styles.patientName}>{this.state.selectedPatienName}</span>已手术？
        </Modal>
      </div>
    );
  }
}


/**
  * component: not plan
  */
@connect(
  state => ({...state.planedOpePatiens}), {
    loadNotRoomPatient,
    loadNotPlanPatient
  }
)
class UserUnArrangementSurgery extends Component {
  static propTypes = {
    patients: PropTypes.array
  }

  render() {
    const {patients} = this.props;
    return (
      <div className={styles.notPlanCon}>
        {
          patients && patients.length ?
            patients.map((patient) => {
              return (
                <CardBg key={patient.id}>
                  <span className="left">
                    {patient.name} （{patient.gender === 'female' ? '男' : '女'}，{patient.age}）
                  </span>
                  <p className="right fa fa-angle-left"></p>
                </CardBg>
              );
            })
          : <p className="noResult">暂无结果</p>
        }
      </div>
    );
  }
}
