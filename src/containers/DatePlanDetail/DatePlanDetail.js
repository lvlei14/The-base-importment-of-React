import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadschedules } from '../../redux/modules/datePlan';

const styles = require('./DatePlanDetail.scss');
@connect(
  state => ({...state.schedules}), {
    loadschedules,
    pushState: push,
  }
)
export default class DatePlanDetail extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadschedules: PropTypes.func,
    routeParams: PropTypes.object,
    schedules: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {id} = this.props.routeParams;
    const requires = {
      _id: id
    };
    this.props.loadschedules(JSON.stringify(requires));
  }

  goModifyPatient() {
    this.props.pushState('/modify-data-plan');
  }

  showTemplateCon(con) {
    const {typeVal} = this.props.routeParams;
    let templateCon;
    if (typeVal === '查房') {
      templateCon = this.showCheckCon(con);
    } else if (typeVal === '手术') {
      templateCon = this.showOperaCon(con);
    } else if (typeVal === '会议') {
      templateCon = this.showMettingCon(con);
    }
    return templateCon;
  }

  showCheckCon(con) {
    const checkCon = ( <section>
        <header>查房信息:</header>
        {
          con.location ?
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>{con.location.label}</label>
              <div>
                {con.location.value}
              </div>
            </div>
          : ''
        }
        {
          con.participants ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.participants.label}</label>
              <div>
                {con.participants.value}
              </div>
            </div>
          : ''
        }
      </section>
    );
    return checkCon;
  }

  showOperaCon(con) {
    const operaCon = (
      <section>
        <header>手术信息:</header>
        {
          con.patientName ?
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>{con.patientName.label}</label>
              <div>
                {con.patientName.value}
              </div>
            </div>
          : ''
        }
        {
          con.gender ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.gender.label}</label>
              <div>
                {con.gender.value}
              </div>
            </div>
          : ''
        }
        {
          con.age ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.age.label}</label>
              <div>
                {con.age.value}
              </div>
            </div>
          : ''
        }
        {
          con.operatingRoom ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.operatingRoom.label}</label>
              <div>
                {con.operatingRoom.value}
              </div>
            </div>
          : ''
        }
        {
          con.diagnosis ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.diagnosis.label}</label>
              <div>
                {con.diagnosis.value}
              </div>
            </div>
          : ''
        }
        {
          con.surgery ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.surgery.label}</label>
              <div>
                {con.surgery.value}
              </div>
            </div>
          : ''
        }
        {
          con.bodyCycle ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.bodyCycle.label}</label>
              <div>
                {con.bodyCycle.value}
              </div>
            </div>
          : ''
        }
        {
          con.bedNumber ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.bedNumber.label}</label>
              <div>
                {con.bedNumber.value}
              </div>
            </div>
          : ''
        }
        {
          con.accessStationInfo ?
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>{con.accessStationInfo.label}</label>
              <div>
                {con.accessStationInfo.value}
              </div>
            </div>
          : ''
        }
      </section>
    );
    return operaCon;
  }

  showMettingCon() {
  }

  render() {
    const schedules = this.props.schedules.list && this.props.schedules.list[0] && this.props.schedules.list[0].schedules || {};
    const datePlanDetail = schedules[0] || {};
    console.log('--数据--');
    console.log(datePlanDetail);
    return (
      <div className={styles.datePlanDetail}>
        <HeadNaviBar>日程详情</HeadNaviBar>
        <section className="cardBgRadius">
          <header className={styles.DatDetailTitle}>
            {datePlanDetail.name && datePlanDetail.name.value}
          </header>
          <section>
            <header>基本信息:</header>
            {
              datePlanDetail.type ?
                <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
                  <label className={ styles.leftPlaceholder}>{datePlanDetail.type.label}</label>
                  <div>
                    {datePlanDetail.type.value} &nbsp;&nbsp;&nbsp;&nbsp; {datePlanDetail.locale.value}
                  </div>
                </div>
              : ''
            }
            {
              datePlanDetail.startTime ?
                <div className={styles.addPatientLi}>
                  <label className={ styles.leftPlaceholder}>{datePlanDetail.startTime.label}</label>
                  <div>
                    {datePlanDetail.startTime.value}
                  </div>
                </div>
              : ''
            }
            {
              datePlanDetail.endTime ?
                <div className={styles.addPatientLi}>
                  <label className={ styles.leftPlaceholder}>{datePlanDetail.endTime.label}</label>
                  <div>
                    {datePlanDetail.endTime.value}
                  </div>
                </div>
              : ''
            }
            {
              datePlanDetail.repeat ?
                <div className={styles.addPatientLi}>
                  <label className={ styles.leftPlaceholder}>{datePlanDetail.repeat.label}</label>
                  <div>
                    {datePlanDetail.repeat.value}
                  </div>
                </div>
              : ''
            }
            {
              datePlanDetail.remind ?
                <div className={styles.addPatientLi}>
                  <label className={ styles.leftPlaceholder}>{datePlanDetail.remind.label}</label>
                  <div>
                    {datePlanDetail.remind.value}
                  </div>
                </div>
              : ''
            }
          </section>
          {
            datePlanDetail.content ?
              this.showTemplateCon(datePlanDetail.content)
            : ''
          }
        </section>
         {/*
        <section className="cardBgRadius">
          <section>
            <header>会议信息:</header>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>参加人员：</label>
              <div>
                {datePlanDetail.name}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>会议地点：</label>
              <div>
                {datePlanDetail.gender}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>会议类别：</label>
              <div>
                {datePlanDetail.age}
              </div>
            </div>
          </section>
        </section>
        <footer style={{display: 'none'}}>
          <button className="mainBtn" onClick={this.goModifyPatient.bind(this)}>修改</button>
        </footer>*/}
      </div>
    );
  }
}
