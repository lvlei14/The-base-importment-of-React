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
    schedules: PropTypes.array,
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

  render() {
    const datePlanDetail = this.props.schedules && this.props.schedules[0] || {};
    console.log('--数据--');
    console.log(datePlanDetail);
    return (
      <div className={styles.datePlanDetail}>
        <HeadNaviBar>日程详情</HeadNaviBar>
        <section className="cardBgRadius">
          <section>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>{datePlanDetail.type && datePlanDetail.type.label}</label>
              <div>
                {datePlanDetail.type && datePlanDetail.type.value} &nbsp;&nbsp;&nbsp;&nbsp; {datePlanDetail.is_inner && datePlanDetail.is_inner.value ? '院内' : '院外'}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>开始时间</label>
              <div>
                {datePlanDetail.start_time}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>结束时间</label>
              <div>
                {datePlanDetail.end_time}
              </div>
            </div>
            {
              datePlanDetail.content && datePlanDetail.content.map((item) => {
                return (
                  <div className={styles.addPatientLi} key={item.label}>
                    <label className={ styles.leftPlaceholder}>{item.label}</label>
                    <div>
                      {item.value}
                    </div>
                  </div>
                );
              })
            }
          </section>
        </section>
        {/*
        <footer style={{display: 'none'}}>
          <button className="mainBtn" onClick={this.goModifyPatient.bind(this)}>修改</button>
        </footer>*/}
      </div>
    );
  }
}
