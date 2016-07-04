import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import CardBg from '../../components/CardBg/Card';
import {getPatientsNotSurgery} from '../../redux/modules/patient';


const styles = require('./PatientsCanSurgery.scss');
@connect(state => ({...state.planedOpePatiens,
  contact: state.form.contact,
  patients: state.patient.patients}), {
    getPatientsNotSurgery,
    push
  }
)
export default class PatientsCanSurgery extends Component {
  static propTypes = {
    getPatientsNotSurgery: PropTypes.func,
    push: PropTypes.func,
    patients: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPatienId: '',
    };
  }

  componentDidMount() {
    this.props.getPatientsNotSurgery();
  }

  goToSetSurgery() {
    const {selectedPatienId} = this.state;
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
          <p className="tip">待安排手术病患</p>
          {
            patients && patients.length ?
              patients.map((patient) => {
                return (
                  <CardBg key={patient._id}>
                    <span className="left">
                      {patient.name} （{patient.gender === 'female' ? '男' : '女'}，{patient.age}）
                    </span>
                    <input className="right" type="radio" name="patient"
                      onChange={() => this.changePatientId(patient._id)}/>
                  </CardBg>
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
