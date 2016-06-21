import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import CardBg from '../../components/CardBg/Card';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from '../../components';

import { loadAlredayPlanOperaPatients } from '../../redux/modules/operaInfor';
import { changeSurgeryState } from '../../redux/modules/operaInfor';

import {getPatients} from '../../redux/modules/patient';
import {getSurgeries} from '../../redux/modules/surgery';

const styles = require('./OperaPatInfor.scss');
@connect(
  state => ({
    patients: state.patient.patients,
    surgeries: state.surgery.surgeries}), {
      pushState: push,
      getPatients,
      getSurgeries
    }
)
export default class OperaPatInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    getPatients: PropTypes.func,
    patients: PropTypes.array,
    surgeries: PropTypes.array,
    getSurgeries: PropTypes.func
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
    this.props.getSurgeries();
  }

  goAddPatient() {
    this.props.pushState('/add-patient');
  }

  selectUnArrSurgery() {
    this.setState({
      tabType: '1'
    });
    localStorage.setItem('userUnArrangementSurgeryTag', 'true');
  }

  selectArrSurgery() {
    this.setState({
      tabType: '2'
    });
    localStorage.removeItem('userUnArrangementSurgeryTag');
  }

  render() {
    const patients = this.props.patients || [];
    const surgeries = this.props.surgeries || [];
    const usersUnArrangementSurgery = [];
    const usersArrangementSurgery = [];
    patients.forEach(patient => {
      if (patient.surgeries && patient.surgeries.length) {
        usersArrangementSurgery.push(patient);
      } else {
        usersUnArrangementSurgery.push(patient);
      }
    });
    const showTab = localStorage.getItem('userUnArrangementSurgeryTag');
    return (
      <div>
        <HeadNaviBar>病患信息</HeadNaviBar>
        <div className={'bodyBgWhiteZindex ' + styles.addPatient} onClick={this.goAddPatient.bind(this)}>
          添加患者
        </div>
        <section className={styles.patInforSection}>
          <ul className={'clearfix topCardBg ' + styles.patInforTab}>
            <li className="left" onClick={this.selectUnArrSurgery.bind(this)}>
              <span className={showTab ? styles.liCur : ''}>未安排</span>
            </li>
            <li className="left" onClick={this.selectArrSurgery.bind(this)}>
              <span className={!showTab ? styles.liCur : ''}>手术</span>
            </li>
          </ul>
          {!showTab ?
            <UserArrangementedSurgery patients={surgeries}/>
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
  state => ({...state}), {
    loadAlredayPlanOperaPatients,
    changeSurgeryState
  }
)
class UserArrangementedSurgery extends Component {
  static propTypes = {
    planedOpePatiens: PropTypes.array,
    loadAlredayPlanOperaPatients: PropTypes.func,
    changeSurgeryState: PropTypes.func,
    patients: PropTypes.array
  };

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
    // const planedOpePatiens = this.props.planedOpePatiens;
    const {patients} = this.props;
    return (
      <div>
        <div className={styles.patInforTabCon}>
          {
            patients && patients.length ?
              patients.map((planedOpePatien) => {
                return (
                  <CardBg key={planedOpePatien.id}>
                    <dl className={'clearfix ' + styles.patItemTitle}>
                      <dt className="left">{planedOpePatien.patient.name} （
                        {planedOpePatien.patient.gender === 'female' ? '男' : '女'}，{planedOpePatien.patient.age}&nbsp;
                        {planedOpePatien.operatingRoom.name})
                      </dt>
                      <dd className="right clearfix" onClick={() => this.clickShowModal(planedOpePatien.surgery.id, planedOpePatien.name)}>
                        <i className="left"></i>
                        <span className="left">
                          {
                            planedOpePatien.status === 'ready' ? '未开始' : '已结束'
                          }
                        </span>
                      </dd>
                    </dl>
                      {planedOpePatien ?
                        <ul>
                          <li>手术名称：{planedOpePatien.name}</li>
                          <li>术&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：{planedOpePatien.doctor.name}</li>
                          <li>接台信息：{planedOpePatien.date}&nbsp;&nbsp;
                                       {planedOpePatien.operatingRoom && planedOpePatien.operatingRoom.name}
                                       </li>
                          <li>序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{planedOpePatien.seq}</li>
                          <li>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{planedOpePatien.mark}</li>
                        </ul>
                        : ''
                      }
                  </CardBg>
                );
              })
            : <p className="noResult">暂无结果</p>
          }
        </div>
        {
          this.state.showModal ?
            <Modal title = {'操作确认'} clickConfirm = {this.clickConfirm.bind(this)} >
               是否确认患者<span className={styles.patientName}>{this.state.selectedPatienName}</span>已手术？
             </Modal>
           : ''
        }

      </div>
    );
  }
}


/**
  * component: not plan
  */
@connect(
  state => ({...state.planedOpePatiens}), {
    push
  }
)
class UserUnArrangementSurgery extends Component {
  static propTypes = {
    patients: PropTypes.array,
    push: PropTypes.func
  }

  goPatientPage(id) {
    console.log('click');
    this.props.push('/patient/' + id);
  }

  render() {
    const {patients} = this.props;
    return (
      <div className={styles.notPlanCon}>
        {
          patients && patients.length ?
            patients.map((patient) => {
              console.log(patient);
              return (
                <CardBg key={patient._id}>
                  <div onClick={() => this.goPatientPage(patient._id)}>
                    <span className="left">
                      {patient.name} （{patient.gender === 'female' ? '男' : '女'}，{patient.age}）
                    </span>
                    <p className="right fa fa-angle-left"></p>
                  </div>
                </CardBg>
              );
            })
          : <p className="noResult">暂无结果</p>
        }
      </div>
    );
  }
}
