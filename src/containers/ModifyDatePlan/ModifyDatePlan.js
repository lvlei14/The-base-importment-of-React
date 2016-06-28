import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import DateTimeField from 'react-bootstrap-datetimepicker';
import '../AddDatePlan/DateTimePicker.scss';

import { loadTemplateItem } from '../../redux/modules/datePlanInfo';
import { loadschedules } from '../../redux/modules/datePlan';

const styles = require('../AddDatePlan/AddDatePlan.scss');
@connect(
  state => ({...state.schedules, ...state.datePlanInfo}), {
    loadschedules,
    loadTemplateItem
  }
)
export default class ModifyDatePlan extends Component {
  static propTypes = {
    loadschedules: PropTypes.func,
    loadTemplateItem: PropTypes.func,
    schedules: PropTypes.object,
    modifyScheduleSuccess: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    routeParams: PropTypes.object,
    template: PropTypes.array,

  };

  constructor(props) {
    super(props);
    this.state = {
      inputFormat: 'YYYY-MM-DD h:mm A',
      startTime: this.props.schedules && this.props.schedules[0] && this.props.schedules[0].start_time,
      endTime: this.props.schedules && this.props.schedules[0] && this.props.schedules[0].end_time,
    };
  }

  componentDidMount() {
    const {id, tempId} = this.props.routeParams;
    const requires = {
      _id: id
    };
    this.props.loadschedules(JSON.stringify(requires));
    this.props.loadTemplateItem(tempId);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.modifyScheduleSuccess && nextProps.modifyScheduleSuccess) {
  //     if (!this.props.successMsg && nextProps.successMsg) {
  //       this.props.showDiaglog(nextProps.successMsg, '/date-plan');
  //     }
  //   }
  //   if (!this.props.modifyScheduleSuccess && !nextProps.modifyScheduleSuccess) {
  //     if (!this.props.errorMsg && nextProps.errorMsg) {
  //       this.props.showDiaglog(nextProps.errorMsg);
  //     }
  //   }
  // }

  getNowFormatDate(day) {
    const date = new Date(day);
    const seperator1 = '-';
    const seperator2 = ':';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const strDate = date.getDate();
    const currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
  }

  mergeScheduleValueToTemDate() {
    const template = this.props.template;
    const templateCon = template && template[0] && template[0].content;
    const datePlanDetail = this.props.schedules && this.props.schedules[0] && this.props.schedules[0].content || {};
    // const newData = [];
    console.log(templateCon);
    console.log(datePlanDetail);
    for (const scheduKey in datePlanDetail) {
      for (const temPlateKey in templateCon) {
        if (datePlanDetail[scheduKey].label === templateCon[temPlateKey].label) {
          console.log('3030');
          templateCon[temPlateKey].value = datePlanDetail[scheduKey].value;
        }
      }
    }
    console.log('---------------');
    console.log(templateCon);
    return templateCon;
  }
  clickAddBtn() {
  }

  handleChange = (newDate) => {
    const newDateNew = new Date(parseInt(newDate));
    this.setState({
      startTime: newDateNew
    });
  }

  handleChangeEndTime = (newDate) => {
    const newDateNew = new Date(parseInt(newDate));
    this.setState({
      endTime: newDateNew
    });
  }

  showFormType(formItem) {
    if (formItem.type === 'input') {
      return (
        <div>
          <input type="text" ref={formItem.key} value={formItem.value} />
        </div>
      );
    }
    if (formItem.type === 'radio') {
      return (
        <div className="select">
          <select ref={formItem.key} value={formItem.value}>
              <option value="">请选择</option>
              {
                formItem && formItem.options && formItem.options.map((option) => {
                  return (
                    <option key={option} value={option}>{option}</option>
                  );
                })
              }
          </select>
          <p className="sanjiao-bt"></p>
        </div>
      );
    }
    if (formItem.type === 'textarea') {
      return (
        <div>
          <textarea ref={formItem.key} value={formItem.value}></textarea>
        </div>
      );
    }
  }

  render() {
    const template = this.props.template;
    // const templateCon = template && template[0] && template[0].content;
    const datePlanDetail = this.props.schedules && this.props.schedules[0] || {};
    const {inputFormat} = this.state;
    const newData = this.mergeScheduleValueToTemDate();
    // this.refs.localRef && this.refs.localRef.value = datePlanDetail && datePlanDetail.is_inner && datePlanDetail.is_inner.value ? 'in' : 'out';
    return (
      <div>
        <HeadNaviBar>修改日程</HeadNaviBar>
        <div className={ styles.addDatePlan}>
          <div>
            <ul className="cardBgRadius">
              <li>
                <label className={ styles.leftPlaceholder}>日程类型</label>
                <span className={ styles.mainIcon}>*</span>
                <div className={styles.scheduleType}>
                  <div className="select">
                    <select ref="localRef" value="out">
                      <option value="in">院内</option>
                      <option value="out">院外</option>
                    </select>
                    <p className="sanjiao-bt"></p>
                  </div>
                  <div>
                    <input ref="templateTypeRef"
                      className={styles.selectNoCur}
                      value={datePlanDetail.type && datePlanDetail.type.value}
                      readOnly="true" />
                  </div>
                </div>
              </li>
              <li className={styles.dateTimeFLiFirst}>
                <label className={ styles.leftPlaceholder}>开始时间</label>
                <div className={styles.scheduleType}>
                  <section className={styles.dateTimePicker}>
                    <DateTimeField
                      inputFormat={inputFormat}
                      onChange={this.handleChange} />
                  </section>
                </div>
              </li>
              <li className={styles.dateTimeFLiEnd}>
                <label className={ styles.leftPlaceholder}>结束时间</label>
                <div className={styles.scheduleType}>
                  <section className={styles.dateTimePicker}>
                    <DateTimeField
                      inputFormat={inputFormat}
                      onChange={this.handleChangeEndTime} />
                  </section>
                </div>
              </li>
              <li className={styles.liMarginTopZero}>
                <label className={ styles.leftPlaceholder}>重复</label>
                <div className="select">
                  <select ref="repeatRef" value={datePlanDetail.repeat && datePlanDetail.repeat.value}>
                      <option value="">请选择</option>
                      <option value="星期一">星期一</option>
                      <option value="星期二">星期二</option>
                      <option value="星期三">星期三</option>
                      <option value="星期四">星期四</option>
                      <option value="星期五">星期五</option>
                      <option value="星期六">星期六</option>
                      <option value="星期日">星期日</option>
                      <option value="工作日">工作日</option>
                      <option value="每天">每天</option>
                      <option value="每月">每月</option>
                  </select>
                  <p className="sanjiao-bt"></p>
                </div>
              </li>
              <li>
                <label className={ styles.leftPlaceholder}>提醒</label>
                <div className="select">
                  <select ref="remindRef" value={datePlanDetail.remind && datePlanDetail.remind.value}>
                      <option value="">请选择</option>
                      <option value="5分钟">5分钟</option>
                      <option value="10分钟">10分钟</option>
                      <option value="30分钟">30分钟</option>
                      <option value="每小时">每小时</option>
                      <option value="一天">一天</option>
                      <option value="一周">一周</option>
                      <option value="一个月">星期日</option>
                      <option value="工作日">工作日</option>
                      <option value="每天">每天</option>
                      <option value="每月">每月</option>
                  </select>
                  <p className="sanjiao-bt"></p>
                </div>
              </li>
              {
                newData && newData.map((datePlanConItem) => {
                  return (
                    <li key={datePlanConItem.label}>
                      <label className={ styles.leftPlaceholder}>{datePlanConItem.label}</label>
                      {this.showFormType(datePlanConItem)}
                    </li>
                  );
                })
              }
            </ul>
            <button className="mainBtn" onClick={this.clickAddBtn.bind(this)}>完成</button>
          </div>
        </div>
      </div>
    );
  }
}

