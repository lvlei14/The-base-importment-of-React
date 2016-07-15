import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import {getPatientsNotSurgery} from '../../redux/modules/patient';
import { showDiaglog } from '../../redux/modules/diaglog';
import {clearInitSurgery} from '../../redux/modules/surgery';

const styles = require('./PatientsCanSurgery.scss');
@connect(state => ({...state.planedOpePatiens,
  contact: state.form.contact,
  patients: state.patient.patients}), {
    getPatientsNotSurgery,
    push,
    showDiaglog,
    clearInitSurgery
  }
)
export default class PatientsCanSurgery extends Component {
  static propTypes = {
    getPatientsNotSurgery: PropTypes.func,
    push: PropTypes.func,
    patients: PropTypes.array,
    showDiaglog: PropTypes.func,
    clearInitSurgery: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    this.props.getPatientsNotSurgery();
    this.props.clearInitSurgery();
  }

  goToSetSurgery() {
    const {selectedPatienId} = this.state;
    if (!selectedPatienId) {this.props.showDiaglog('请选择一名患者'); return;}
    this.props.push('/createSurgery?uid=' + selectedPatienId);
  }

  changePatientId(id) {
    this.setState({
      selectedPatienId: id,
    });
  }

  render() {
    const {patients} = this.props;
    return (
      <div className={styles.addSurgery}>
        <HeadNaviBar>添加手术</HeadNaviBar>
        <div className={styles.notPlanCon}>
          <p className="tip" style={{paddingLeft: '.14rem'}}>待安排手术病患</p>
          {
            patients && patients.length ?
              patients.map((patient) => {
                return (
                  <div className="topCardBg" key={patient._id}>
                    <span className="left">
                      {patient.name} （{patient.gender === 'female' ? '男' : '女'}，{patient.age}）
                    </span>
                    <p className="checkbox right" style={{marginTop: '10px'}}>
                      <input type="radio" name="patient" id={patient._id}
                        onChange={() => this.changePatientId(patient._id)}/>
                      <label htmlFor={patient._id}></label>
                    </p>
                  </div>
                );
              })
            : <p className="noResult">暂无结果</p>
          }
        </div>
        <footer className={styles.addSurgeryFooter}>
          <button className="mainBtn" onClick={this.goToSetSurgery.bind(this)}>添加手术</button>
        </footer>
      </div>
    );
  }
}
