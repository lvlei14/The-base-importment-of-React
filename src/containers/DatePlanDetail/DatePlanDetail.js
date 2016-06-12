import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadDatePlanDetail } from '../../redux/modules/datePlanDetail';

const styles = require('./DatePlanDetail.scss');
@connect(
  state => ({...state.datePlanDetail}), {
    loadDatePlanDetail,
    pushState: push,
  }
)
export default class DatePlanDetail extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    datePlanDetail: PropTypes.array,
    loadDatePlanDetail: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // TODO 完善Api地址
    // this.props.loadDatePlanDetail();
  }

  goModifyPatient() {
    this.props.pushState('/modify-data-plan');
  }

  render() {
    const datePlanDetail = this.props.datePlanDetail;
    console.log(datePlanDetail);
    return (
      <div className={styles.datePlanDetail}>
        <HeadNaviBar>日程详情</HeadNaviBar>
        <section className="cardBgRadius">
          <header className={styles.DatDetailTitle}>
            关于回忆
            <p>发布者： 王哲</p>
          </header>
          <section>
            <header>基本信息:</header>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiFirst}>
              <label className={ styles.leftPlaceholder}>日程类型：</label>
              <div>
                {datePlanDetail.name}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>开始时间：</label>
              <div>
                {datePlanDetail.gender}
              </div>
            </div>
            <div className={styles.addPatientLi}>
              <label className={ styles.leftPlaceholder}>结束时间：</label>
              <div>
                {datePlanDetail.age}
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>重复：</label>
              <div>
                {datePlanDetail.roomNum}
              </div>
            </div>
            <div className={styles.addPatientLi + ' ' + styles.addPatientLiEnd}>
              <label className={ styles.leftPlaceholder}>提醒：</label>
              <div>
                {datePlanDetail.roomNum}
              </div>
            </div>
          </section>
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
        </footer>
      </div>
    );
  }
}
