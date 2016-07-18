import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HeadNaviBar, Modal } from '../../components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {getPatientsNotSurgery, clearInitPatient} from '../../redux/modules/patient';
import {getSurgeries, setSurgeryStatus} from '../../redux/modules/surgery';

const styles = require('./OperaPatInfor.scss');
@connect(
  state => ({
    patients: state.patient.patients,
    surgeries: state.surgery.surgeries}), {
      pushState: push,
      getPatientsNotSurgery,
      getSurgeries,
      setSurgeryStatus,
      clearInitPatient
    }
)
export default class OperaPatInfor extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    getPatientsNotSurgery: PropTypes.func,
    patients: PropTypes.array,
    surgeries: PropTypes.array,
    getSurgeries: PropTypes.func,
    setSurgeryStatus: PropTypes.func,
    clearInitPatient: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tabType: 0, // tab index value 0 or 1
    };
  }

  componentDidMount() {
    this.props.getPatientsNotSurgery();
    this.props.getSurgeries();
    this.props.clearInitPatient();
  }

  goAddPatient() {
    this.props.pushState('/add-patient');
  }

  changeTab(index) {
    this.setState({
      tabType: index
    });
    localStorage.setItem('surgeryTabIndex', index);
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
    const surgeryTabIndex = parseInt(localStorage.getItem('surgeryTabIndex'), 10) || 0;
    return (
      <div>
        <HeadNaviBar>病患信息
          <div className={'bodyBgWhiteZindex ' + styles.addPatient} onClick={this.goAddPatient.bind(this)}>
            添加患者
          </div>
        </HeadNaviBar>
        <Tabs className={styles.patInforSection + ' tabs'} onSelect={this.changeTab.bind(this)} selectedIndex={surgeryTabIndex}>
          <TabList className="tabList tabList2" activeTabClassName="tabListOn">
            <Tab>未安排手术</Tab>
            <Tab>已安排手术</Tab>
          </TabList>
          <TabPanel>
            <UserUnArrangementSurgery patients={usersUnArrangementSurgery}/>
          </TabPanel>
          <TabPanel>
            <UserArrangementedSurgery patients={surgeries}/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}


/**
  *component: already plan opera
  */
@connect(
  state => ({...state}), {
    setSurgeryStatus,
    pushState: push,
  }
)
class UserArrangementedSurgery extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    planedOpePatiens: PropTypes.object,
    patients: PropTypes.array,
    setSurgeryStatus: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedPatienName: '',
      selectedSurgeryId: '',
    };
  }

  componentDidMount() {
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
    this.props.setSurgeryStatus(this.state.selectedSurgeryId, 'done');
  }

  clickCancel() {
    this.setState({
      showModal: false
    });
  }

  goSurgeryDetail(id) {
    this.props.pushState(`surgery/${id}`);
  }

  render() {
    const {patients} = this.props;
    return (
      <div>
        <div className={styles.patInforTabCon}>
          {
            patients && patients.length ?
              patients.map((planedOpePatien) => {
                return (
                  <div key={planedOpePatien._id} className="topCardBg" style={{marginBottom: '10px'}}>
                    <dl className={'clearfix ' + styles.patItemTitle}>
                      <dt className="left">{planedOpePatien.patient && planedOpePatien.patient.name} （
                        {planedOpePatien.patient && planedOpePatien.patient.gender === 'female' ? '女' : '男'}，{planedOpePatien.patient && planedOpePatien.patient.age}&nbsp;
                        {planedOpePatien.operatingRoom && planedOpePatien.operatingRoom.name})
                      </dt>
                      {
                        planedOpePatien.status === 'ready' ?
                        <dd className="right clearfix" onClick={() => this.clickShowModal(planedOpePatien._id, planedOpePatien.name)}>
                          <i className="left"></i>
                          <span className="left">
                            待手术
                          </span>
                        </dd>
                        :
                        <dd className="right clearfix" style={{background: '#bababa'}}>
                          <span className="left">
                            已结束
                          </span>
                        </dd>
                      }

                    </dl>
                      {planedOpePatien ?
                        <ul onClick={() => this.goSurgeryDetail(planedOpePatien._id)}>
                          <li>手术名称：{planedOpePatien.name}</li>
                          <li>术&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：{planedOpePatien.doctor && planedOpePatien.doctor.name}</li>
                          <li>接台信息：{planedOpePatien.date}&nbsp;&nbsp;
                                       {planedOpePatien.operatingRoom && planedOpePatien.operatingRoom.name}
                                       </li>
                          <li>序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{planedOpePatien.seq}</li>
                          <li>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{planedOpePatien.mark}</li>
                        </ul>
                        : ''
                      }
                  </div>
                );
              })
            : <p className="noResult">暂无结果</p>
          }
        </div>
        {
          this.state.showModal ?
            <Modal title = {'操作确认'}
                  clickHideModal={this.clickCancel.bind(this)}
                   clickConfirm={this.clickConfirm.bind(this)}
                   clickCancel={this.clickCancel.bind(this)}>
               是否确认患者
               <span className={styles.patientName}>
                 {this.state.selectedPatienName}
               </span>
               已手术？
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
    this.props.push('/patient/' + id);
  }

  render() {
    const {patients} = this.props;
    return (
      <div className={styles.notPlanCon}>
        {
          patients && patients.length ?
            patients.map((patient) => {
              return (
                <div key={patient._id} className="topCardBg" style={{marginBottom: '10px'}}>
                  <div onClick={() => this.goPatientPage(patient._id)}>
                    <span className="left">
                      {patient.name} （{patient.gender === 'female' ? '女' : '男'}，{patient.age}）
                    </span>
                    <p className="right fa fa-angle-left"></p>
                  </div>
                </div>
              );
            })
          : <p className="noResult">暂无结果</p>
        }
      </div>
    );
  }
}
